import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios'; //you must use axios to get the data 
import './App.css';

function Attraction() {
  const [loading, setLoading] = useState(true);
  const [attraction, setAttractionData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    console.log('useEffect has been called');
    async function fetchData() {
      try {
        const result = await axios.get(`https://app.ticketmaster.com/discovery/v2/attractions/` + id + `?apikey=${'inhGhRlfRnOBz1srmSsyKD0cfUg6Gwjs'}`);
        if (result.status === 200) {
          setAttractionData(result.data);
          setLoading(false);
        } else {
          setLoading(false);
          setAttractionData(undefined);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
        setAttractionData(undefined);
      }
    }
    fetchData();
  }, [id]);
  console.log(attraction);
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Try refreshing the page if the page has still not loaded</p>
      </div>
    )
  } else if (attraction === undefined) {
    return <Navigate to='/error' />;
  } else {
    return attraction && (
      <div className="event-page">
        <header className="event-head">
          <h2 className="event-name">{attraction.name}</h2>
          {attraction.images && <img className='event-image' src={`${attraction.images[1].url}`} alt={`${attraction.name}`}></img>}
        </header>
        <div className='attraction-info'>
          {attraction.classifications && <p className="genre-info">{attraction.classifications[0].genre.name} </p>}
          {attraction.classifications[0].subType.name !== "Undefined" && <p className="genre-info">{attraction.classifications[0].subType.name}</p>}
        </div>
        <h3>Social Media</h3>
        {attraction.externalLinks && <ul className="social-media">
          {attraction.externalLinks.facebook && <li>
            <Link to={`${attraction.externalLinks.facebook[0].url}`} className='link'>
            <img className='social' src={"https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-2.png"} alt={"Facebook Logo"}></img>
              <h3>Facebook</h3>
            </Link>
          </li>}
          {attraction.externalLinks.homepage && <li>
            <Link to={`${attraction.externalLinks.homepage[0].url}`} className='link'>
            <img className='social' src={"https://www.freepnglogos.com/uploads/logo-home-png/home-logo-images-black-5.png"} alt={"Homepage Logo"}></img>
              <h3>Homepage</h3>
            </Link>
          </li>}
          {attraction.externalLinks.instagram && <li>
            <Link to={`${attraction.externalLinks.instagram[0].url}`} className='link'>
            <img className='social' src={"https://static.vecteezy.com/system/resources/previews/017/743/717/large_2x/instagram-icon-logo-free-png.png"} alt={"Instagram Logo"}></img>
              <h3>Instragram</h3>
            </Link>
          </li>}
          {attraction.externalLinks.lastfm && <li>
            <Link to={`${attraction.externalLinks.lastfm[0].url}`} className='link'>
            <img className='social' src={"https://icons.iconarchive.com/icons/sicons/basic-round-social/512/last.fm-icon.png"} alt={"LastFM Logo"}></img>
              <h3>LastFM</h3>
            </Link>
          </li>}
          {attraction.externalLinks.musicbrainz && <li>
            <Link to={`${attraction.externalLinks.musicbrainz[0].url}`} className='link'>
            <img className='social' src={"https://th.bing.com/th/id/R.3a2b886d0035f3a8745db9d7b63b6c8d?rik=CJCUc6jxHoqnfQ&pid=ImgRaw&r=0"} alt={"Musicbrainz Logo"}></img>
              <h3>Musicbrainz</h3>
            </Link>
          </li>}
          {attraction.externalLinks.itunes && <li>
            <Link to={`${attraction.externalLinks.itunes[0].url}`} className='link'>
            <img className='social' src={"https://logodownload.org/wp-content/uploads/2018/09/itunes-logo-1-768x768.png"} alt={"iTunes Logo"}></img>
              <h3>iTunes</h3>
            </Link>
          </li>}
          {attraction.externalLinks.spotify && <li>
            <Link to={`${attraction.externalLinks.spotify[0].url}`} className='link'>
            <img className='social' src={"https://clipartcraft.com/images/spotify-logo-transparent-music-3.png"} alt={"Spotify Logo"}></img>
              <h3>Spotify</h3>
            </Link>
          </li>}
          {attraction.externalLinks.twitter && <li>
            <Link to={`${attraction.externalLinks.twitter[0].url}`} className='link'>
            <img className='social' src={"https://th.bing.com/th/id/OIP.H836RvDYYgQZcZn0TC8qBAHaHa?w=2186&h=2186&rs=1&pid=ImgDetMain"} alt={"Twitter Logo"}></img>
              <h3>Twitter</h3>
            </Link>
          </li>}
          {attraction.externalLinks.youtube && <li>
            <Link to={`${attraction.externalLinks.youtube[0].url}`} className='link'>
            <img className='social' src={"https://www.freeiconspng.com/uploads/youtube-logo-png-hd-21.png"} alt={"YouTube Logo"}></img>
              <h3>YouTube</h3>
            </Link>
          </li>}
          {attraction.externalLinks.wiki && <li>
            <Link to={`${attraction.externalLinks.wiki[0].url}`} className='link'>
            <img className='social' src={"https://pngimg.com/uploads/wikipedia/wikipedia_PNG2.png"} alt={"Wiki Logo"}></img>
              <h3>Wiki</h3>
            </Link>
          </li>}
        </ul>}
      </div>
    );
  }
}

export default Attraction;