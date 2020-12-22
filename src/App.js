import React, { Component } from "react";
import "./App.css";
import {getAll, update} from "./BooksAPI";
import Search from "./Search";
import Shelf from "./Shelf";
import { Link, Route } from "react-router-dom";

class BooksApp extends Component {

    SHELVES = ["currentlyReading", "wantToRead", "read"];
    SHELF_TITLES = ["Currently Reading", "Want To Read", "Read"];

    state = {
        books: [],
    }

    componentDidMount() {
        this.refreshShelves();
    }

    refreshShelves() {
        getAll().then((books) => {
            this.setState({books});
        });
    }

    generateShelves() {
        const shelves = [];
        this.SHELVES.forEach((s) => {
            shelves.push({
                id: s,
                books: this.state.books.filter((b) => b.shelf === s).map((b) => b.id),
            });
        })

        return shelves;
    }

    onChange(book, shelf) {
        update(book, shelf).then((_) => {
            this.refreshShelves();
        })
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={() => {
                    return (
                        <Search
                            shelves={this.generateShelves()}
                            onChange={(book, shelf) => this.onChange(book, shelf)}
                        />
                    );
                }
                } />
                <Route exact={true} path="/" render={() => {
                    return (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    {
                                        this.SHELVES.map((s, i) =>
                                            (<Shelf
                                                key={s}
                                                onChange={(book, shelf) => this.onChange(book, shelf)}
                                                title={this.SHELF_TITLES[i]}
                                                books={this.state.books.filter((b) => b.shelf === s)}
                                            />)
                                        )
                                    }
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    );
                }
                }/>
            </div>
        )
    }
}

export default BooksApp;
