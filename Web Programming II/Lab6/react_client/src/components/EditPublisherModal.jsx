import React, {useState} from 'react';
import './App.css';
import ReactModal from 'react-modal';
import {useQuery, useMutation} from '@apollo/client';
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

function EditPublisherModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const [publisher, setPublisher] = useState(props.publisher);
  const {loading, error, data} = useQuery(queries.GET_PUBLISHERS);
  const [editPublisher] = useMutation(queries.EDIT_PUBLISHER);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setPublisher(null);

    props.handleClose();
  };
  let name;
  let location;
  let establishedYear;
  if (data) {
    var {publishers} = data;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ReactModal
        name='editModal'
        isOpen={showEditModal}
        contentLabel='Edit Publisher'
        style={customStyles}
      >
        <form
          className='form'
          id='add-publisher'
          onSubmit={(e) => {
            console.log(props.publisher);
            console.log(props.publisher._id);
            console.log(name.value);
            console.log(location.value);
            console.log(parseInt(establishedYear.value));
            e.preventDefault();
            editPublisher({
              variables: {
                _id: props.publisher._id,
                name: name.value,
                establishedYear: parseInt(establishedYear.value),
                location: location.value
              }
            }).then(() => {
              alert('Publisher Updated');
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
                defaultValue={publisher.name}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Established Year:
              <br />
              <input
                ref={(node) => {
                  establishedYear = node;
                }}
                defaultValue={publisher.establishedYear}
              />
            </label>
          </div>
          <br />
          <br />
          <div className='form-group'>
            <label>
              Location:
              <br />
              <input
                ref={(node) => {
                  location = node;
                }}
                defaultValue={publisher.location}
              />
            </label>
          </div>
          <br />
          <button className='button add-button' type='submit'>
            Update Publisher
          </button>
        </form>

        <button className='button cancel-button' onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditPublisherModal;
