const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pool = require('./db');

const app = express();

const uri = 'mongodb://root:1812@127.0.0.1:27017/graphql?authSource=admin';//retryWrites=true

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    //useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('connected to database mongoDB');
});

pool.connect()
    .then(db => console.log('connected to database PostgreSql'))
    .catch(err => console.log(err));

//Middlewares
app.use(cors());
app.use(express.json());  //req.body

//Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);  // '/api/v1/exercises'
app.use('/users', usersRouter);   // '/api/v1/users'

//PostgreSql
app.post('/users', async (req, res) =>{
    
    const { username } = req.body;
    const newUser = await pool.query(
        'INSERT INTO users (username) VALUES($1)',
        [username]
    ).then(() => res.json('User addded!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/pusers', async (req, res) =>{ //Ruta ya tomada por eso pusers
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch(err) {
        console.error(err.message);
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE id = $1', [id])
        .then(user => res.json(user.rows[0]))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    await pool.query(
        'UPDATE users set username = $1 WHERE id = $2',
        [username, id]
    )
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [
        id
    ]).then(() => res.json('User was deleted!'))
      .catch(err => res.status(400).json('Error :' + err));  
});

//app.set('port', process.env.PORT || 4000);  //5000
//app.listen(app.get('port'), () => console.log('Server started on ',app.get('port'));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

//Nodemon limit watchers solution
//sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p 