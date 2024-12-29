import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';
/**
 * use the :page param to deterime what page to request
 * page 1 = next button
 * page 2+ = previous & next button
 * if page does not have any more venues redirect to 404 page
 * @returns paginated list of venues from the API
 */
function Venues() {
  const [loading, setLoading] = useState(true);
  const [venues, setVenueData] = useState(undefined);
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
  if (venues !== undefined) {
    if (currentPage > 1) {
      prev = (
        <Link to={`/venues/page/${currentPage - 1}`} onClick={prevPage}>
          <button className="prev-button">&#8249; Previous </button>
        </Link>
      );
    }
    next = (
      <Link to={`/venues/page/${currentPage + 1}`} onClick={nextPage}>
        <button className="next-button"> Next &#8250; </button>
      </Link>
    );
  }
  console.log(currentPage);
  //console.log(venues);
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + (currentPage - 1));
        if (result.status === 200) {
          if (result.data._embedded.venues) {
            setVenueData(result.data._embedded.venues);
            setLoading(false);
          }
        } else {
          setLoading(false);
          setVenueData(undefined);
          setCurrentPage(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(true);
        setVenueData(undefined);
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
  console.log(currentPage);
  if (venues === undefined || currentPage === undefined) {
    return <Navigate to='/error' />;
  } else {
    console.log(venues);
    return (
      <div className='App'>
        <h2>Venues</h2>
        <p>Welcome to the Venues page. Here you can find all available venues, their information and rules.</p>
        <div className="button-container">
          {prev}
          {next}
        </div>
        <ul className="events">
          {venues && venues.map((venue) => (
            <li key={venue.id} className="event">
              <Link to={`/venues/${venue.id}`} className='link'>
                {venue.images && <img className="image" src={`${venue.images[0].url}`} alt={`${venue.name}`}></img>}
                <h3 className='title'>{venue.name}</h3>
                {venue.address && <p className='location'>{venue.address.line1}</p>}
                {venue.city && venue.state && <p className='location'>{venue.city.name}, {venue.state.name}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Venues;