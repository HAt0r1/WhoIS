import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../redux/auth/operations.js"
import {selectUser} from "../../redux/auth/selectors.js";

import { FaRegUser } from "react-icons/fa6";

const UserNav = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="userContainer">
                <FaRegUser/>
            </div>
            <Link onClick={() => dispatch(signOut())}>Logout</Link>
        </div>
    )
}

export default UserNav;