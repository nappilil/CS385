import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';

function Event() {
  const [loading, setLoading] = useState(true);
  const [event, setEventData] = useState(undefined);
  const { id } = useParams();
  
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
  
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/` + id + `?apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}`);
        if (result.status === 200) {
          setEventData(result.data);
          setLoading(false);
        } else {
          setLoading(false);
          setEventData(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setEventData(undefined);
      }
    }
    fetchData();
  }, [id]);
  console.log(event);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Try refreshing the page if the page has still not loaded</p>
      </div>
    )
  }
  else if (event === undefined) {
    return <Navigate to='/error' />;
  } else {
    //console.log(event);
    return event && (
      <div className="event-page">
        <header className="event-head">
          <h2 className="event-name">{event.name}</h2>
          <img className='event-image' src={`${event.images[4].url}`} alt={`${event.name}`}></img>
        </header>
        <p>{formatDate(event.dates.start.localDate)} at {formatTime(event.dates.start.localTime)}</p>

        <ul>
          {event._embedded.venues.map((venue) => (
            <li key={venue.id} className="event">
              <Link to={`/venues/${venue.id}`} className='link'>
                <h3>{venue.name}</h3>
                {venue.address && <p className='location'>{venue.address.line1}</p>}
                {venue.city && venue.state && <p className='location'>{venue.city.name}, {venue.state.name}</p>}
                {venue.images && <img className="image" src={`${venue.images[0].url}`} alt={`${venue.name}`}></img>}
              </Link>
              {event.pleaseNote && <p className="info"> <strong>Please Note:</strong> {event.pleaseNote}</p>}
            </li>
          ))}
        </ul>
        <div className="tickets">
          {event.seatmap && <img className='seat-map' src={`${event.seatmap.staticUrl}`} alt="seatMap"></img>}
          {event.priceRanges && <p className="price-range"> <strong>Price Range:</strong> ${event.priceRanges[0].min}-${event.priceRanges[0].max}</p>}
          {event.ticketLimit && <p className="ticket-limit"> <strong>Info:</strong> {event.ticketLimit.info}</p>}
        </div>
        <ul className="events">
          <h3>Learn More About These Attractions:</h3>
          {event._embedded.attractions.map((attraction) => (
            <li key={attraction.id} className="event">
              <Link to={`/attractions/${attraction.id}`} className='link'>
                {attraction.images && <img className="image" src={`${attraction.images[1].url}`} alt={`${attraction.name}`}></img>}
                <h3 className='title'>{attraction.name}</h3>
                {attraction.classifications && <p className='genre'>{attraction.classifications[0].genre.name}</p>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  };
}

export default Event;