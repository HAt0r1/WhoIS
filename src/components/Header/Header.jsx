import Logo from '../Logo/Logo.jsx';
import AuthNav from "../AuthNav/AuthNav.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import css from "./Header.module.css";

import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors.js";

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <header className={css.header}>
            <Logo />
            <Navigation />
            {isLoggedIn ? <UserNav /> : <AuthNav />}
        </header>
    )
}

export default Header;