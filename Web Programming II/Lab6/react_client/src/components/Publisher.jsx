import React, {useState} from 'react';
import './App.css';
import {useQuery} from '@apollo/client';
import queries from '../queries';
import DeletePublisherModal from './DeletePublisherModal';
import EditPublisherModal from './EditPublisherModal.jsx';
import { Link, useParams } from 'react-router-dom';

function Publisher() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editPublisher, setEditPublisher] = useState(null);
  const [deletePublisher, setDeletePublisher] = useState(null);
  const { id } = useParams();

  const {loading, error, data} = useQuery(queries.GET_PUBLISHER_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { _id: id }
  });
  const handleOpenEditModal = (publisher) => {
    setShowEditModal(true);
    setEditPublisher(publisher);
  };

  const handleOpenDeleteModal = (publisher) => {
    setShowDeleteModal(true);
    setDeletePublisher(publisher);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  if (data) {
    const publisher = data.getPublisherById;
    console.log(publisher)
    return (
      <div>
        <br />
        <br />
            <div className='card' key={publisher._id}>
              <div className='card-body'>
                <h5 className='card-title'>
                  {publisher.name}
                </h5>
                Established Year: {publisher.establishedYear}
                <br />
                Location: {publisher.location}
                <br />
                <br />
                Books:
                        <ul>
                            {publisher.books.map((book) => {
                                return (
                                    <li key={book._id}>
                                        <Link to={`/books/${book._id}`} className='link'>
                                        {book.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        Number of Books: {publisher.numOfBooks}
                        <br />
                <button
                  className='button'
                  onClick={() => {
                    handleOpenEditModal(publisher);
                  }}
                >
                  Edit
                </button>
                <button
                  className='button'
                  onClick={() => {
                    handleOpenDeleteModal(publisher);
                  }}
                >
                  Delete
                </button>
                <br />
              </div>
            </div>
        {showEditModal && (
          <EditPublisherModal
            isOpen={showEditModal}
            publisher={editPublisher}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && (
          <DeletePublisherModal
            isOpen={showDeleteModal}
            handleClose={handleCloseModals}
            deletePublisher={deletePublisher}
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

export default Publisher;
