import React, { useState } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import DeleteAuthorModal from './DeleteAuthorModal';
import EditAuthorModal from './EditAuthorModal';
import { Link, useParams } from 'react-router-dom';

function Author() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editAuthor, setEditAuthor] = useState(null);
    const [deleteAuthor, setDeleteAuthor] = useState(null);
    const { id } = useParams();

    const { loading, error, data } = useQuery(queries.GET_AUTHOR_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: { _id: id }
    });
    const handleOpenEditModal = (author) => {
        setShowEditModal(true);
        setEditAuthor(author);
    };

    const handleOpenDeleteModal = (author) => {
        setShowDeleteModal(true);
        setDeleteAuthor(author);
    };

    const handleCloseModals = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    };
    if (data) {
        const author = data.getAuthorById;
        //console.log(author.books[0]);
        return (
            <div>
                <br />
                <br />
                <div className='card' key={author._id}>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {author.name}
                        </h5>
                        Bio: {author.bio}
                        <br />
                        Date of Birth: {author.dateOfBirth}
                        <br />
                        <br />
                        Books:
                        <ul>
                            {author.books.map((book) => {
                                return (
                                    <li key={book._id}>
                                        <Link to={`/books/${book._id}`} className='link'>
                                        {book.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        Number of Books: {author.numOfBooks}
                        <br />
                        <button
                            className='button'
                            onClick={() => {
                                handleOpenEditModal(author);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className='button'
                            onClick={() => {
                                handleOpenDeleteModal(author);
                            }}
                        >
                            Delete
                        </button>
                        <br />
                    </div>
                </div>
                {showEditModal && (
                    <EditAuthorModal
                        isOpen={showEditModal}
                        author={editAuthor}
                        handleClose={handleCloseModals}
                    />
                )}

                {showDeleteModal && (
                    <DeleteAuthorModal
                        isOpen={showDeleteModal}
                        handleClose={handleCloseModals}
                        deleteAuthor={deleteAuthor}
                    />
                )}
            </div>
        );
    } else if (loading) {
        return <div>Loading</div>;
    } else if (error) {
        console.log(error);
        console.log(error.message);
        return <div>{error.message}</div>;
    }
}

export default Author;
