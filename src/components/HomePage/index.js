import React from 'react';
import UserProfile from '../UserProfile';
import css from './homePage.module.css';


function HomePage() {
    return (
        <div className={css.bg}>
            <h1>Home page</h1>
            <UserProfile/>
        </div>
    )
}

export default HomePage
