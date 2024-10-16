// client/src/components/Navigation.jsx

import React from 'react'
import '../App.css'
import '../css/Navigation.css'
import { Link } from 'react-router-dom' // Use Link instead of <a> for client-side routing

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Bolt Bucket 🏎️</h1></li>
            </ul>

            <ul>
                {/* Optionally remove the "Customize" link or keep it pointing to "/" */}
                <li><Link to='/' role='button'>Customize</Link></li>
                <li><Link to='/customcars' role='button'>View Cars</Link></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
