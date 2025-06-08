import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors.js";

import clsx from "clsx";
import css from "./Navigation.module.css";

const activeElement = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
            <nav>
                <ul className={css.navList}>
                    <li>
                        <NavLink to='/' className={activeElement}>Home</NavLink>
                    </li>
                    <li>
                        {isLoggedIn && (
                            <NavLink to='/search' className={activeElement}>Search</NavLink>
                        )}
                    </li>
                </ul>
            </nav>
    )
}

export default Navigation;