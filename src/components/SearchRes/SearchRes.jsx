import {Formik, Field, Form} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useId} from "react";
import {searchDomain} from "../../redux/domens/operations.js";
import {selectResult, selectError} from "../../redux/domens/selectors.js";

import { CiSearch } from "react-icons/ci";
import css from "./SearchRes.module.css";

const SearchRes = () => {
    const searchId = useId();
    const dispatch = useDispatch();
    const result = useSelector(selectResult);
    const error = useSelector(selectError);

    const handleSearch = (values, { resetForm }) => {
        dispatch(searchDomain(values.domain));
        resetForm();
    };

    return (
        <>
            <Formik
                initialValues={{domain: ""}}
                onSubmit={handleSearch}>
                <Form className={css.form}>
                    <Field className={css.input} type="text" name="domain" id={searchId} placeholder="e.g. google.com"/>
                    <button className={css.button} type="submit"><CiSearch className={css.search} /></button>
                </Form>
            </Formik>

            {result && (
                <div className={css.domainInfo}>
                    <h2 className={css.domainTitle}>{result.domain}</h2>
                    <ul className={css.domainList}>
                        <li className={css.domainItem}>
                            <h3 className={css.domainItemTitle}>Administrative Contact</h3>
                            <p>State: {result.whois.administrativeContact.state}</p>
                            <p>Country: {result.whois.administrativeContact.country}</p>
                        </li>
                        <li className={css.domainItem}>
                            <h3 className={css.domainItemTitle}>Registrant Info</h3>
                            <p>Registrant Id: {result.whois.registrarIANAID}</p>
                            <p>Registrant Name: {result.whois.registrarName}</p>
                            <p>Organization: {result.whois.technicalContact.organization}</p>
                        </li>
                        <li className={css.domainItem}>
                            <h3 className={css.domainItemTitle}>Domain Info</h3>
                            <p>Domain Name: {result.whois.domainName}</p>
                            <p>Created: {result.whois.createdDate}</p>
                            <p>Expire: {result.whois.expiresDate}</p>
                        </li>
                    </ul>
                </div>
            )}

            {error && <p className={css.error}>{error}</p>}
        </>
    )

}

export default SearchRes;