const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const express = require('express');
const activityModel = require('./models/ActivityModel');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect(dbConfig.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + dbConfig.database);
});
mongoose.connection.on('error', () => {
	console.log('Database error: ' + err);
});

// express

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const port = 3000;
const port = process.env.PORT || 8080; // heroku

app.get('/insertDummy', (req, res) => {
	let activityObj = new activityModel({
		name: 'A',
		weight: 6
	});
	activityModel.populate([activityObj], (callbackErr) => {
		if (callbackErr) {
			console.log(callbackErr);
		}
	});
});

app.get('/getActivities', (req, res) => {
	activityModel.getAll((activities) => {
		let resString = 'Results=';
		if (!activities || activities.length == 0) {
			resString += 'empty';
			return res.send(resString);
		}
		activities.forEach((activity) => {
			resString += activity.name + ':' + activity.weight + ';'
		});
		res.send(resString);
	});
});

app.post('/setActivities', (req, res) => {
	let activities = req.body;
	activities = activities.map((activity) => {
		return new activityModel({
			name: activity.name,
			weight: parseInt(activity.weight)
		});
	});
	activityModel.populate(activities, (err) => {
		if (err) {
			res.send(err);
		} else {
			res.send('Success');
		}
	});
});

app.listen(port, () => {
	console.log('Server started on port ' + port);
});