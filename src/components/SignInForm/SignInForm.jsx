import {Formik, Field, Form} from "formik";
import {useId} from "react";
import {signIn} from "../../redux/auth/operations.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import css from "../SignUpForm/SignUpForm.module.css";

const SignInForm = () => {
    const phoneId = useId();
    const passwordId = useId();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(signIn(values));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Успішний вхід");
                resetForm();
                navigation("/");
            } else {
                toast.error(result.payload || "Помилка при вході");
            }
        } catch (error) {
            toast.error("Невідома помилка при вході");
            console.error("Unexpected error during login:", error);
        }
    };


    return (
        <>
            <Formik
                initialValues={{phone: "", password: ""}}
                onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <h2 className={css.title}>Login</h2>
                    <div className={css.formEl}>
                        <label  className={css.label} htmlFor={phoneId}>Phone</label>
                        <Field className={css.input} type="text" name="phone" id={phoneId} />
                    </div>
                    <div className={css.formEl}>
                        <label className={css.label} htmlFor={passwordId}>Password</label>
                        <Field className={css.input} type="password" name="password" id={passwordId} />
                    </div>
                    <button className={css.button} type="submit">
                        Login
                    </button>
                </Form>
            </Formik>
        </>
    )
}

export default SignInForm;