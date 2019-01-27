const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
	name: {
		type: String
	},
	weight: {
		type: Number
	}
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

// callback: (err, activities)
ActivityModel.getAll = function(getAllCallback) {
	ActivityModel.find((err, activities) => {
		if (err) {
			return console.log(err);
		}
		getAllCallback(activities);
	});
};

// callback: (err)
ActivityModel.populate = function (activities, callback) {
	ActivityModel.deleteMany({}).exec();
	var callbackErr;
	activities.forEach((activity) => {
		activity.save((err, savedActivity) => {
			if (err) {
				callbackErr = err;
			}
		});
	});
	callback(callbackErr);
};

module.exports = ActivityModel;
