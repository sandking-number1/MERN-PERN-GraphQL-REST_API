const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoose } = require('./db-mongo');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());  //req.body

//Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const usersPostgresRouter = require('./routes/usersPostgres');

app.use('/exercises', exercisesRouter);  // '/api/v1/exercises'
app.use('/users', usersRouter);   // '/api/v1/users'

//PostgreSql
app.use('/api/v1/users', usersPostgresRouter);

//Static files
app.use(express.static(path.join(__dirname, 'public')));
/* Otra forma de enviar archivos desde el servidor*/
//app.use('/public',express.static(path.join(__dirname, 'static')));
//app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, 'static', 'index.html'));
//});

//app.set('port', process.env.PORT || 4000);  //5000
//app.listen(app.get('port'), () => console.log('Server started on ',app.get('port'));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

//Nodemon limit watchers solution
//sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p 