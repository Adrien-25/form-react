import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register(props) {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get('https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&facet=libcog')
            .then((res) => setCountries(res.data.records));
    }, [])
    const navigate = useNavigate();

    return (
        <div className='d-flex justify-content-center'>
            <div className='col-12 col-sm-10 col-md-8 col-lg-4'>
                <h1>Inscription avec Formik</h1>
                <Formik
                    initialValues={{ name: '', country: '', email: '', password: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                        .required('Un nom est nécessaire')
                        .min(2, 'Votre nom doit comporter au moins 2 caractères')
                        .max(50, 'Votre nom doit comporter moins de 50 caractères'),
                        email: Yup.string().email('Entrez un email valide'),
                        password: Yup.string()
                        .required('Un mot de passe est nécessaire')
                        .min(8, 'Votre mot de passe doit comporter au moins 8 caractères'),
                        country: Yup.string().required('Un pays est nécessaire')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const { name, email, password, country } = values;
                            await axios.post('https://jsonplaceholder.typicode.com/users', { name, email, password, country });
                            setSubmitting(false);
                            navigate("/");
                            props.setUser(name)
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    }
                    >
                    {({ isSubmitting }) => (
                        <Form >
                            <div className='mb-3'>
                                <label htmlFor="name" className='form-label' >Nom</label>
                                <Field type="text" className='form-control' id="name" name="name"/>
                                <ErrorMessage name ="name" component="div" className='alert alert-warning'/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label'>Email</label>
                                <Field type="email" className='form-control' id="email" name="email"/>
                                <ErrorMessage name ="email" component="div" className='alert alert-warning'/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='form-label'>Mot de passe</label>
                                <Field type="password" className='form-control' id="password" name="password"/>
                                <ErrorMessage name ="password" component="div" className='alert alert-warning'/>

                            </div>
                            <div className='mb-3'>
                                <label htmlFor="country" className='form-label'>Pays</label>
                                <Field component="select" className='form-select' id="country" name="country">
                                    <option value=""></option>
                                    {countries.map((country, index) => <option key={index} value={country.fields.libcog}>{country.fields.libcog}</option>)}
                                </Field>
                                <ErrorMessage name ="country" component="div" className='alert alert-warning'/>
                            </div>
                            <div className="d-grid gap">
                                <button className='btn btn-primary btn-expand' disabled={isSubmitting}>Valider</button>
                            </div>
                        </Form>

                    )}
                </Formik>
            </div>
        </div>
        
    );
}

export default Register;