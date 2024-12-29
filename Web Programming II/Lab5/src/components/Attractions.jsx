import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';
/**
 * use the :page param to deterime what page to request
 * page 1 = next button
 * page 2+ = previous & next button
 * if page does not have any more attractions redirect to 404 page
 * @returns paginated list of attractions from the API
 */
function Attractions() {
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractionData] = useState(undefined);
  const { page } = useParams();

  const pageNumber = () => {
    if (page === undefined) {
      return 1;
    } else if (page < 1) {
      return undefined;
    } else {
      return Number(page);
    }
  }
  const [currentPage, setCurrentPage] = useState(pageNumber());

  const nextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  }
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  let prev, next;
  if (attractions !== undefined) {
    if (currentPage > 1) {
      prev = (
        <Link to={`/attractions/page/${currentPage - 1}`} onClick={prevPage}>
          <button className="prev-button">&#8249; Previous </button>
        </Link>
      );
    }
    next = (
      <Link to={`/attractions/page/${currentPage + 1}`} onClick={nextPage}>
        <button className="next-button"> Next &#8250; </button>
      </Link>
    );
  }
  console.log(currentPage);
  //console.log(attractions);
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + (currentPage - 1));
        if (result.status === 200) {
          if (result.data._embedded.attractions) {
            setAttractionData(result.data._embedded.attractions);
            setLoading(false);
          }
        } else {
          setLoading(false);
          setAttractionData(undefined);
          setCurrentPage(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(true);
        setAttractionData(undefined);
        setCurrentPage(undefined);
      }
    }
    fetchData();
    setCurrentPage(pageNumber());
  }, [currentPage, page]);

  if (loading && currentPage !== undefined) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Try refreshing the page if the page has still not loaded</p>
      </div>
    )
  }
  //console.log(currentPage);
  if (attractions === undefined || currentPage === undefined) {
    return <Navigate to='/error' />;
  } else {
    console.log(attractions);
    return (
      <div className='App'>
        <h2>Attractions</h2>
        <p>Welcome to the Attractions page, here you can find all the latest attractions. </p>
        <div className="button-container">
          {prev}
          {next}
        </div>
        <ul className="events">
          {attractions && attractions.map((attraction) => (
            <li key={attraction.id} className="event">
              <Link to={`/attractions/${attraction.id}`} className='link'>
                {attraction.images && <img className="image" src={`${attraction.images[1].url}`} alt={`${attraction.name}`}></img>}
                <h3 className='title'>{attraction.name}</h3>
                {attraction.classifications && <p> {attraction.classifications[0].genre.name} </p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Attractions;