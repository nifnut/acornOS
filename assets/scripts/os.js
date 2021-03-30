
// const OS = {
// 	name: "acornOS",
// 	files: {
// 		fart:{ filename: "fart.gif", x: 20, y: 30, window: "fart" }
// 	},
// 	windows: [
// 		{ header: "fart.gif", x: 70, y: 30, window: "fart" }
// 	]

// }

const initialState = {
	powerMode: "sleeping",

}


function OS(name, state = initialState) {
	this.name = name;
	this.powerMode = state.powerMode;
	// this.$files = {}
	// this.windows = [];
	// this.files = [];
	// this.icons = [];
	// this.root = document
	// this.status = initialStatus;
	// this.powerMode = "sleeping";



	return this;
}


const $OS = $("body");





// $(".window.ui").hide()

$(".window.ui.fart").hide()


$OS.powerOn = function () {
	$OS.removeClass("sleeping")
	$OS.addClass("powered-on")
}
$OS.hideAllWindows = function () {
	$(".ui.window").hide()
}


$(".sleeping.cursor").on("click", $OS.powerOn)



// =========== fart.gif ===============

$(".desktop.icon").draggable();


$(".desktop.fart.icon").on("dblclick", function () {
	$(".fart.window").show();
	// repeatFart = setInterval(function () { Sounds.fart.play() }, 960);
})
// $(".fart.window .close").on("click", function () { clearInterval(repeatFart) })


// 	let repeatFart;
// const $fart_gif = makeIcon("fart.gif", 10, 60);
// $fart_gif.on("dblclick", function () {
// 	$(".fart.window").show();
// 	repeatFart = setInterval(function () { Sounds.fart.play() }, 960);
// })
// $(".fart.window .close").on("click", function () { clearInterval(repeatFart) })
// $(".icon").draggable();



$("body").on('mousedown', ".desktop.icon", function (e) {
	$(this).addClass("selected")
});

$("body").on('mousedown', function (e) {
	if ($(e.target).hasClass('desktop icon')) {
		return
	}
	if (!$(e.target).hasClass('desktop icon')) {
		$('.desktop.icon').removeClass('selected')
	}
});



$("body").on('mousedown', ".system.icon", function (e) {
	$(this).addClass("pressing");
	if ($(this).hasClass("pressed")) {
		$(this).removeClass("pressed");
	} else {
		$(this).addClass("pressed");

		const props = { detail: $(this).text() }
		const event = new CustomEvent('pressedOn', props);
		document.body.dispatchEvent(event);
	}

});
$("body").on('mouseup', ".system.icon", function (e) {
	$(this).removeClass("pressing");

	if (!$(this).hasClass("pressed")) {

		const props = { detail: $(this).text() }
		const event = new CustomEvent('pressedOff', props);
		document.body.dispatchEvent(event);
	}
});


document.body.addEventListener('pressedOn', function (e) {
	console.log("show")
	$(".ui.window." + e.detail).show()
}, false);

document.body.addEventListener('pressedOff', function (e) {
	console.log("off")
	$(".ui.window." + e.detail).hide()
}, false);