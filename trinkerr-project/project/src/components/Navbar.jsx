import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Styling.module.css'

const Navbar=()=>{


      
    return(
        <div className={styles.navbar__head}>

            <div>
                <NavLink to="/"  className={(navData)=>navData.isActive ? styles.navbar__active : styles.navbar__text}>Search Stocks</NavLink>
            </div> 
            <div>
                <NavLink to="/wishList" className={(navData)=>navData.isActive ? styles.navbar__active : styles.navbar__text}  >Wish List</NavLink> 
            </div>
      </div>
    )
}

export {Navbar}