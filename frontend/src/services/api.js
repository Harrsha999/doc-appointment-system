import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createAppointment = (appointment) => api.post('/appointments', appointment);
export const getAppointments = () => api.get('/appointments');
export const updateAppointment = (id, appointment) => api.put(`/appointments/${id}`, appointment);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
