import React, { useState } from 'react';
import './App.css';
import ReactModal from 'react-modal';
import { useQuery, useMutation } from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../queries';

//For react-modal
ReactModal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #28547a',
    borderRadius: '4px'
  }
};

function EditAuthorModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const [author, setAuthor] = useState(props.author);
  const { loading, error, data } = useQuery(queries.GET_AUTHORS);
  const [editAuthor] = useMutation(queries.EDIT_AUTHOR);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setAuthor(null);

    props.handleClose();
  };

  let name;
  let bio;
  let dateOfBirth;
  if (data) {
    var { authors } = data;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ReactModal
        name='editModal'
        isOpen={showEditModal}
        contentLabel='Edit Authors'
        style={customStyles}
      >
        <form
          className='form'
          id='add-author'
          onSubmit={(e) => {
            e.preventDefault();
            editAuthor({
              variables: {
                _id: props.author._id,
                name: name.value,
                bio: bio.value,
                dateOfBirth: dateOfBirth.value
              }
            }).then(() => {
              alert('Author Updated');
              setShowEditModal(false);
              props.handleClose();
            }).catch((e) => {
              alert(e.message);
            });
          }}
        >
          <div className='form-group'>
            <label>
              Name:
              <br />
              <input
                ref={(node) => {
                  name = node;
                }}
                defaultValue={author.name}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Bio:
              <br />
              <input
                ref={(node) => {
                  bio = node;
                }}
                defaultValue={author.bio}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Date of Birth:
              <br />
              <input
                ref={(node) => {
                  dateOfBirth = node;
                }}
                defaultValue={author.dateOfBirth}
              />
            </label>
          </div>
          <br />
          <button className='button add-button' type='submit'>
            Update Author
          </button>
        </form>

        <button className='button cancel-button' onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditAuthorModal;
