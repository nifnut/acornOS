const SCREEN_WIDTH = document.body.clientWidth;
const SCREEN_HEIGHT = document.body.clientHeight;
const COMPUTED_SCALE = invlerp(900, 2000, document.body.clientWidth);
const ASPECT_RATIO = 1.410256
const WIDTH_MIN = 40; // SCALE = 0
const WIDTH_MAX = 70; // SCALE = 1
const HEIGHT = 200;
const WIDTH = 126;


// =======================================
//			Initialize Paulie
// =======================================

let $paulie = $("#Paulie");

$paulie.width(WIDTH).height(HEIGHT)
$paulie.isClicking = false;
$paulie.allowRightClicking = false

$paulie.offsetX = SCREEN_WIDTH / 2 - WIDTH / 2
$paulie.offsetY = SCREEN_HEIGHT / 2 - HEIGHT / 2
$paulie.x = 0
$paulie.y = 0

$paulie.update = function () {
	const { x, y, offsetX, offsetY } = $paulie;
	$(this).css("transform", `translate(${x}px, ${y}px)`);

	$paulie.css("left", offsetX)
	$paulie.css("top", offsetY)
}
$paulie.jump = function () {

	$paulie.addClass("jump");

	// delay( 500 ).removeClass("jump");
}
const recordMousePosition = (e) => {
	$paulie.x = e.pageX;
	$paulie.y = e.pageY;
};
$paulie.followUser = function () {
	$paulie.offsetX = 0;
	$paulie.offsetY = -2;

	$(document).on('mousemove', () => $paulie.update());
}


// ---- Wake Up!! -----

$paulie.wakeUp = function () {
	
	$paulie.jump()
	$paulie.addClass("awake");
	$paulie.removeClass("sleeping")

	$paulie.addClass("transitioning")
	
	$paulie.offsetX = 0;
	$paulie.offsetY = -2;
	$paulie.update();


	// $paulie.removeClass("transitioning")


	// setTimeout(function () {
	// 	$paulie.offsetX = 0;
	// 	$paulie.offsetY = -2;
	// 	$paulie.update();
	// 	$OS.powerOn();
	// }, 100)

	setTimeout(function () {
		$paulie.removeClass("transitioning")
		$OS.playSound("tada")
		$OS.powerOn();
		$paulie.followUser()
	}, 440)
}

$paulie.update()

$(document).on('mousemove', recordMousePosition);


$("body").on('mousedown', ".sleeping.paulie", function (e) {
	$paulie.wakeUp()
});



const mouseUp = e => {
	if (e.which !== 1) return; // only handle left click
	$OS.playSound("up")
	$paulie.isClicking = false;
	$paulie.removeClass("clicking");
};
const mouseDown = e => {
	if (e.which !== 1) return; // only handle left click
	$OS.playSound("down")
	$paulie.isClicking = true;
	$paulie.addClass("clicking")
};




const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
	if (start === undefined)
		start = timestamp;
	const elapsed = timestamp - start;

	// `Math.min()` is used here to make sure that the element stops at exactly 200px.
	element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

	if (elapsed < 2000) { // Stop the animation after 2 seconds
		window.requestAnimationFrame(step);
	}
}

// window.requestAnimationFrame(step);



let netStack = [];

// $('body').on('click', '.ui.window.netsurf .content a', function (e) {

// 	e.preventDefault(e);
// 	var destination = $(this).attr('href');
// 	console.log(destination)
// 	netStack.push(destination);
// 	// $("#NetSurf button").attr('disabled', false);
// 	var $content = $(".netsurf .content");
// 	$.get(destination, (data) => $content.html(data));
// });

// $('.netsurf button').on('click', function (e) {
// 	e.preventDefault(e);
// 	var destination = netStack.shift();
// 	console.log(destination)
// 	var $content = $("#NetSurf .content");
// 	$.get(destination, (data) => {
// 		console.log(data)
// 		$content.html(data)
// 		// $content.html("<h1>gart</h1>")
// 	});
// });

// ----- Navbar Icons ------

$(".niftydex.icon").on("click", function () { $(".niftydex.window").show() })
$(".netsurf.icon").on("click", function () { $(".netsurf.window").show() })
$(".paint.icon").on("click", function () { $(".paint.window").show() })

$(document).on('mousedown', mouseDown)
$(document).on('mouseup', mouseUp)


$('.scroll-bar').on('mousedown', function (e) { if (e.which === 1) mouseDown(e); })
$('img').on('dragstart', function () { return false; }); // no drag
$('a').on('dragstart', function () { return false; }) // no drag
// $("#Desktop").on('mousedown', handleIconHighlight);


// Other Clicking Types
$(document).on('contextmenu', (e) => {
	if (!$paulie.allowRightClicking) return
	e.preventDefault()
	return false
}); // no right clicking

