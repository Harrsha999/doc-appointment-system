// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { appointments } = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/appointments', (req, res) => {
    const appointment = req.body;
    appointments.push(appointment);
    res.status(201).send('Appointment created');
});

app.get('/appointments', (req, res) => {
    res.json(appointments);
});

app.put('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const updatedAppointment = req.body;
    const index = appointments.findIndex(appt => appt.id === id);
    if (index !== -1) {
        appointments[index] = updatedAppointment;
        res.send('Appointment updated');
    } else {
        res.status(404).send('Appointment not found');
    }
});

app.delete('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const index = appointments.findIndex(appt => appt.id === id);
    if (index !== -1) {
        appointments.splice(index, 1);
        res.send('Appointment deleted');
    } else {
        res.status(404).send('Appointment not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
