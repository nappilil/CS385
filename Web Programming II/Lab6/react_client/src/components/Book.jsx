import React, { useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import DeleteBookModal from './DeleteBookModal';
import EditBookModal from './EditBookModal.jsx';
import { Link, useParams } from 'react-router-dom';

function Book() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const [deleteBook, setDeleteBook] = useState(null);
    const { id } = useParams();

    const { loading, error, data } = useQuery(queries.GET_BOOK_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: { _id: id }
    });
    const handleOpenEditModal = (book) => {
        setShowEditModal(true);
        setEditBook(book);
    };

    const handleOpenDeleteModal = (book) => {
        setShowDeleteModal(true);
        setDeleteBook(book);
    };

    const handleCloseModals = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    };
    if (data) {
        const book = data.getBookById;
        return (
            <div>
                <br />
                <br />
                <div className='card' key={book._id}>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {book.title}
                        </h5>
                        Genre: {book.genre}
                        <br />
                        Publication Date: {book.publicationDate}
                        <br />
                        Chapters:
                        <ul>
                            {book.chapters.map((chapter, index) => {
                                return (
                                    <li key={index}>
                                        {chapter}
                                    </li>
                                )
                            })}
                        </ul>
                        <Link to={`/authors/${book.author._id}`} className='link'>
                        Author: {book.author.name}
                        </Link>
                        <br />
                        <Link to={`/publishers/${book.publisher._id}`} className='link'>
                        Publisher: {book.publisher.name}
                        </Link>
                        <br />
                        <button
                            className='button'
                            onClick={() => {
                                handleOpenEditModal(book);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className='button'
                            onClick={() => {
                                handleOpenDeleteModal(book);
                            }}
                        >
                            Delete
                        </button>
                        <br />
                    </div>
                </div>
                {showEditModal && (
                    <EditBookModal
                        isOpen={showEditModal}
                        book={editBook}
                        handleClose={handleCloseModals}
                    />
                )}

                {showDeleteModal && (
                    <DeleteBookModal
                        isOpen={showDeleteModal}
                        handleClose={handleCloseModals}
                        deleteBook={deleteBook}
                    />
                )}
            </div>
        );
    } else if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Book;
