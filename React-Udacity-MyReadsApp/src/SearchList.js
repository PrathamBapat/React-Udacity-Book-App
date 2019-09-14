import React, { Component} from 'react'
import { Link, BrowserRouter  } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import List from './List'
import App from './App'
import Book from './book'
import * as BooksAPI from './BooksAPI'


class SearchList extends Component {

  state = {

    query: '',
    rawBooks: []

  }

  updateQuery(query){
    if(query.length > 0 ) {
       this.setState(() => ({

         query: query

       }))

       this.bookSearch(query)
 }
 else {
   this.clearQuery()
 }
}

 clearQuery() {
   this.setState({
         query: '',
        rawBooks: []
      })
 }

  bookSearch(query){
    if (query.length > 0){
     BooksAPI.search(query)
     .then(results => {
        this.setState(currentState => ({
        rawBooks: this.updateExistingShelves(results)

     }))
   })
  }
}



  updateExistingShelves(searchResults) {

    if(searchResults.length > 0 ){
    const myBooks = this.props.books
    const addtoState = searchResults.filter((result) => myBooks.find(b => {
      if(b.id === result.id) {
        result.shelf = b.shelf
        return searchResults
      }
    }))
    myBooks.concat(addtoState)
    return searchResults
  }
  else {
    return []
  }
}
  render() {

     return (

         <div className="search-books">

         <div className="search-books-bar">
         <Link to="/"
               className='close-search'
               >Go Back</Link>
           <div className="search-books-input-wrapper">
             {/*
               NOTES: The search from BooksAPI is limited to a particular set of search terms.
               You can find these search terms here:
               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

               However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
               you don't find a specific author or title. Every search is limited by search terms.
             */}
             <input type="text" placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}/>

           </div>
         </div>
         <div className="search-books-results">
           <ol className="books-grid"></ol>
           <li className='books-list-search wrap'>

             { this.state.rawBooks.map((book) => (
              <Book key={book.id}
                  book={book}
                  updateShelf={this.props.onUpdateShelf}/>
               ))}

           </li>
           <div className='open-search'>
             <Link
                 to='/'
                 className="open-search-button">
             </Link>
           </div>
         </div>

       </div>

     )

  }

}
export default SearchList
