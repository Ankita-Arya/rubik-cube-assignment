var arrayOfGridContainers = document.getElementsByClassName('grid-container');
var numberOfColumns = 3;

function init() {
	var gridColumns = '';
	for (var k = 0; k < numberOfColumns; k++) {
		gridColumns += ' auto';
	}
	var html = '<div class="grid-item"></div>';
	var addElements = '';
	for (var j = 0; j < numberOfColumns * numberOfColumns; j++) {
		addElements += html;
	}
	for (var i = 0; i < arrayOfGridContainers.length; i++) {
		arrayOfGridContainers[i].innerHTML = addElements;
		arrayOfGridContainers[i].style['grid-template-columns'] = gridColumns;
	}
}
init();

function incrementColumns() {
	if (numberOfColumns === 6)
		return;
	numberOfColumns++;
	init();
}
function decrementColumns() {
	if (numberOfColumns === 3)
		return;
	numberOfColumns--;
	init();
}

var cubex = 0,
	cubey = 0,
	cubez = 0;

function rotCube(degx, degy, degz) {
	segs = "rotateX(" + degx + "deg) rotateY(" + degy + "deg) rotateZ(" + degz + "deg)";
	document.getElementById('cubeDiv').style.transform = segs;
}


function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last,
		deferTimer;
	return function () {
		var context = scope || this;

		var now = +new Date,
			args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', throttle(function (event) {
		cubex = event.beta + 180;
		cubey = event.gamma + 180;
		cubez = event.alpha + 180;
		rotCube(cubex, cubey, cubez);
	}), 500);
}
