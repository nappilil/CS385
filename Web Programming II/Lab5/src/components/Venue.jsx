import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';

function Venue() {
  const [loading, setLoading] = useState(true);
  const [venue, setVenueData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/` + id + `?apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}`);
        if (result.status === 200) {
          setVenueData(result.data);
          setLoading(false);
        } else {
          setLoading(false);
          setVenueData(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setVenueData(undefined);
      }
    }
    fetchData();
  }, [id]);
  console.log(venue);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Try refreshing the page if the page has still not loaded</p>
      </div>
    )
  }
  else if (venue === undefined) {
    return <Navigate to='/error' />;
  } else {
    //console.log(venue);
    return venue && (
      <div className="event-page">
        <header className="event-head">
          <h2 className="event-name">{venue.name}</h2>
          {venue.images && <img className='event-image' src={`${venue.images[0].url}`} alt={`${venue.name}`}></img>}
        </header>
        <p> {venue.address && <p className='location'>{venue.address.line1}</p>}</p>
        <p>{venue.city && venue.state && <p className='location'>{venue.city.name}, {venue.state.name}, {venue.postalCode}</p>}</p>
        <h4 className="table-head">Venue Information</h4>
        <table>
          <tr>
            <th>Accepted Payments</th>
            {venue.boxOfficeInfo && <td>{venue.boxOfficeInfo.acceptedPaymentDetail}</td>}
          </tr>
          <tr>
            <th>Box Office Hours</th>
            {venue.boxOfficeInfo && <td>{venue.boxOfficeInfo.openHoursDetail}</td>}
          </tr>
          <tr>
            <th>Box Office Phone</th>
            {venue.boxOfficeInfo && <td>{venue.boxOfficeInfo.phoneNumberDetail}</td>}
          </tr>
          <tr>
            <th>Child Rule</th>
            {venue.generalInfo && <td>{venue.generalInfo.childRule}</td>}
          </tr>
          <tr>
            <th>General Rule</th>
            {venue.generalInfo && <td>{venue.generalInfo.generalRule}</td>}
          </tr>
          <tr>
            <th>Parking Info</th>
            {venue.parkingDetail && <td>{venue.parkingDetail}</td>}
          </tr>
          <tr>
            <th>Accessibility Info</th>
            {venue.accessibleSeatingDetail && <td>{venue.accessibleSeatingDetail}</td>}
          </tr>
        </table>
      </div>
    );
  }
}

export default Venue;