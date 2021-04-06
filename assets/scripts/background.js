

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

function randomRange(min, max)
{
	return min + Math.random() * (max - min);
}
function randomInt(min, max)
{
	var diff = max - min;
	var rand = Math.random() * diff;

	rand += min;

	return Math.floor(rand);
}

function setCookie(name, value, days)
{
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name)
{
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function createSound(filename, callback = function () { })
{

	var src = "/assets/sounds/" + filename;

	var sound = document.createElement('audio');
	sound.controls = 'controls';
	sound.src = src;
	sound.style.display = "none";
	sound.type = 'audio/mpeg';
	sound.preload = "auto"
	document.body.appendChild(sound);


	sound.addEventListener('loadeddata', function ()
	{

		if (sound.readyState >= 2) {
			// sound.play();
		}

		callback()
	});
	return sound;

}

function getOS()
{
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}

function isOSValid()
{
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;


	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
		return true
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
		return false;
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
		return true;
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
		return false
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
		return true;
	}

	return os;
}


const SCREEN_WIDTH = document.body.clientWidth;
const SCREEN_HEIGHT = document.body.clientHeight;
const COMPUTED_SCALE = invlerp(900, 2000, document.body.clientWidth);
const ASPECT_RATIO = 1.410256;
const WIDTH_MIN = 40; // SCALE = 0
const WIDTH_MAX = 70; // SCALE = 1
const HEIGHT = 200;
const WIDTH = 126;

// =======================================
//			Initialize Paulie
// =======================================



const Sounds = {
	down: document.getElementById("ClickDownSound"),
	up: document.getElementById("ClickUpSound"),
	fart: document.getElementById("FartSound"),
	tada: document.getElementById("TadaSound"),
	power: document.getElementById("PowerSound"),
};

Sounds.down.load();
Sounds.up.load();
Sounds.tada.load();
Sounds.power.load();

/// ==========================

const $OS = $("body");

let $paulie = $("#Paulie");

function loadPaulie() {
	$paulie.width(WIDTH).height(HEIGHT);
	$paulie.isClicking = false;
	$paulie.allowRightClicking = false;

	$paulie.offsetX = SCREEN_WIDTH / 2 - WIDTH / 2;
	$paulie.offsetY = SCREEN_HEIGHT / 2 - HEIGHT / 2;
	$paulie.x = 0;
	$paulie.y = 0;

	$paulie.update = function () {
		const { x, y, offsetX, offsetY } = $paulie;
		$(this).css("transform", `translate(${x}px, ${y}px)`);

		$paulie.css("left", offsetX);
		$paulie.css("top", offsetY);
	};
	$paulie.jump = function () {
		$paulie.addClass("jump");

		// delay( 500 ).removeClass("jump");
	};
	const recordMousePosition = (e) => {
		$paulie.x = e.pageX;
		$paulie.y = e.pageY;
	};
	$paulie.followUser = function () {
		$paulie.offsetX = 2;
		$paulie.offsetY = 0;

		$(document).on("mousemove", () => $paulie.update());
	};

	// ---- Wake Up!! -----

	$paulie.wakeUp = function () {
		$paulie.jump();
		$paulie.addClass("awake");
		$paulie.removeClass("sleeping");

		$paulie.addClass("transitioning");

		$paulie.offsetX = 0;
		$paulie.offsetY = -2;
		$paulie.update();

		setTimeout(function () {
			$paulie.removeClass("transitioning");
			$OS.playSound("tada");
			$OS.powerOn();
			$paulie.followUser();
		}, 440);
	};

	$paulie.update();

	$(document).on("mousemove", recordMousePosition);

	$("body").on("mousedown", ".sleeping.paulie", function (e) {
		$paulie.wakeUp();
	});

	const mouseUp = (e) => {
		if (e.which !== 1) return; // only handle left click
		$OS.playSound("up");
		$paulie.isClicking = false;
		$paulie.removeClass("clicking");
	};
	const mouseDown = (e) => {
		if (e.which !== 1) return; // only handle left click
		$OS.playSound("down");
		$paulie.isClicking = true;
		$paulie.addClass("clicking");
	};

	const element = document.getElementById("some-element-you-want-to-animate");
	let start;

	function step(timestamp) {
		if (start === undefined) start = timestamp;
		const elapsed = timestamp - start;

		// `Math.min()` is used here to make sure that the element stops at exactly 200px.
		element.style.transform =
			"translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

		if (elapsed < 2000) {
			// Stop the animation after 2 seconds
			window.requestAnimationFrame(step);
		}
	}

	// window.requestAnimationFrame(step);

	let netStack = [];

	$("body").on("click", ".ui.window.netsurf .scroll-content a", function (e) {
		e.preventDefault(e);
		var destination = $(this).attr("href");
		console.log(destination);
		netStack.push(destination);
		// $("#NetSurf button").attr('disabled', false);
		var $content = $(".netsurf .scroll-content");
		$.get(destination, (data) => $content.html(data));
	});

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

	$(".niftydex.icon").on("click", function () {
		$(".niftydex.window").show();
	});
	$(".netsurf.icon").on("click", function () {
		$(".netsurf.window").show();
	});
	$(".paint.icon").on("click", function () {
		$(".paint.window").show();
	});

	$(document).on("mousedown", mouseDown);
	$(document).on("mouseup", mouseUp);

	$(".scroll-bar").on("mousedown", function (e) {
		if (e.which === 1) mouseDown(e);
	});
	$("img").on("dragstart", function () {
		return false;
	}); // no drag
	$("a").on("dragstart", function () {
		return false;
	}); // no drag
	// $("#Desktop").on('mousedown', handleIconHighlight);

	// Other Clicking Types
	$(document).on("contextmenu", (e) => {
		if (!$paulie.allowRightClicking) return;
		e.preventDefault();
		return false;
	}); // no right clicking
}

function loadOS() {
	$(".window.ui.fart").hide();

	$OS.powerOn = function () {
		$OS.removeClass("sleeping");
		$OS.addClass("awake");
	};
	$OS.playSound = function (noise, volume = 0.2) {
		Sounds[noise].volume = volume;
		Sounds[noise].play();
	};

	// =========== fart.gif ===============

	$(".desktop.icon").draggable();

	let fartsUntilBootUp = ["niftydex", "netsurf", "paint", "power"];

	$(".desktop.fart.icon").on("dblclick", function () {
		// Play gif
		$(".fart.window").show();

		if (fartsUntilBootUp.length === 0) return;

		setTimeout(function () {
			Sounds.fart.play();
			var icon = fartsUntilBootUp.pop();
			$(".system.icon." + icon).slideDown();
		}, 900);

		setTimeout(function () {
			Sounds.fart.play();
			var icon = fartsUntilBootUp.pop();
			$(".system.icon." + icon).slideDown();
		}, 3000);

		setTimeout(function () {
			Sounds.fart.play();
			var icon = fartsUntilBootUp.pop();
			$(".system.icon." + icon).slideDown();
		}, 5000);

		setTimeout(function () {
			Sounds.fart.play();
			var icon = fartsUntilBootUp.pop();
			$(".system.icon." + icon).slideDown();
		}, 7000);
	});

	$(".fart.icon").css("left", "70%").css("top", "20%");
	$(".fart.window").css("left", "10%").css("bottom", "30%");

	$("body").on("mousedown", ".desktop.icon", function (e) {
		$(this).addClass("selected");
	});

	$("body").on("mousedown", function (e) {
		if ($(e.target).hasClass("desktop icon")) {
			return;
		}
		if (!$(e.target).hasClass("desktop icon")) {
			$(".desktop.icon").removeClass("selected");
		}
	});

	//  ====== System Icons =======

	$(".system.icon").hide(); // by default

	$(function () {
		$(".system.icon.power").on("click", function () {
			console.log("p[lay");
			$OS.playSound("power");
		}); // by default
	});

	document.body.addEventListener(
		"pressedOn",
		function (e) {
			$(".ui.window." + e.detail).show();
		},
		false
	);

	document.body.addEventListener(
		"pressedOff",
		function (e) {
			$(".ui.window." + e.detail).hide();
		},
		false
	);

	$(function () {
		$(".ui.window.error .close").on("click", function () {
			$(".acornoverlay").addClass("full");
			// localStorage.setItem("offline", true)
		});

		const previouslyOffline = localStorage.getItem("offline");

		if (previouslyOffline) {
			$(".acornoverlay").addClass("full");
		}
	});

	let currentZ = 13;

	{
		$(".ui.window").draggable({
			handle: ".header",
			containment: "body",
			cursor: "none",
		});
		$(".ui.window .scrollbar-inner").scrollbar();

		$(".ui.window .close").on("click", function () {
			$(this).parent().parent().hide();
		});
		$(".ui.header").on("mousedown", function () {
			$(this)
				.parent()
				.css("zIndex", currentZ++);
		});
	}

	// const $paintWindow = $("#Paint");

	// $.get("/paint", function (data) {
	// 	$("#Paint .content").prepend(data)
	// }).fail(function (err) {
	// 	console.log(err.statusText)
	// })
}





const storyBeats = [
	{
		mode: "leave me empty"
	},
	{
		mode: "sleeping",
		paulie: "sleeping",
		onStart: function () {
			$(".ui.window").hide()
			$(".system.icon").hide()
			$paulie.addClass("sleeping");
			$OS.addClass("sleeping");
		}
	},
	{
		mode: "awake",
		paulie: "goofing",
		onStart: function () {
			$(".ui.window").hide()
			$paulie.removeClass("sleeping")
			$paulie.addClass("goofing awake")
			$paulie.followUser()
			$OS.addClass("awake")
		}
	},
	{
		paulie: "learning",
		mode: "awake",
		onStart: function () {
			$(".ui.window").hide()
			$paulie.removeClass("sleeping")
			$paulie.addClass("goofing awake")
			$paulie.followUser()
			$OS.addClass("awake")
		}
	},
	{
		mode: "defending",
	},
	{
		mode: "fighting",
	},
];

const StoryManager = {
	currentIndex: 0,
	nextBeat: function () {
		this.currentIndex++;
		let beat = storyBeats[this.currentIndex]
		beat.onStart()
	}
}


function main() {

	StoryManager.nextBeat()
}

