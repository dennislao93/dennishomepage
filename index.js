let tableElem;
let nextNum;
// let locationHost = location.host + ':3000';
let locationHost = "https://dennishomepage.herokuapp.com";

$(document).ready(function() {
	tableElem = $('#myTable');
	loadData();
});

function loadData() {
	tableElem.empty();
	nextNum = 0;
	$.ajax({
		url: locationHost + '/getActivities',
		success: (data) => {
			let dataContents = data.substring(8);
			if (dataContents == 'empty') {
				console.log('Empty results');
			}
			// activity.name:activity.weight;
			let  rows = dataContents.substring(0, dataContents.length - 1).split(';');
			rows.forEach((row, index) => {
				let rowElems = row.split(':');
				tableElem.append(
					'<tr id="entry' + index + '">'
						+ '<td><input class="nameInput" type="text" value="' + rowElems[0] + '"></td>'
						+ '<td><input class="weightInput" type="text" value="' + rowElems[1] + '"></td>'
						+ '<td><input type="button" value="Delete" onclick="deleteEntry(' + index + ')"></td>'
					+ '</tr>'
				);
				nextNum = index + 1;
			});
		}
	});
}

function deleteEntry(index) {
	$('#entry' + index).remove();
}

function addEntry() {
	let newNameInput = $('#newName')[0];
	let newWeightInput = $('#newWeight')[0];
	tableElem.append(
		'<tr id="entry' + nextNum + '">'
			+ '<td><input class="nameInput" type="text" value="' + newNameInput.value + '"></td>'
			+ '<td><input class="weightInput" type="text" value="' + newWeightInput.value + '"></td>'
			+ '<td><input type="button" value="Delete" onclick="deleteEntry(' + nextNum + ')"></td>'
		+ '</tr>'
	);
	nextNum++;
	newNameInput.value = '[Name]';
	newWeightInput.value = '[Weight]';
	return false;
}

function saveData() {
	let activities = [];
	tableElem.find('tr').each((index, elem) => {
		activities.push({
			name: $(elem).find('.nameInput')[0].value,
			weight: $(elem).find('.weightInput')[0].value
		});
	});
	$.ajax({
		method: 'POST',
		url: locationHost + '/setActivities',
		data: JSON.stringify(activities),
		contentType: 'application/json; charset=utf-8',
		success: (msg) => {
			alert(msg);
		}
	});
}

function whatToDo() {
	let doThing;
	let doThingsMap = {};
	let sum = 0;
	tableElem.find('tr').each((index, elem) => {
		let thisWeight = parseInt($(elem).find('.weightInput')[0].value);
		doThingsMap[$(elem).find('.nameInput')[0].value] = thisWeight;
		sum += thisWeight;
	});
	let rngNum = Math.random() * sum;
	sum = 0;
	for (activityKey in doThingsMap) {
		sum += doThingsMap[activityKey];
		if (rngNum < sum) {
			doThing = activityKey;
			break;
		}
	}
	$('#doThing').html(doThing);
}