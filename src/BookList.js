import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: this.props.books
    };

    this.filterBooks = this.filterBooks.bind(this);
    // this.filterBooksByColor = this.filterBooksByColor.bind(this);
  }

  filterBooks(query) {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book => {
      return `${book.title}`.toLowerCase().includes(query);
    });
    this.setState({ filteredBooks: filteredBooks });
  }

  //   filterBooksByColor(color) {
  //     let filteredcolors = this.props.books.filter(book => {
  //       return book.color === color;
  //     });
  //     this.setState({ filteredBooks: filteredcolors });
  //   }

  //   componentDidUpdate(prevProps) {
  //     if (
  //       (!prevProps.match.params.color && this.props.match.params.color) ||
  //       (prevProps.match.params.color &&
  //         this.props.match.params.color &&
  //         prevProps.match.params.color !== this.props.match.params.color)
  //     ) {
  //       this.filterBooksByColor(this.props.match.params.color);
  //     } else if (!this.props.match.params.color && prevProps.match.params.color) {
  //       //   this.filterBooks("");
  //       this.setState({ filteredBooks: this.props.books });
  //     }
  //   }
  render() {
    let books = this.state.filteredBooks;
    if (this.props.match.params.color) {
      books = books.filter(book => {
        return book.color === this.props.match.params.color;
      });
    }
    const allBooks = () => {
      if (this.props.match.params.color) return "All Books";
    };

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar changeHandler={this.filterBooks} />
        <div className="row">
          <BookTable books={books} />
        </div>
        <Link to="/books">{allBooks()}</Link>
      </div>
    );
  }
}

export default BookList;
