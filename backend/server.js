// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
//////////////////
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { appointments } = require('./db');

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.post('/appointments', (req, res) => {
//     const appointment = req.body;
//     appointments.push(appointment);
//     res.status(201).send('Appointment created');
// });

// app.get('/appointments', (req, res) => {
//     res.json(appointments);
// });

// app.put('/appointments/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedAppointment = req.body;
//     const index = appointments.findIndex(appt => appt.id === id);
//     if (index !== -1) {
//         appointments[index] = updatedAppointment;
//         res.send('Appointment updated');
//     } else {
//         res.status(404).send('Appointment not found');
//     }
// });

// app.delete('/appointments/:id', (req, res) => {
//     const { id } = req.params;
//     const index = appointments.findIndex(appt => appt.id === id);
//     if (index !== -1) {
//         appointments.splice(index, 1);
//         res.send('Appointment deleted');
//     } else {
//         res.status(404).send('Appointment not found');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Appointment = require('./models/appointment');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/appointments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/appointments', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send('Appointment created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        res.send('Appointment updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.delete('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        res.send('Appointment deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
