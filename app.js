const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const departmentRoutes = require('./routes/department')
const employeeRoutes = require('./routes/employee')

const app = express();
const PORT = process.env.PORT || 8000
const DB = "mongodb://localhost/employeeDB"

// DB Configration
mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB Connected Successfully!")
}).catch(() => {
    console.log("DB Connceting faild!")
})

// Middlewares 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Routes Middlewares
app.use(departmentRoutes);
app.use(employeeRoutes);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})

