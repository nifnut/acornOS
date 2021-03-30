const COMPUTED_SCALE = invlerp(900, 2000, document.body.clientWidth);
const ASPECT_RATIO = 1.410256
const WIDTH_MIN = 40; // SCALE = 0
const WIDTH_MAX = 70; // SCALE = 1
// const WIDTH = lerp(WIDTH_MIN, WIDTH_MAX, COMPUTED_SCALE)
// const HEIGHT = WIDTH * ASPECT_RATIO;

const HEIGHT = 200;
const WIDTH = 126;
// const SHADOW = "/assets/paulie/shadow.svg";

const Sounds = {
	down: document.getElementById("ClickDownSound"),
	up: document.getElementById("ClickUpSound"),
	fart: document.getElementById("FartSound"),
}

Sounds.down.load();
Sounds.up.load();

// ============================================ 
//					Paulie
// ============================================

let $paulie = $("#Paulie");

$paulie.width(WIDTH).height(HEIGHT)
$paulie.isClicking = false;
// $paulie.append($("<img>").addClass("body").attr("src", BODY));
// $paulie.append($("<img>").addClass("shadow").attr("src", SHADOW));


// $paulie.playSound = function (noise, volume = 0.2) {
// 	Sounds[noise].volume = volume;
// 	Sounds[noise].play()
// }
$paulie.setTranslate = function (x, y) {
	$(this).css("transform", `translate(${x}px, ${y}px)`)
}

const mousemove = (e) => {
	console.log("asdf")
	$paulie.setTranslate(e.pageX, e.pageY)
};

$(document).on('mousemove', mousemove);



const mouseUp = e => {
	// if (e.which !== 1) return; // only handle left click
	// $paulie.playSound("up")
	// $paulie.isClicking = false;
	// $paulie.removeClass("clicking");
};
const mouseDown = e => {
	// if (e.which !== 1) return
	// $paulie.playSound("down")
	// $paulie.isClicking = true;
	// $paulie.addClass("clicking")
};
const stopEvent = e => {
	e.preventDefault()
	return false
};


// ----- Navbar Icons ------

$(".niftydex.icon").on("click", function () { $(".niftydex.window").show() })
$(".netsurf.icon").on("click", function () { $(".netsurf.window").show() })
$(".paint.icon").on("click", function () { $(".paint.window").show() })

$(document).on('mousedown', mouseDown)
$(document).on('mouseup', mouseUp)

$(document).on('contextmenu', stopEvent); // no right clicking
$('.scroll-bar').on('mousedown', function (e) { if (e.which === 1) mouseDown(e); })
$('img').on('dragstart', function () { return false; }); // no drag
$('a').on('dragstart', function () { return false; }) // no drag
// $("#Desktop").on('mousedown', handleIconHighlight);






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

