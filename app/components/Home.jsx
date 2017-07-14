import React from 'react';
import {
  Link
} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Link to="/campuses/"><button>Campuses</button></Link>
      <Link to="/students/"><button>Students</button></Link>
    </div>
  )
}
