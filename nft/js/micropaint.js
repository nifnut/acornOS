
// ========= Cursor Drawing ===================

var canvas = document.getElementById("MicropaintCanvas");
var ctx = canvas.getContext('2d');


let prevX = 0;
let prevY = 0;
let makeLine = false;

let color = "black";
let size = 6;

var ongoingTouches = [];


canvas.width = canvas.parentNode.clientWidth - 50;
canvas.height = canvas.parentNode.clientHeight - 50;
// var ctx = canvas.getContext("2d");


let strokeWidth = 15;



function drawLine(x, y) {
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(x, y);
	ctx.strokeStyle = color;
	ctx.lineWidth = 6;
	ctx.stroke();
	ctx.closePath();
}

function drawPoint(x, y) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = size;
	ctx.lineCap = "round";
	ctx.moveTo(x, y);
	ctx.lineTo(x, y);
	ctx.stroke();
}
canvas.addEventListener("mousedown", (e) => {
	prevX = e.offsetX;
	prevY = e.offsetY;
	makeLine = true;
	drawPoint(e.offsetX, e.offsetY);
});


canvas.addEventListener("mouseup", (e) => {
	makeLine = false;
});

document.body.addEventListener("mouseup", (e) => {
	makeLine = false;
});



canvas.addEventListener("mousemove", (e) => {
	if (makeLine) {
		// $("#out").text("drawing")
		drawLine(e.offsetX, e.offsetY);
		prevX = e.offsetX;
		prevY = e.offsetY;
	} else {
		$("#out").text("");
	}
});


function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}


function handleStart(evt) {

	evt.preventDefault();

	var { top, left } = offset(canvas);
	var touches = evt.changedTouches;

	for (var i = 0; i < touches.length; i++) {

		ongoingTouches.push(copyTouch(touches[i]));


		ctx.beginPath();
		ctx.arc(touches[i].pageX - left, touches[i].pageY - top, (strokeWidth / 2), 0, 2 * Math.PI, false);
		ctx.fillStyle = color;
		ctx.fill();

	}
}
function handleMove(evt) {
	evt.preventDefault();

	var touches = evt.changedTouches;

	for (var i = 0; i < touches.length; i++) {

		var idx = ongoingTouchIndexById(touches[i].identifier);

		var { top, left } = offset(canvas);

		if (idx >= 0) {




			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX - left, ongoingTouches[idx].pageY - top);
			ctx.lineTo(touches[i].pageX - left, touches[i].pageY - top);

			ctx.lineJoin = "round";
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = color;
			ctx.closePath();
			ctx.stroke();

			ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record

		} else {
			console.log("can't figure out which touch to continue");
		}
	}
}
function handleEnd(evt) {
	evt.preventDefault();

	var touches = evt.changedTouches;

	var { top, left } = offset(canvas);

	for (var i = 0; i < touches.length; i++) {
		// var color = colorForTouch(touches[i]);
		var idx = ongoingTouchIndexById(touches[i].identifier);

		if (idx >= 0) {
			ctx.lineWidth = 5;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(ongoingTouches[idx].pageX - left, ongoingTouches[idx].pageY - top);
			ctx.lineTo(touches[i].pageX - left, touches[i].pageY - top);
			ctx.arc(touches[i].pageX, touches[i].pageY, (strokeWidth / 2), 0, 2 * Math.PI, false);
			ongoingTouches.splice(idx, 1);  // remove it; we're done
		} else {
			console.log("can't figure out which touch to end");
		}
	}
}
function handleCancel(evt) {
	evt.preventDefault();

	var touches = evt.changedTouches;

	for (var i = 0; i < touches.length; i++) {
		var idx = ongoingTouchIndexById(touches[i].identifier);
		ongoingTouches.splice(idx, 1);  // remove it; we're done
	}
}
function copyTouch({ identifier, pageX, pageY }) {
	return { identifier, pageX, pageY };
}
function ongoingTouchIndexById(idToFind) {
	for (var i = 0; i < ongoingTouches.length; i++) {
		var id = ongoingTouches[i].identifier;

		if (id == idToFind) {
			return i;
		}
	}
	return -1;    // not found
}


$('.swatches div').on("click", function() {
	color = $(this).attr("class");
	console.log(color)
})


function startup() {
	canvas.addEventListener("touchstart", handleStart, false);
	canvas.addEventListener("touchend", handleEnd, false);
	canvas.addEventListener("touchcancel", handleCancel, false);
	canvas.addEventListener("touchmove", handleMove, false);
}

document.addEventListener("DOMContentLoaded", startup);

