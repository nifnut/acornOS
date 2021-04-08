

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
	$paulie.offsetX = 2;
	$paulie.offsetY = 0;

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






// ----- Navbar Icons ------

$(".niftydex.icon").on("click", function () { $(".niftydex.window").show() })
$(".netsurf.icon").on("click", function () { $(".netsurf.window").show() })
$(".paint.icon").on("click", function () { $(".paint.window").show() })


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

