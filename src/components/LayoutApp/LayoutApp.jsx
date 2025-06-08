import Header from '../Header/Header.jsx';

const LayoutApp = ({children}) => {
    return (
        <>
            <Header />
            {children}

        </>
    );
}

export default LayoutApp;