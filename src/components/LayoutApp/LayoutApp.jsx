import Header from '../Header/Header.jsx';
import {useLocation} from "react-router-dom";

const LayoutApp = ({ children }) => {
    const location = useLocation();
    const hideHeaderPaths = ['/signin', '/signup'];
    const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

    return (
        <>
            {!shouldHideHeader && <Header />}
            {children}
        </>
    );
};

export default LayoutApp;