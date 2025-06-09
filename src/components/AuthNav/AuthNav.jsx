import { NavLink } from "react-router-dom";

import css from "./AuthNav.module.css";

const AuthNav = () => {
   return (
       <ul className={css.authList}>
           <li>
               <NavLink to="/signin" className={css.authLink}>
                   SignIn
               </NavLink>
           </li>
           <li>
               <NavLink to="/signup" className={css.authLink}>
                   SignUp
               </NavLink>
           </li>
       </ul>
   )
}

export default AuthNav;