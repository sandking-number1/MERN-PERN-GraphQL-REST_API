const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const mongoose = require('mongoose');

const app = express();

const uri = 'mongodb://root:1812@127.0.0.1:27017/graphql?authSource=admin';

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    //useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('connected to database'))
    .catch(err => console.log(err));

/*    
mongoose.connection.once('open', () => {
    console.log('connected to database');
});
*/
app.use(cors());

//Middleware ruta
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true   //interface for help to make querys simuling a client
}));

//app.set('port', process.env.PORT || 4000);
//app.listen(app.get('port'), () => console.log('Server started on ',app.get('port'));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

//Nodemon limit watchers solution
//sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p 