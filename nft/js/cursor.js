const PAULIE_HEIGHT = 95;
const PAULIE_WIDTH = 60;

const $body = $("<img>").attr("src", "/nft/paulie/body-smirk.svg").addClass("body");
const $shadow = $("<img>").attr("src", "/nft/paulie/shadow.svg").addClass("shadow");

let $paulie = $("<div>");

$paulie.attr("id", "Paulie");
$paulie.addClass("cursor");
$paulie.append($shadow);
$paulie.append($body);
$paulie.width(PAULIE_WIDTH);
$paulie.height(PAULIE_HEIGHT);

let offsetX = "2px";
let offsetY = "0px";

$paulie.playSound = function (noise, volume = 0.2) {
	Sounds[noise].volume = volume;
	Sounds[noise].play();
};

function mouseUp(e) {
	if (e.which !== 1) return;
	$paulie.isClicking = false;
	$paulie.removeClass("clicking");
};
function mouseDown(e) {
	if (e.which !== 1) return;
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

$(document).on('mousemove', recordCursorPosition);
$(document).on('mousedown', mouseDown);
$(document).on('mouseup', mouseUp);
$(document).on('mousemove', updatePauliePosition);

$(function () {
	$("body").prepend($paulie);
	$("body").addClass("alive");
});