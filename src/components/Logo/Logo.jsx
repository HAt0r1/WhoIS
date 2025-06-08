import {Link} from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
    return (
        <div>
            <Link className={css.logo} to="/">Dotomo</Link>
        </div>
    )
}

export default Logo;