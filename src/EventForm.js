import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker'; // Import jQuery UI datepicker
import './EventForm.css'; // External CSS for styling

const EventForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [type, setType] = useState('Personal');

    useEffect(() => {
        // Initialize datepicker using jQuery UI
        $('#startDateTime, #endDateTime').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/post', {
                name,
                description,
                start_date_time: startDateTime,
                end_date_time: endDateTime,
                type,
            });
            console.log(response.data.message);
            alert(response.data.message);
            setName('');
            setDescription('');
            setStartDateTime('');
            setEndDateTime('');
            setType('Personal');
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="event-form-container">
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="name">Event Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Event Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Event Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Event Description"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="startDateTime">Event Start Date and Time:</label>
                    <input
                        type="text"
                        id="startDateTime"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        placeholder="yyyy-mm-dd"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDateTime">Event End Date and Time:</label>
                    <input
                        type="text"
                        id="endDateTime"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        placeholder="yyyy-mm-dd"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Event Type:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="eventType"
                                value="Personal"
                                checked={type === 'Personal'}
                                onChange={(e) => setType(e.target.value)}
                            />
                            Personal Event
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="eventType"
                                value="Professional"
                                checked={type === 'Professional'}
                                onChange={(e) => setType(e.target.value)}
                            />
                            Professional Event
                        </label>
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default EventForm;
