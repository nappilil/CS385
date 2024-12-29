import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';
/**
 * use the :page param to deterime what page to request
 * page 1 = next button
 * page 2+ = previous & next button
 * if page does not have any more events redirect to 404 page
 * @returns paginated list of events from the API
 */
function Events() {
  const [loading, setLoading] = useState(true);
  const [events, setEventData] = useState(undefined);
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
  const formatDate = (date) => {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY",
      "JUN", "JUL", "AUG",
      "SEPT", "OCT", "NOV", "DEC"];
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, 10);
    if (month[0] === "0") {
      month = months[Number(month.slice(1))-1];
    }
    return month + ' ' + day + ' ' + year;
  }

  const formatTime = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    time = time.join('');
    time = "@" + time.slice(0, 4) + time.slice(7);
    return time // return adjusted time or original string
  }
  let prev, next;
  if (events !== undefined) {
    if (currentPage > 1) {
      prev = (
        <Link to={`/events/page/${currentPage - 1}`} onClick={prevPage}>
          <button className="prev-button">&#8249; Previous </button>
        </Link>
      );
    }
    next = (
      <Link to={`/events/page/${currentPage + 1}`} onClick={nextPage}>
        <button className="next-button"> Next &#8250; </button>
      </Link>
    );
  }
  //console.log(currentPage);
  //console.log(events);
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + (currentPage - 1));
        if (result.status === 200) {
          if (result.data._embedded.events) {
            setEventData(result.data._embedded.events);
            setLoading(false);
          }
        } else {
          setLoading(false);
          setEventData(undefined);
          setCurrentPage(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(true);
        setEventData(undefined);
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
  if (events === undefined || currentPage === undefined) {
    return <Navigate to='/error' />;
  } else {
    console.log(events);
    return (
      <div className='App'>
        <h2>Events</h2>
        <p>Welcome to the Events page. Here you can find all the latest events and prices.</p>
        <div className="button-container">
          {prev}
          {next}
        </div>
        <ul className="events">
          {events && events.map((event) => (
            <li key={event.id} className="event">
              <Link to={`/events/${event.id}`} className='link'>
                <img className='image' src={`${event.images[1].url}`} alt={`${event.name}`}></img>
                <h3 className='title'>{event.name}</h3>
                <p className="time">{formatDate(event.dates.start.localDate)} {formatTime(event.dates.start.localTime)}</p>
                <p className="price">{event.priceRanges && `Price Range: $${event.priceRanges[0].min}-$${event.priceRanges[0].max}`}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Events;