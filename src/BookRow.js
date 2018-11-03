import React, { Component } from "react";
import { Link } from "react-router-dom";
class BookRow extends Component {
  render() {
    const book = this.props.book;
    return (
      <tr>
        <td>{book.title}</td>
        <td>
          {book.authors.map(author => (
            <Link to={`/authors/${author.id}`} key={author.name}>
              <div key={author.name}>{author.name}</div>
            </Link>
          ))}
        </td>
        <td>
          <Link
            to={`/books/${book.color}`}
            className="btn"
            style={{ backgroundColor: book.color }}
          />
        </td>
      </tr>
    );
  }
}

export default BookRow;
