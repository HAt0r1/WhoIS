import {Formik, Field, Form} from "formik";
import {useId} from "react";
import {useDispatch} from "react-redux";
import {signUp} from "../../redux/auth/operations.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

import css from "./SignUpForm.module.css";

const SignUpForm = () => {
    const phoneId = useId();
    const passwordId = useId();
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(signUp(values));
            if (result.meta.requestStatus === "fulfilled") {
                toast.success("Реєстрація успішна");
                resetForm();
                navigation("/");
            } else {
                toast.error(result.payload || "Помилка при реєстрації");
            }
        } catch (error) {
            toast.error("Невідома помилка при реєстрації");
            console.error("Unexpected error during registration:", error);
        }
    };

    return (
        <>
            <Formik
                initialValues={{phone: "", password: ""}}
                onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <h2 className={css.title}>Registration</h2>
                    <div className={css.formEl}>
                        <label  className={css.label} htmlFor={phoneId}>Phone</label>
                        <Field className={css.input} type="text" name="phone" id={phoneId} />
                    </div>
                    <div className={css.formEl}>
                        <label className={css.label} htmlFor={passwordId}>Password</label>
                        <Field className={css.input} type="password" name="password" id={passwordId} />
                    </div>
                    <button className={css.button} type="submit">
                        Registration
                    </button>
                </Form>
            </Formik>
        </>
    )
}

export default SignUpForm;