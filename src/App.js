import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";
const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      books: [],
      loadingA: true,
      loadingB: true
    };
  }

  fetchAllAuthors() {
    return instance.get("/api/authors/").then(res => res.data);
  }

  fetchAllBooks() {
    return instance.get("/api/books/").then(res => res.data);
  }

  componentDidMount() {
    this.fetchAllAuthors()
      .then(authors =>
        this.setState({
          authors: authors,
          loadingA: false
        })
      )
      .catch(err => console.error(err));

    this.fetchAllBooks()
      .then(books =>
        this.setState({
          books: books,
          loadingB: false
        })
      )
      .catch(err => console.error(err));
  }

  getView() {
    if (this.state.loadingA || this.state.loadingB) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            exact
            render={props => (
              <AuthorsList {...props} authors={this.state.authors} />
            )}
          />
          <Route
            path="/books/:color"
            exact
            render={props => <BookList {...props} books={this.state.books} />}
          />
          <Route
            path="/books/"
            exact
            render={props => <BookList {...props} books={this.state.books} />}
          />
        </Switch>
      );
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
