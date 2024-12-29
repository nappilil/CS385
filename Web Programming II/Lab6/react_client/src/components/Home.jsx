import React from 'react';
import './App.css';
function Home() {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Authors, Publishers and Books!</h5>
        <p className='cap-first-letter:first-letter'>
          This is site has authors, publishers, and their respective books. You can add, edit, delete authors/publishers/books!
        </p>
        <p>
          It uses Apollo Server as the GraphQL server and Apollo Client and
          React as the client and demonstrates queries and mutations
        </p>
      </div>
    </div>
  );
}

export default Home;
