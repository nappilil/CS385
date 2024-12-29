import React, {useState} from 'react';
import './App.css';
import {useQuery} from '@apollo/client';
import queries from '../queries';
import Add from './Add';
import DeletePublisherModal from './DeletePublisherModal';
import EditPublisherModal from './EditPublisherModal.jsx';
import { Link } from 'react-router-dom';

function Publishers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editPublisher, setEditPublisher] = useState(null);
  const [deletePublisher, setDeletePublisher] = useState(null);

  const {loading, error, data} = useQuery(queries.GET_PUBLISHERS, {
    fetchPolicy: 'cache-and-network'
  });
  const handleOpenEditModal = (publisher) => {
    setShowEditModal(true);
    setEditPublisher(publisher);
  };

  const handleOpenDeleteModal = (publisher) => {
    setShowDeleteModal(true);
    setDeletePublisher(publisher);
  };
  const closeAddFormState = () => {
    setShowAddForm(false);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  if (data) {
    const {publishers} = data;
    return (
      <div>
        <button className='button' onClick={() => setShowAddForm(!showAddForm)}>
          Add Publisher
        </button>
        {showAddForm && (
          <Add type='publisher' closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />
        {publishers.map((publisher) => {
          return (
            <div className='card' key={publisher._id}>
              <div className='card-body'>
              <Link to={`/publishers/${publisher._id}`} className='link'>
                <h5 className='card-title'>
                  {publisher.name}
                </h5>
                </Link>
                Established Year: {publisher.establishedYear}
                <br />
                Location: {publisher.location}
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
          );
        })}
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

export default Publishers;
