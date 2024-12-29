import './App.css'
import Home from './Home';
import Events from './Events';
import Event from './Event';
import Venues from './Venues';
import Venue from './Venue';
import Attractions from './Attractions';
import Attraction from './Attraction';
import Error from './Error';
import {Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <header className='navigation'>
        <nav role="navigation">
          <Link to='/'>Home</Link>
          <Link to='/events/page/1'>Events</Link>
          <Link to='/venues/page/1'>Venues</Link>
          <Link to='/attractions/page/1'>Attractions</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/events/page/:page' element={<Events/>} />
        <Route path='/events/:id' element={<Event/>} />
        <Route path='/venues/page/:page' element={<Venues/>} />
        <Route path='/venues/:id' element={<Venue/>} />
        <Route path='/attractions/page/:page' element={<Attractions/>} />
        <Route path='/attractions/:id' element={<Attraction/>} />
        <Route path='/error' element={<Error/>} />
      </Routes>
    </div>
  );
}
export default App
