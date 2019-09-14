import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import List from './List'
import SearchList from './SearchList'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {

    books: [ ]

    }

    handleChange = (book, shelfName) => {
    const bookFromState = this.state.books.find(b => b.id === book.id)
    if(bookFromState){

      bookFromState.shelf = shelfName

        BooksAPI.update(book, shelfName)
        .then(this.setState(currentState => ({
          books: currentState.books
        })))
      }
      else{
        book.shelf = shelfName
        BooksAPI.update(book, shelfName)
        .then(this.setState(prevState => ({
          books: prevState.books.concat(book)
        })))
      }


  }




  componentDidMount() {
   BooksAPI.getAll().then((books) => {
      this.setState({ books })
  })
 }



  render() {

    return (

     <div className='App'>
       <Route exact path="/" render = {() => (
         <List
          books={ this.state.books }
          onUpdateShelf={ this.handleChange.bind(this) }/>
       )}/>

       <Route path="/search" render = {() => (
         <SearchList
          books={ this.state.books }
          onUpdateShelf={ this.handleChange.bind(this) }/>
       )}/>
     </div>


    )
  }
}

export default BooksApp
