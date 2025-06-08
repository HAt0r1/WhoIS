import {MoonLoader} from "react-spinners";

import css from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={css.loader}>
            <MoonLoader size={40} color="#131313" />
        </div>
    )
}

export default Loader;