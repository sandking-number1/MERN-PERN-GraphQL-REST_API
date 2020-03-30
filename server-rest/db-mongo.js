const mongoose = require('mongoose');

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

module.exports = mongoose;