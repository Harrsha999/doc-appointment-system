// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000',
// });

// export const createAppointment = (appointment) => api.post('/appointments', appointment);
// export const getAppointments = () => api.get('/appointments');
// export const updateAppointment = (id, appointment) => api.put(`/appointments/${id}`, appointment);
// export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createAppointment = async (appointment) => {
    try {
        return await api.post('/appointments', appointment);
    } catch (error) {
        throw error.response.data || 'Error creating appointment';
    }
};

export const getAppointments = async () => {
    try {
        return await api.get('/appointments');
    } catch (error) {
        throw error.response.data || 'Error fetching appointments';
    }
};

export const updateAppointment = async (id, appointment) => {
    try {
        return await api.put(`/appointments/${id}`, appointment);
    } catch (error) {
        throw error.response.data || 'Error updating appointment';
    }
};

export const deleteAppointment = async (id) => {
    try {
        return await api.delete(`/appointments/${id}`);
    } catch (error) {
        throw error.response.data || 'Error deleting appointment';
    }
};
