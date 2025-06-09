import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../redux/auth/operations.js"
import {selectUser} from "../../redux/auth/selectors.js";

import css from "./Usernav.module.css";

const UserNav = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className={css.container}>
            <p className={css.text}>{user.phone}</p>
            <Link className={css.link} onClick={() => dispatch(signOut())}>Logout</Link>
        </div>
    )
}

export default UserNav;