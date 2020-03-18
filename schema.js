const axios = require('axios');
const Book = require('./models/book');
const Author = require('./models/author');

const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull 
} = require('graphql');

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});

/*   Book   */ 
/*
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'Harry Potter', genre: 'Sci-Fi', id: '4', authorId: '3'},
    {name: 'Star War', genre: 'Sci-Fi', id: '5', authorId: '3'}
];

var authors = [
    {name:'Patrick', age:44, id: '1'},
    {name:'Brandon', age:42, id: '2'},
    {name:'Terry', age:66, id: '3'}
];
*/
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //console.log(parent);
                //return authors.filter(author => author.id === parent.authorId)[0];
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books.filter(book => book.authorId === parent.id);
                return Book.find({authorId: parent.id});
            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => res.data);          
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res => res.data);          
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios
                    .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                    .then(res => res.data);
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //console.log(typeof(args.id))
                //return books.filter(book => book.id === args.id)[0];
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //console.log(typeof(args.id))
                //return authors.filter(author => author.id === args.id)[0];
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});