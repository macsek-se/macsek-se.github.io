import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import ChildInput from './ChildInput';
import RelativeInput from './RelativeInput';
import './RegistrationForm.css'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        children: [{ name: '', birthday: '' }],
        relatives: [{ name: '' }],
        events: [],
    });

    const [eventsList, setEventsList] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null); // New state for tracking submission status

    useEffect(() => {
        axiosInstance.get('/events')
            .then(response => {
                setEventsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        validateForm();

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChildChange = (index, e) => {
        const { name, value } = e.target;
        const newChildren = formData.children.map((child, i) => (
            i === index ? { ...child, [name]: value } : child
        ));
        setFormData({
            ...formData,
            children: newChildren,
        });
    };

    const handleAddChild = () => {
        setFormData({
            ...formData,
            children: [...formData.children, { name: '', birthday: '' }],
        });
    };

    const handleRemoveChild = (index) => {
        const newChildren = formData.children.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            children: newChildren,
        });
    };

    const handleRelativeChange = (index, e) => {
        const { name, value } = e.target;
        const newRelatives = formData.relatives.map((relative, i) => (
            i === index ? { ...relative, [name]: value } : relative
        ));
        setFormData({
            ...formData,
            relatives: newRelatives,
        });
    };

    const handleAddRelative = () => {
        setFormData({
            ...formData,
            relatives: [...formData.relatives, { name: '' }],
        });
    };

    const handleRemoveRelative = (index) => {
        const newRelatives = formData.relatives.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            relatives: newRelatives,
        });
    };
    const handleEventChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                events: [...formData.events, value],
            });
        } else {
            setFormData({
                ...formData,
                events: formData.events.filter((event) => event !== value),
            });
        }
    };
    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Név megadása kötelező';
        if (!formData.email) errors.email = 'Email megadása kötelező';
        if (!formData.telephone) errors.telephone = 'Telefonszám megadása kötelező';
        setFormErrors(errors);
        console.log(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convert children birthdays to ISO8601 format
            const formattedChildren = formData.children.map(child => {
                if (child.birthday) {
                    return {
                        ...child,
                        birthday: new Date(child.birthday).toISOString()  // Use full ISO8601 format
                    };
                }
                return child;
            });
            console.log('Formatted children data:', formattedChildren);
            // Make the POST request to the backend
            const response = await axiosInstance.post('/register', { ...formData, children: formattedChildren });

            // Handle success
            console.log('Registration successful:', response.data);
            setSubmissionStatus('success');

        } catch (error) {
            // Handle error
            console.error('Error during registration:', error);

            let errorMessage = 'An error occurred during registration.';

            if (error.response) {
                console.error('Error does contain response')
                if (error.response.data && error.response.data.reason) {
                    errorMessage = error.response.data.reason;
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

            } else if (error.message) {
                errorMessage = error.message;
            } else if (error.request) {
                errorMessage = 'No response received from the server.';
            } else {
                errorMessage = 'Request setup was invalid.';
            }
            setSubmissionStatus('error');
            setMessage(errorMessage);
        }
    };

    return (
        <div className="container">
            <h2>Esemény regisztráció</h2>
            {submissionStatus === 'success' && <p className="success-message">Köszönjük a regisztrációt!</p>}
            {submissionStatus === 'error' && <p className="error-message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Név:
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    {formErrors.name && <span style={{ color: 'red' }}>{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <label>
                        E-mail cím:
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <label>
                        Tel. szám:
                    </label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
                    {formErrors.telephone && <span style={{ color: 'red' }}>{formErrors.telephone}</span>}
                </div>
                <div>
                    <h3>Gyerekek</h3>
                    {formData.children.map((child, index) => (
                        <ChildInput
                            key={index}
                            index={index}
                            child={child}
                            handleChildChange={handleChildChange}
                            handleRemoveChild={handleRemoveChild}
                        />
                    ))}
                    <button type="button" onClick={handleAddChild}>Gyermek hozzáad</button>
                </div>
                <div>
                    <h3>Felnőttek</h3>
                    {formData.relatives.map((relative, index) => (
                        <RelativeInput
                            key={index}
                            index={index}
                            relative={relative}
                            handleRelativeChange={handleRelativeChange}
                            handleRemoveRelative={handleRemoveRelative}
                        />
                    ))}
                    <button type="button" onClick={handleAddRelative}>Felnőtt hozzáad</button>
                </div>
                <div>
                    <h3>Részvétel</h3>
                    {eventsList.map((event) => (
                        <div key={event.id} className="event-group">
                            <input
                                type="checkbox"
                                id={`event-${event.id}`}
                                value={event.id}
                                checked={formData.events.includes(event.id)}
                                onChange={handleEventChange}
                            />
                            <label htmlFor={`event-${event.id}`}><b>{event.name}:</b> {event.description}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Regisztrál</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
