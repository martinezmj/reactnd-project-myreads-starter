import React, { Component } from "react";

class Book extends Component {

    render() {
        const url = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : "";
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${url})`}}/>
                        <div className="book-shelf-changer">
                            <select
                                    onChange={(ev) =>
                                        this.props.onChange(this.props.book, ev.target.value)}
                                    value={this.props.book.shelf}>
                                <option value="move" disabled={true}>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">
                        {this.props.book.authors ? this.props.book.authors.join(", ") : ""}
                    </div>
                </div>
            </li>
        );
    }
}

export default Book;
