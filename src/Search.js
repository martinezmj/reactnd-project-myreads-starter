import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";

class Search extends Component {

    state = {
        query: "",
        results: [],
    }

    queryChanged(query) {
        this.setState({query}, () => {
            search(query).then((results) => {
                let books = results;
                if (!results || results.error) {
                    books = [];
                }
                this.setState({
                    results: books
                });
            });
        });
    }

    findShelf(book) {
        book.shelf = "none";

        this.props.shelves.forEach((s) => {
            if (s.books.indexOf(book.id) !== -1) {
                book.shelf = s.id;
            }
        });
    }

    render() {
        const books = this.state.results;
        books.forEach((b) => this.findShelf(b));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(ev) => this.queryChanged(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((b) => (<Book key={b.id} book={b} onChange={this.props.onChange} />))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
