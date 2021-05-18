import React, { Component } from 'react';


import './custom.css'
import {Container} from "reactstrap";
import NavBar from "./components/NavBar";
import {
    Route,
    Switch
} from "react-router-dom"
import AuthorPage from "./components/AuthorPage/AuthorPage";
import AuthorsTable from "./components/AuthorsTable/AuthorsTable";


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
    <Container>
        <NavBar/>
        <Switch>
            <Route path='/authors/:id' component={AuthorPage} />
            <Route path='/' component={AuthorsTable} />
        </Switch>
      </Container>
    );
  }
}
