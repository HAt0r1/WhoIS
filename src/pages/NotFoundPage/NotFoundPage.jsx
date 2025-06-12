import {NavLink} from 'react-router-dom'

import css from "./NotFoundPage.module.css";


const NotFoundPage = () => {
    return (
        <main className={css.main}>
            <h2>Sorry, something went wrong &#128532;</h2>
            <p>You can reload the page and click the button below to return to the home page.</p>
            <NavLink className={css.button} to="/">Home Page</NavLink>
        </main>
    )
}

export default NotFoundPage;