const mongoose = require('mongoose');
const dbConfig = require('./config/database');

mongoose.connect(dbConfig.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + dbConfig.database);
});
mongoose.connection.on('error', () => {
	console.log('Database error: ' + err);
});

const ActivitySchema = mongoose.Schema({
	name: {
		type: String
	},
	weight: {
		type: Number
	}
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

ActivityModel.find((err, activities) => {
	if (err) {
		return console.log(err);
	}
	if (!activities) {
		return console.log('Empty result');
	}
	activities.forEach((activity) => {
		console.log(activity);
	});
});