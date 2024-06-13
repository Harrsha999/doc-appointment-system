// import React, { useState, useEffect } from 'react';
// import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from '../services/api';

// const Appointments = () => {
//     const [appointments, setAppointments] = useState([]);
//     const [newAppointment, setNewAppointment] = useState({ patientName: '', doctorName: '', date: '', time: '', reason: '' });

//     useEffect(() => {
//         fetchAppointments();
//     }, []);

//     const fetchAppointments = async () => {
//         const response = await getAppointments();
//         setAppointments(response.data);
//     };

//     const handleCreateAppointment = async () => {
//         await createAppointment(newAppointment);
//         fetchAppointments();
//     };

//     const handleUpdateAppointment = async (id) => {
//         const updatedAppointment = { ...newAppointment, id };
//         await updateAppointment(id, updatedAppointment);
//         fetchAppointments();
//     };

//     const handleDeleteAppointment = async (id) => {
//         await deleteAppointment(id);
//         fetchAppointments();
//     };

//     return (
//         <div>
//             <h1>Appointments</h1>
//             <div>
//                 <input type="text" placeholder="Patient Name" value={newAppointment.patientName} onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })} />
//                 <input type="text" placeholder="Doctor Name" value={newAppointment.doctorName} onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })} />
//                 <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} />
//                 <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} />
//                 <input type="text" placeholder="Reason" value={newAppointment.reason} onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })} />
//                 <button onClick={handleCreateAppointment}>Create Appointment</button>
//             </div>
//             <ul>
//                 {appointments.map((appointment) => (
//                     <li key={appointment.id}>
//                         {appointment.patientName} with {appointment.doctorName} on {appointment.date} at {appointment.time} for {appointment.reason}
//                         <button onClick={() => handleUpdateAppointment(appointment.id)}>Update</button>
//                         <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Appointments;
import React, { useState, useEffect } from 'react';
import { createAppointment, getAppointments, updateAppointment, deleteAppointment } from '../services/api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ patientName: '', doctorName: '', date: '', time: '', reason: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await getAppointments();
            setAppointments(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const validateAppointment = (appointment) => {
        if (!appointment.patientName || !appointment.doctorName || !appointment.date || !appointment.time || !appointment.reason) {
            return 'All fields are required.';
        }
        return '';
    };

    const handleCreateAppointment = async () => {
        const validationError = validateAppointment(newAppointment);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            await createAppointment(newAppointment);
            fetchAppointments();
            setNewAppointment({ patientName: '', doctorName: '', date: '', time: '', reason: '' });
            setError('');
        } catch (err) {
            setError('Failed to create appointment');
            console.error(err);
        }
    };

    const handleUpdateAppointment = async (id) => {
        const validationError = validateAppointment(newAppointment);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            const updatedAppointment = { ...newAppointment, id };
            await updateAppointment(id, updatedAppointment);
            fetchAppointments();
            setNewAppointment({ patientName: '', doctorName: '', date: '', time: '', reason: '' });
            setError('');
        } catch (err) {
            setError('Failed to update appointment');
            console.error(err);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await deleteAppointment(id);
            fetchAppointments();
        } catch (err) {
            setError('Failed to delete appointment');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Appointments</h1>
            <div>
                <input type="text" placeholder="Patient Name" value={newAppointment.patientName} onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })} />
                <input type="text" placeholder="Doctor Name" value={newAppointment.doctorName} onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })} />
                <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} />
                <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} />
                <input type="text" placeholder="Reason" value={newAppointment.reason} onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })} />
                <button onClick={handleCreateAppointment}>Create Appointment</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.patientName} with {appointment.doctorName} on {appointment.date} at {appointment.time} for {appointment.reason}
                        <button onClick={() => handleUpdateAppointment(appointment.id)}>Update</button>
                        <button onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
