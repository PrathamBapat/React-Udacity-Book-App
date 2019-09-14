
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    render() {

        const { book, updateShelf } = this.props

        return(
            <div key={book.id} className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193,
                        backgroundImage: (book.imageLinks) ?
                        `url(${book.imageLinks.thumbnail})`
                        : `url(${'icons/no_image_available'})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => updateShelf(book, e.target.value)}>
                                <option disabled >Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead" >Want to Read</option>
                                <option value="read" >Read</option>
                                <option value="none" >None</option>
                            </select>
                        </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors ? (book.authors.length > 1 ? (book.authors.map((author) => (
                    <div key={author} className="book-authors">{author}</div>
                )))
                : (<div className="book-authors">{book.authors}</div>)
            ) : (<div className="book-authors">Author Unknown</div>)}
            </div>
        )
    }
}

export default Book
