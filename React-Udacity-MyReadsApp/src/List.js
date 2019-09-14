import React, { Component} from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import BooksApp from './App'
import './App.css'
import Book from './book'

const shelves = [
  {
    key: 'currentlyReading',
    name: 'Currently Reading'
  },
  {
    key: 'wantToRead',
    name: 'Want To Read'
  },
  {
    key: 'read',
    name: 'Read'
  }
];

class List extends Component {


    render() {

        const { books, onUpdateShelf } = this.props

        function getBooksForShelf(shelfKey) {
          return books.filter(book => book.shelf === shelfKey);
        }

        return(
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    { shelves.map((shelf) => (
                      <div key={shelf.key} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.name}</h2>
                        { getBooksForShelf(shelf.key).length === 0 ? (
                          <div>
                            <h4>No books in this shelf</h4>
                          </div>
                        ) : (
                          <div className="bookshelf-books">
                            <ol className="books-grid">
                              <li className='books-list'>
                                { getBooksForShelf(shelf.key).map((book) => (
                                 <Book key={book.id}
                                     book={book}
                                     updateShelf={onUpdateShelf}/>
                                  ))}
                              </li>
                            </ol>
                          </div>
                        )}
                      </div>
                    )) }
                  </div>
                </div>
                <div className='open-search'>
                  <Link
                      to='/search'
                      className="open-search-button">
                  </Link>
                </div>
              </div>

            </div>
        )
    }
}

export default List
