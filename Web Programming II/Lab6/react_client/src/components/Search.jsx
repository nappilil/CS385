import React, { useState, useEffect } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import { Link } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [selectQuery, setSelectQuery] = useState("getChaptersByBookId");

    useEffect(() => {
        console.log('on load useeffect');
        setSearch("")
        setMin("")
        setMax("")
    }, [selectQuery])

    let graphQL = queries.GET_CHAPTERS_BY_BOOKID, variables;

    if (selectQuery === "getChaptersByBookId") {
        graphQL = queries.GET_CHAPTERS_BY_BOOKID;
        //variables = { bookId: search };
    } else if (selectQuery === "booksByGenre") {
        graphQL = queries.BOOKS_BY_GENRE;
        variables = { genre: search };
    }
    else if (selectQuery === "publishersByEstablishedYear") {
        graphQL = queries.PUBLISHERS_BY_ESTABLISHEDYEAR;
        variables = { min: min, max: max };
    } else if (selectQuery === "searchAuthorByName") {
        graphQL = queries.SEARCH_AUTHOR_BY_NAME;
        variables = { searchTerm: search };
    } else if (selectQuery === "searchBookByTitle") {
        graphQL = queries.SEARCH_BOOK_BY_TITLE;
        variables = { searchTerm: search };
    }

    const { loading, error, data } = useQuery(graphQL, {
        fetchPolicy: 'cache-and-network',
        variables: variables
    });

    const handleChange = (e) => {
        setSelectQuery(e.target.value)
    };

    const onSearchChapter = (e) => {
        e.preventDefault();
        let bookId = document.getElementById('bookId');
        setSearch(bookId.value);
        setSelectQuery("getChaptersByBookId");
    };

    const onSearchGenre = (e) => {
        e.preventDefault();
        let genre = document.getElementById('genre');
        setSearch(genre.value);
        setSelectQuery("booksByGenre");
    };

    const onSearchEstablishedYear = (e) => {
        e.preventDefault();
        let min = document.getElementById('min');
        let max = document.getElementById('max');
        setMin(parseInt(min.value));
        setMax(parseInt(max.value));
        setSelectQuery("publishersByEstablishedYear");
    };

    const onSearchAuthorName = (e) => {
        e.preventDefault();
        let authorName = document.getElementById('authorName');
        setSearch(authorName.value);
        setSelectQuery("searchAuthorByName");
    };

    const onSearchBookTitle = (e) => {
        e.preventDefault();
        let bookTitle = document.getElementById('bookTitle');
        setSearch(bookTitle.value);
        setSelectQuery("searchBookByTitle");
    };

    const displayForm = (option) => {
        let body;
        if (option === 'getChaptersByBookId') {
            body = (
                <div>
                    <br />
                    <form className='form' id='search-chapter' onSubmit={onSearchChapter}>
                        <div className='form-group'>
                            <label>
                                Book Id:
                                <br />
                                <input id='bookId' required autoFocus={true} />
                            </label>
                            <br />
                            <br />
                            <button className='button' type='submit'>Search</button>
                        </div>
                    </form>
                </div>
            )
        }
        if (option === 'booksByGenre') {
            body = (
                <div>
                    <br />
                    <form className='form' id='search-genre' onSubmit={onSearchGenre}>
                        <div className='form-group'>
                            <label>
                                Genre:
                                <br />
                                <select id='genre' required autoFocus={true}>
                                    <option value="FICTION">FICTION</option>
                                    <option value="NON_FICTION">NON_FICTION</option>
                                    <option value="MYSTERY">MYSTERY</option>
                                    <option value="FANTASY">FANTASY</option>
                                    <option value="ROMANCE">ROMANCE</option>
                                    <option value="SCIENCE_FICTION">SCIENCE_FICTION</option>
                                    <option value="HORROR">HORROR</option>
                                    <option value="BIOGRAPHY">BIOGRAPHY</option>
                                </select>
                            </label>
                            <br />
                            <br />
                            <button className='button' type='submit'>Search</button>
                        </div>
                    </form>
                </div>
            )
        }
        if (option === 'publishersByEstablishedYear') {
            body = (
                <div>
                    <br />
                    <form className='form' id='search-establishedYear' onSubmit={onSearchEstablishedYear}>
                        <div className='form-group'>
                            <label>
                                Min:
                                <br />
                                <input id='min' required autoFocus={true} />
                            </label>
                            <label>
                                <br />
                                Max:
                                <br />
                                <input id='max' required autoFocus={true} />
                            </label>
                            <br />
                            <br />
                            <button className='button' type='submit'>Search</button>
                        </div>
                    </form>
                </div>
            )
        }
        if (option === 'searchAuthorByName') {
            body = (
                <div>
                    <br />
                    <form className='form' id='search-authorName' onSubmit={onSearchAuthorName}>
                        <div className='form-group'>
                            <label>
                                Author Name:
                                <br />
                                <input id='authorName' required autoFocus={true} />
                            </label>
                            <br />
                            <br />
                            <button className='button' type='submit'>Search</button>
                        </div>
                    </form>
                </div>
            )
        }
        if (option === 'searchBookByTitle') {
            body = (
                <div>
                    <br />
                    <form className='form' id='search-bookTitle' onSubmit={onSearchBookTitle}>
                        <div className='form-group'>
                            <label>
                                Book Title:
                                <br />
                                <input id='bookTitle' required autoFocus={true} />
                            </label>
                            <br />
                            <br />
                            <button className='button' type='submit'>Search</button>
                        </div>
                    </form>
                </div>
            )
        }
        return <div>{body}</div>
    }

    const displayResult = (searchResult) => {
        let body;
        if (searchResult) {
            if (searchResult.getChaptersByBookId) {
                body = (
                    <div>
                        <br />
                        <h5>Chapters:</h5>
                        <ul>
                            {searchResult.getChaptersByBookId.map((chapter, index) => (
                                <li key={index}>
                                    {chapter}
                                </li>
                            ))}
                        </ul>
                        {searchResult.getChaptersByBookId.length === 0 && (
                            <p>No Chapters Found</p>
                        )}
                    </div>
                )
            } else if (searchResult.booksByGenre) {
                body = (
                    <div>
                        <br />
                        <h5>Books:</h5>
                        <ul>
                            {searchResult.booksByGenre.map((book) => (
                                <Link to={`/books/${book._id}`} className='link'>
                                    <li key={book._id}>
                                        {book.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        {searchResult.booksByGenre.length === 0 && (
                            <p>No Books Found</p>
                        )}
                    </div>
                )
            } else if (searchResult.publishersByEstablishedYear) {
                body = (
                    <div>
                        <br />
                        <h5>Publishers:</h5>
                        <ul>
                            {searchResult.publishersByEstablishedYear.map((publisher) => (
                                <Link to={`/publishers/${publisher._id}`} className='link'>
                                    <li key={publisher._id}>
                                        {publisher.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        {searchResult.publishersByEstablishedYear.length === 0 && (
                            <p>No Publishers Found</p>
                        )}
                    </div>
                )
            } else if (searchResult.searchAuthorByName) {
                body = (
                    <div>
                        <br />
                        <h5>Authors:</h5>
                        <ul>
                            {searchResult.searchAuthorByName.map((author) => (
                                <Link to={`/authors/${author._id}`} className='link'>
                                    <li key={author._id}>
                                        {author.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        {searchResult.searchAuthorByName.length === 0 && (
                            <p>No Authors Found</p>
                        )}
                    </div>
                )
            } else if (searchResult.searchBookByTitle) {
                body = (
                    <div>
                        <br />
                        <h5>Books:</h5>
                        <ul>
                            {searchResult.searchBookByTitle.map((book) => (
                                <Link to={`/books/${book._id}`} className='link'>
                                    <li key={book._id}>
                                        {book.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        {searchResult.searchBookByTitle.length === 0 && (
                            <p>No Books Found</p>
                        )}
                    </div>
                )
            }
        }
        return <div>{body}</div>
    }

    if (loading) {
        return <div>Loading...</div>;
    } else if ((search.length !== 0 || (min && max)) && error) {
        console.log(error.message);
        return (
            <div className='card'>
                <h4 className='card-title'>Search</h4>
                <div className='card-body'>
                    <label>
                        <select
                            value={selectQuery}
                            onChange={handleChange}>
                            <option value="getChaptersByBookId">Chapters By BookId</option>
                            <option value="booksByGenre">Books By Genre</option>
                            <option value="publishersByEstablishedYear">Publishers By Established Year</option>
                            <option value="searchAuthorByName">Author By Name</option>
                            <option value="searchBookByTitle">Book By Title</option>
                        </select>
                    </label>
                    {displayForm(selectQuery)}
                    <br />
                    <br />
                    {error.message}
                </div>
            </div>
        )
    } else {
        return (
            <div className='card'>
                <h4 className='card-title'>Search</h4>
                <div className='card-body'>
                    <label>
                        <select
                            value={selectQuery}
                            onChange={handleChange}>
                            <option value="getChaptersByBookId">Chapters By BookId</option>
                            <option value="booksByGenre">Books By Genre</option>
                            <option value="publishersByEstablishedYear">Publishers By Established Year</option>
                            <option value="searchAuthorByName">Author By Name</option>
                            <option value="searchBookByTitle">Book By Title</option>
                        </select>
                    </label>
                    {displayForm(selectQuery)}
                    <br />
                    <br />
                    {displayResult(data)}
                </div>
            </div>
        )
    }
}

export default Search;
