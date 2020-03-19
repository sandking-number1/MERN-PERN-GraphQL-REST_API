const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const uri = 'mongodb://root:1812@127.0.0.1:27017/graphql?authSource=admin';//retryWrites=true

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    //useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

//app.use(cors());
app.use(express.json());

//Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//app.set('port', process.env.PORT || 4000);  //5000
//app.listen(app.get('port'), () => console.log('Server started on ',app.get('port'));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
