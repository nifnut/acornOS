// const SCREEN_WIDTH = document.body.clientWidth;
// const SCREEN_HEIGHT = document.body.clientHeight;
// const COMPUTED_SCALE = invlerp(900, 2000, document.body.clientWidth);
// const ASPECT_RATIO = 1.410256
// const WIDTH_MIN = 40; // SCALE = 0
// const WIDTH_MAX = 70; // SCALE = 1

const PAULIE_HEIGHT = 190;
const PAULIE_WIDTH = 120;

let cursorX = null;
let cursorY = null;



// const $body = $("<img>").attr("src", "/nft/paulie/body.svg").addClass("body");
const $body = $("<img>").attr("src", "/nft/paulie/body-smirk.svg").addClass("body");
const $shadow = $("<img>").attr("src", "/nft/paulie/shadow.svg").addClass("shadow");
// const $face = $("<img>").attr("src", "/nft/paulie/face-smirk.png").addClass("face");


// ==============================================================================


let $paulie = $("<div>");


// ==============================================================================


$paulie.attr("id", "Paulie");
$paulie.addClass("cursor");

// $paulie.addClass("floating");
// $paulie.addClass("wandering");

$paulie.append($shadow);
$paulie.append($body);

$paulie.width(PAULIE_WIDTH);
$paulie.height(PAULIE_HEIGHT);

let offsetX = "2px";
let offsetY = "0px";

// $paulie.offsetX = SCREEN_WIDTH / 2 - WIDTH / 2
// $paulie.offsetY = SCREEN_HEIGHT / 2 - HEIGHT / 2



// ==============================================================================



$paulie.playSound = function (noise, volume = 0.2) {
	Sounds[noise].volume = volume;
	Sounds[noise].play();
};


// ==============================================================================


function mouseUp(e) {
	if (e.which !== 1) return;
	$paulie.playSound("ClickUp");
	$paulie.isClicking = false;
	$paulie.removeClass("clicking");
};
function mouseDown(e) {
	if (e.which !== 1) return;
	$paulie.playSound("ClickDown");
	$paulie.isClicking = true;
	$paulie.addClass("clicking");
};
function updatePauliePosition() {
	$paulie.removeClass("wandering");
	$paulie.css({
		left: offsetX,
		top: offsetY,
		transform: `translate(${cursorX}, ${cursorY})`
	});
}
function recordCursorPosition(e) {
	cursorX = e.pageX + "px";
	cursorY = e.pageY + "px";
};
function onVisibilityChange() {
	console.log("window hidden changed");
}
// ==============================================================================


$(document).on('mousemove', recordCursorPosition);
$(document).on('mousedown', mouseDown);
$(document).on('mouseup', mouseUp);
$(document).on('mousemove', updatePauliePosition);

document.addEventListener("visibilitychange", onVisibilityChange, false);

// document.body.addEventListener("mouseleave")
// window.addEventListener("mouseout")

document.addEventListener("mouseleave", function (event) {

	if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {

		console.log("I'm out");
		$paulie.addClass("wandering");
	}
});

//   event.clientY <= 0  is when the mouse leave from the top
// event.clientX <= 0  is when the mouse leave from the left
// event.clientX >= window.innerWidth is when the mouse leave from the right
// event.clientY >= window.innerHeight is when the mouse leave from the bottom

// ==============================================================================


$(function () {


	$("body").prepend($paulie);

	$("body").addClass("alive");

});