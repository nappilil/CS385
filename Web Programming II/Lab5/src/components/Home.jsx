import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEventData] = useState(undefined);
  const [venues, setVenueData] = useState(undefined);
  const [attractions, setAttractionData] = useState(undefined);
  const formatDate = (localDate) => {
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY",
      "JUN", "JUL", "AUG",
      "SEPT", "OCT", "NOV", "DEC"];
    localDate = new Date(localDate);
    let month = months[localDate.getMonth()];
    let day = localDate.getDate();
    let year = localDate.getFullYear();
    const newDate = month + " " + day + ", " + year;
    return newDate;
  }
  const formatTime = (localTime) => {
    if (localTime === undefined) return "";
    localTime = localTime.split(':');
    let hours = Number(localTime[0]);
    let mins = String(localTime[1]);
    if (mins.length === 1) {
      mins = "0" + mins;
    }
    if (hours >= 12) {
      mins = mins + " " + "PM";
    } else {
      mins = mins + " " + "AM";
    }
    if (hours > 12) {
      hours = hours - 12;
    } else if (hours === 0) {
      hours = 12;
    }
    const newTime = "@" + String(hours) + ":" + mins;
    return newTime;
  }
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + "2");
        if (result.status === 200) {
          if (result.data._embedded.venues) {
            setVenueData(result.data._embedded.venues);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + "5");
        if (result.status === 200) {
          if (result.data._embedded.events) {
            setEventData(result.data._embedded.events);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions?countryCode=US&apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}&page=` + "4");
        if (result.status === 200) {
          if (result.data._embedded.attractions) {
            setAttractionData(result.data._embedded.attractions);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Try refreshing the page if the page has still not loaded</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Home</h2>
        <p>Hi, this is the home page. This website uses an API from ticketmaster to view all the lastest events, venues, and attractions. </p>
        <div className="events">
          <ul className="home">
            <h4>Events</h4>
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
          <ul className="home">
            <h4>Venues</h4>
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
          <ul className="home">
            <h4>Attractions</h4>
            {attractions && attractions.map((attraction) => (
              <li key={attraction.id} className="event">
                <Link to={`/attractions/${attraction.id}`} className='link'>
                  {attraction.images && <img className='image' src={`${attraction.images[1].url}`} alt={`${attraction.name}`}></img>}
                  <h3 className='title'>{attraction.name}</h3>
                  {attraction.classifications && <p className="location"> {attraction.classifications[0].genre.name} </p>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;