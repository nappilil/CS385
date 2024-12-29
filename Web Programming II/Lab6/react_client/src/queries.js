import { gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query {
    authors {
      _id
      name
      bio
      dateOfBirth
    }
  }
`;
const GET_AUTHOR_BY_ID = gql`
query getAuthorById($_id: String!) {
  getAuthorById(_id: $_id) {
    _id
    name
    bio
    dateOfBirth
    books {
      _id
      title
      genre
      publicationDate
      chapters
    }
    numOfBooks
  }
}
`;

const GET_BOOK_BY_ID = gql`
query getBookById($_id: String!) {
  getBookById(_id: $_id) {
      _id
      title
      genre
      publicationDate
      chapters
      author {
        _id
        name
      }
      publisher {
        _id
        name
      }
    }
  }
`;


const GET_PUBLISHER_BY_ID = gql`
  query getPublisherById($_id: String!) {
  getPublisherById(_id: $_id) {
      _id
      name
      location
      establishedYear
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;


const GET_PUBLISHERS = gql`
  query {
    publishers {
      _id
      name
      location
      establishedYear
    }
  }
`;

const GET_BOOKS = gql`
  query {
    books {
      _id
      title
      genre
      publicationDate
      chapters
      author {
        _id
      }
      publisher {
        _id
      }
    }
  }
`;
const ADD_AUTHOR = gql`
  mutation addAuthor(
    $name: String!
    $bio: String
    $dateOfBirth: String!
  ) {
    addAuthor(
      name: $name
      bio: $bio
      dateOfBirth: $dateOfBirth
    ) {
      _id
      name
      bio
      dateOfBirth
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;

const ADD_PUBLISHER = gql`
  mutation addPublisher(
      $name: String!
      $establishedYear: Int!
      $location: String!
  ) {
    addPublisher(
      name: $name
      establishedYear: $establishedYear
      location: $location
      ) {
      _id
      name
      establishedYear
      location
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook(
      $title: String!
      $publicationDate: String!
      $genre: Genre!
      $chapters: [String!]!
      $authorId: String!
      $publisherId: String!
  ) {
    addBook(
      title: $title
      publicationDate: $publicationDate
      genre: $genre
      chapters: $chapters
      authorId: $authorId
      publisherId: $publisherId
      ) {
      _id
      title
      publicationDate
      genre
      chapters
      author {
        _id
        name
      }
      publisher {
        _id
        name
      }
    }
  }
`;
const REMOVE_BOOK = gql`
  mutation removeBook($_id: String!) {
    removeBook(_id: $_id) {
      _id
      title
      publicationDate
      genre
      author {
        name
        _id
      }
      publisher {
        name  
        _id
      }
      chapters
    }
  }
`;
const REMOVE_AUTHOR = gql`
  mutation removeAuthor($_id: String!) {
    removeAuthor(_id: $_id) {
      _id
      name
      bio
      dateOfBirth
  }
}
`;
const REMOVE_PUBLISHER = gql`
  mutation removePublisher($_id: String!) {
    removePublisher(_id: $_id) {
      _id
      name
      establishedYear
      location
      books {
        _id
        title
      }
      numOfBooks
  }
}
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $_id: String!
    $name: String
    $bio: String
    $dateOfBirth: String
  ) {
    editAuthor(
      _id: $_id
      name: $name
      bio: $bio
      dateOfBirth: $dateOfBirth
    ) {
      _id
      name
      bio
      dateOfBirth
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;

const EDIT_PUBLISHER = gql`
  mutation editPublisher(
    $_id: String!
    $name: String
    $establishedYear: Int
    $location: String
  ) {
    editPublisher(
      _id: $_id
      name: $name
      establishedYear: $establishedYear
      location: $location
    ) {
      _id
      name
      establishedYear
      location
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;
const EDIT_BOOK = gql`
  mutation editBook(
    $_id: String!
    $title: String
    $publicationDate: String
    $genre: Genre
    $chapters: [String!]
    $authorId: String
    $publisherId: String
  ) {
    editBook(
      _id: $_id
      title: $title
      publicationDate: $publicationDate
      genre: $genre
      chapters: $chapters
      authorId: $authorId
      publisherId: $publisherId
    ) {
      _id
      title
      publicationDate
      genre
      chapters
      author {
        _id
      }
      publisher {
        _id
      }
    }
  }
`;
const GET_CHAPTERS_BY_BOOKID = gql`
query getChaptersById($bookId: String!) {
  getChaptersByBookId(bookId: $bookId)
}
`;

const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: Genre!) {
    booksByGenre(genre: $genre) {
      _id
      title
      publicationDate
      genre
      chapters
      author {
        _id
        name
      }
      publisher {
        _id
        name
      }
    }
  }
`;

const PUBLISHERS_BY_ESTABLISHEDYEAR = gql`
  query publishersByEstablishedYear($min: Int!, $max: Int!) {
    publishersByEstablishedYear(min: $min, max: $max) {
      _id
      name
      establishedYear
      location
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;

const SEARCH_AUTHOR_BY_NAME = gql`
  query searchAuthorByName($searchTerm: String!) {
    searchAuthorByName(searchTerm: $searchTerm) {
      _id
      name
      bio
      dateOfBirth
      books {
        _id
        title
      }
      numOfBooks
    }
  }
`;

const SEARCH_BOOK_BY_TITLE = gql`
  query searchBookByTitle($searchTerm: String!) {
    searchBookByTitle(searchTerm: $searchTerm) {
      _id
      title
      publicationDate
      genre
      chapters
      author {
        _id
        name
      }
      publisher {
        _id
        name
      }
    }
  }
`;

let exported = {
  GET_AUTHORS,
  EDIT_AUTHOR,
  REMOVE_AUTHOR,
  ADD_AUTHOR,
  GET_PUBLISHERS,
  EDIT_PUBLISHER,
  REMOVE_PUBLISHER,
  ADD_PUBLISHER,
  GET_BOOKS,
  EDIT_BOOK,
  REMOVE_BOOK,
  ADD_BOOK,
  GET_AUTHOR_BY_ID,
  GET_PUBLISHER_BY_ID,
  GET_BOOK_BY_ID,
  GET_CHAPTERS_BY_BOOKID,
  BOOKS_BY_GENRE,
  PUBLISHERS_BY_ESTABLISHEDYEAR,
  SEARCH_AUTHOR_BY_NAME,
  SEARCH_BOOK_BY_TITLE
};

export default exported;
