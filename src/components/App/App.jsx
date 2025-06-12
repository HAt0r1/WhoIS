import {Toaster} from "react-hot-toast";
import {lazy, Suspense, useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectIsRefreshing, selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {refresh} from "../../redux/auth/operations.js";
import {signOut} from "../../redux/auth/operations.js";

import Loader from "../Loader/Loader.jsx";
import LayoutApp from "../LayoutApp/LayoutApp.jsx";


const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SearchPage = lazy(() => import("../../pages/SearchPage/SearchPage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage.jsx"));

const App = () => {
    const isRefreshing= useSelector(selectIsRefreshing);
    const isLoggedIn= useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refresh());
    }, [dispatch]);

    useEffect(() => {
        if (!isRefreshing && !isLoggedIn) {
            dispatch(signOut());
        }
    }, [isRefreshing, isLoggedIn, dispatch]);

    return (
        <>
            <Toaster position="top-right"/>
            {isRefreshing ? (<Loader />) : (
        <LayoutApp>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </LayoutApp>

            )}
        </>
    );
}

export default App;
