import React from 'react';

//Apollo GraphQL
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

//Rest Api
import { BrowserRouter as Router, Route} from "react-router-dom";

// components
//import Launches from './components/Launches';
import BookList from './components/BookList'
import AddBook from './components/AddBook';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


//apollo client setup
/*
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});
  
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>SpaceX</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}
*/

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;