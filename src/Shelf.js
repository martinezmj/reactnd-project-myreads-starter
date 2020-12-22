import React, { Component } from "react";
import Book from "./Book.js";

class Shelf extends Component {

    render() {
        return (
            <div className="bookshelf" key={this.props.id}>
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map((b) => (<Book key={b.id} book={b} onChange={this.props.onChange} />))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Shelf;