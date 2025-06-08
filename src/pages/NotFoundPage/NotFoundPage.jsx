import {NavLink} from 'react-router-dom'



const NotFoundPage = () => {
    return (
        <div>
            <h2>Sorry, something went wrong &#128532;</h2>
            <p>You can reload the page and click the button below to return to the home page.</p>
            <NavLink to="/">HomePage</NavLink>
        </div>
    )
}

export default NotFoundPage;