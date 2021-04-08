

const mobileStory = [
	function () { },
	function () {

		// $(".snap.window img").show();
		// download complete
		setTimeout(function () {
			// nextBeat();
		}, 1000);
	},
	function () {
		$(".snap.window img:nth-child(1)").show();

		setTimeout(function () {
			nextBeat();
		}, 2000);
	},

	function () {
		$(".snap.window img").hide();
		$(".snap.window img:nth-child(2)").show();

		setTimeout(function () {
			nextBeat();
		}, 2000);
	},
	function () {
		$(".snap.window img").hide();
		$(".snap.window img:nth-child(3)").show();

		setTimeout(function () {
			// nextBeat();
		}, 2000);
	},
	// updater


];
const desktopStory = [
	function () { },

	function () {
		focusApp("niftydex");
		setTimeout(function () {
			nextBeat();
		}, 30000);
	},

	function () {
		$(".snap.icon").show();
		setTimeout(function () {
			nextBeat();
		}, 20000);
	},

	function () {

		$(".newgame.window").show({ easing: "easeOutBounce", effect: "scale", duration: 500 });
		$('.snap.icon').removeClass("unloaded")
		$('.snap.icon .spinner').hide();

		$('.snap.icon').on("click", function() {
			nextBeat();
		})

	},
	function () {
		var $img = $(".snap.window img:nth-child(1)");
		$img.show();
		$(".snap.window").show({ effect: "scale", duration: 500 });

		setTimeout(function () {
			nextBeat();
		}, 1000);
	},
	function() {
		$(".snap.window img:nth-child(1)").show();

		setTimeout(function () {
			nextBeat();
		}, 2000);
	},

	function () {
		$(".snap.window img").hide();
		$(".snap.window img:nth-child(2)").show();

		setTimeout(function () {
			nextBeat();
		}, 2000);
	},
	function () {
		$(".snap.window img").hide();
		$(".snap.window img:nth-child(3)").show();

		setTimeout(function () {
			// nextBeat();
		}, 2000);
	},

	function () {
		$(".updater.window img").show();
	},
	// updater
];


const storyBeats = mobileAndTabletCheck() ? mobileStory : desktopStory;



let i = 0;

function nextBeat() {
	i++;
	console.log("asdf");
	const playBeat = storyBeats[i];

	playBeat();
}

function startStory() {
	$("body").removeClass("loading");

	nextBeat();
}


// Initial State
$('.snap.icon').hide();
$('.app.window').hide();

$(function () {
	startStory();
});
