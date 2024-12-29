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

function EditBookModal(props) {
  const [showEditModal, setShowEditModal] = useState(props.isOpen);
  const [book, setBook] = useState(props.book);
  const {loading, error, data} = useQuery(queries.GET_BOOKS);
  const [editBook] = useMutation(queries.EDIT_BOOK);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setBook(null);

    props.handleClose();
  };

  let title;
  let genre;
  let publicationDate;
  let chapters;
  let author;
  let publisher;
  if (data) {
    var {books} = data;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log(error);
    console.log(error.message);
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ReactModal
        name='editModal'
        isOpen={showEditModal}
        contentLabel='Edit Books'
        style={customStyles}
      >
        <form
          className='form'
          id='add-book'
          onSubmit={(e) => {
            console.log(title.value);
            console.log(publicationDate.value);
            console.log(genre.value);
            console.log(chapters.value);
            console.log(author.value);
            console.log(publisher.value);
            e.preventDefault();
            editBook({
              variables: {
                _id: props.book._id,
                title: title.value,
                publicationDate: publicationDate.value,
                genre: genre.value,
                chapters: chapters.value.split(",").map((chapter => chapter.trim())),
                authorId: author.value,
                publisherId: publisher.value
              }
            }).then(() => {
              alert('Book Updated');
              setShowEditModal(false);
              props.handleClose();
            }).catch((e) => {
              alert(e.message);
            });
          }}
        >
          <div className='form-group'>
            <label>
              Title:
              <br />
              <input
                ref={(node) => {
                  title = node;
                }}
                defaultValue={book.title}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Publication Date:
              <br />
              <input
                ref={(node) => {
                  publicationDate = node;
                }}
                defaultValue={book.publicationDate}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Genre:
              <br />
              <select
                ref={(node) => {
                  genre = node;
                }}
                defaultValue={book.genre}
              >
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
          </div>
          <br />
          <div className='form-group'>
            <label>
              Chapters:
              <input
                ref={(node) => {
                    chapters = node;
                }}
                defaultValue={book.chapters.join(", ")}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Author Id:
              <br />
              <input
                ref={(node) => {
                  author = node;
                }}
                defaultValue={book.author._id}
              />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Publisher Id:
              <br />
              <input
                ref={(node) => {
                  publisher = node;
                }}
                defaultValue={book.publisher._id}
              />
            </label>
          </div>
          <br />
          <br />
          <button className='button add-button' type='submit'>
            Update Book
          </button>
        </form>

        <button className='button cancel-button' onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditBookModal;
