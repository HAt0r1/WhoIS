import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import css from "./SignInPage.module.css";


const SignInPage = () => {
    return (
        <main className={css.main}>
            <SignInForm />
        </main>
    )
}

export default SignInPage;