import React from 'react';
import './App.css';

import { useQuery, useMutation } from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../queries';

function Add(props) {
  const [addAuthor] = useMutation(queries.ADD_AUTHOR, {
    update(cache, { data: { addAuthor } }) {
      const { authors } = cache.readQuery({
        query: queries.GET_AUTHORS
      });
      cache.writeQuery({
        query: queries.GET_AUTHORS,
        data: { authors: [...authors, addAuthor] }
      });
    }
  });

  const [addPublisher] = useMutation(queries.ADD_PUBLISHER, {
    update(cache, { data: { addPublisher } }) {
      const { publishers } = cache.readQuery({
        query: queries.GET_PUBLISHERS
      });
      cache.writeQuery({
        query: queries.GET_PUBLISHERS,
        data: { publishers: [...publishers, addPublisher] }
      });
    }
  });

  const [addBook] = useMutation(queries.ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({
        query: queries.GET_BOOKS
      });
      cache.writeQuery({
        query: queries.GET_BOOKS,
        data: { books: [...books, addBook] }
      });
    }
  });

  const onSubmitAuthor = (e) => {
    e.preventDefault();
    let name = document.getElementById('name');
    let dateOfBirth = document.getElementById('dateOfBirth');
    let bio = document.getElementById('bio');
    addAuthor({
      variables: {
        name: name.value,
        dateOfBirth: dateOfBirth.value,
        bio: bio.value,
      }
    }).then(() => {
      document.getElementById('add-author').reset();
      alert('Author Added');
      props.closeAddFormState();
    }).catch((e) => {
      alert(e.message);
    })
  };

  const onSubmitPublisher = (e) => {
    e.preventDefault();
    let name = document.getElementById('name');
    let establishedYear = document.getElementById('establishedYear');
    let location = document.getElementById('location');
    addPublisher({
      variables: {
        name: name.value,
        establishedYear: parseInt(establishedYear.value),
        location: location.value
      }
    }).then(() => {
      document.getElementById('add-publisher').reset();
      alert('Publisher Added');
      props.closeAddFormState();
    }).catch((e) => {
      alert(e.message);
    })
  };

  const onSubmitBook = (e) => {
    e.preventDefault();
    let title = document.getElementById('title');
    let genre = document.getElementById('genre');
    let publicationDate = document.getElementById('publicationDate');
    let chapters = document.getElementById('chapters');
    let authorId = document.getElementById('authorId');
    let publisherId = document.getElementById('publisherId');
    addBook({
      variables: {
        title: title.value,
        genre: genre.value,
        publicationDate: publicationDate.value,
        chapters: chapters.value.split(",").map((chapter => chapter.trim())),
        authorId: String(authorId.value),
        publisherId: String(publisherId.value),
      }
    }).then(() => {
      document.getElementById('add-book').reset();
      alert('Book Added');
      props.closeAddFormState();
    }).catch((e) => {
      alert(e.message);
    })
  };


  const { data } = useQuery(queries.GET_PUBLISHERS);
  if (data) {
    var { publishers } = data;
  }

  let body = null;
  if (props.type === 'author') {
    body = (
      <div className='card'>
        <form className='form' id='add-author' onSubmit={onSubmitAuthor}>
          <div className='form-group'>
            <label>
              Name:
              <br />
              <input id='name' required autoFocus={true} />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Bio:
              <br />
              <input id='bio' />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Date of Birth:
              <br />
              <input id='dateOfBirth' required autoFocus={true} />
            </label>
          </div>
          <br />
          {/*
          <div className='form-group'>
            <label>
              Publisher:
              <select className='form-control' id='publisherId'>
                {publishers &&
                  pu.map((employer) => {
                    return (
                      <option key={employer._id} value={employer._id}>
                        {employer.name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          */}
          <br />
          <br />
          <button className='button add-button' type='submit'>
            Add Author
          </button>
          <button
            type='button'
            className='button cancel-button'
            onClick={() => {
              document.getElementById('add-author').reset();
              props.closeAddFormState();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  } else if (props.type === 'publisher') {
    let name;
    body = (
      <div className='card'>
        <form className='form' id='add-publisher' onSubmit={onSubmitPublisher}>
          <div className='form-group'>
            <label>
              Name:
              <br />
              <input id='name' required autoFocus={true} />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Established Year:
              <br />
              <input id='establishedYear' required autoFocus={true} />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <label>
              Location:
              <br />
              <input id='location' required autoFocus={true} />
            </label>
          </div>
          <br />
          <br />
          <button className='button' type='submit'>
            Add Publisher
          </button>
          <button
            type='button'
            className='button'
            onClick={() => {
              document.getElementById('add-publisher').reset();
              props.closeAddFormState();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  } else if (props.type === 'book') {
    let title;
    body = (
      <div className='card'>
        <form className='form' id='add-book' onSubmit={onSubmitBook}>
          <div className='form-group'>
            <label>
              Title:
              <br />
              <input id='title' required autoFocus={true} />
            </label>
          </div>
          <br />
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
          </div>
          <br />
          <div className='form-group'>
          <br />
            <label>
              Publication Date:
              <br />
              <input id='publicationDate' required autoFocus={true} />
            </label>
          </div>
          <div className='form-group'>
          <br />
            <label>
              Chapters:
              <br />
              <input id='chapters' required autoFocus={true} />
            </label>
          </div>
          <div className='form-group'>
          <br />
            <label>
              Author Id:
              <br />
              <input id='authorId' required autoFocus={true} />
            </label>
          </div>
          <div className='form-group'>
          <br />
            <label>
              Publisher Id:
              <br />
              <input id='publisherId' required autoFocus={true} />
            </label>
          </div>
          <br />
          <br />
          <button className='button' type='submit'>
            Add Book
          </button>
          <button
            type='button'
            className='button'
            onClick={() => {
              document.getElementById('add-book').reset();
              props.closeAddFormState();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
  return <div>{body}</div>;
}

export default Add;
