

const isDev = window.location.hostname === "127.0.0.1";

const storyBeats = [

	function () {
		$("#PoweredOff").show();
		$("#Desktop").hide();
		$("#PoweredOff button").on("click", function () {
			StoryManager.nextBeat()
		});
	},
	function () {
		$("#PoweredOff").hide();
		// $('.overlay').hide();
		$("#Desktop").show();
		$("#Paint").show();
		$("#Music").show();
		$("#Hyro").show();
		$("#PaulieIntro").show();
		$("#Dialog").text("i bet you can draw better than me. click me to take control")
		$("#Speechbubble").hide();

		$("#PaulieIntro").on("click", function () {
			$("body").addClass("paulie");
			StoryManager.nextBeat();
			UI.cursor.isPaulie = true;
		});
	},
	function successTogether() {
		UI.cursor.isTracking = true;
		$('.overlay').hide();
		$("#PaulieIntro").hide();
		$("#Paint").show();

		StoryManager.setDialog("success!", 4);

		setTimeout(function () {
			StoryManager.nextBeat()
		}, 12000)

	},
	function () {
		$("#Updater1").show();
		$(".updater1.overlay").show();


		setTimeout(function () {
			StoryManager.setDialog("ugh, i am so sick of the updater");
		}, 1000)


		$("#Updater1").on("click", function () {
			StoryManager.nextBeat();
			// StoryManager.clearDialog();
		});
	},
	function () {
		$("#Updater1").hide();
		$(".overlay").hide();
		$("#Hyro").show();
		$("#Kennel").show();

		setTimeout(function () {
			StoryManager.setDialog("oh no sparky got loose", 4);
		}, 1000)

		$("#Sparky").delay(0).animate({ right: "30%", bottom: "15%" }, 0)
		$("#Sparky").delay(0).slideDown(0)

		$("#Sparky")
			.delay(2000).animate({ right: "3%", bottom: "25%" }, 0)
			.delay(2000)
			.queue(function (next) { $(this).toggleClass("right left"); next(); })
			.animate({ right: "53%", bottom: "45%" }, 0)
			.delay(1000).fadeOut(0)

		$("#Poop1").delay(1000).slideDown(0);
		$("#Poop2").delay(4000).slideDown(0);

		let poops = 2;

		$(".poop.png").on("click", function () {
			$(this).hide();
			poops--;
			if (poops === 0) StoryManager.nextBeat();
		});

	},
	function () {
		$("#Hyro").show();
		StoryManager.setDialog("oh that, yeah im not sure what it is. i can tell its important though");

		setTimeout(function () {
			StoryManager.nextBeat()
		}, 2000);

	},
	function poopMania() {
		$("#Dialog").text("what the heck did my dog eat")

		$("#Poop3").delay(1000).slideDown(0);
		$("#Poop4").delay(2500).slideDown(0);
		$("#Poop5").delay(4000).slideDown(0);
		$("#Poop6").delay(5500).slideDown(0);
		$("#Poop7").delay(6000).slideDown(0);
		$("#Poop8").delay(8500).slideDown(0);
		$("#Poop9").delay(9000).slideDown(0);

		let poops = 0;

		const explanation = [
			"from what i researched, its egyptian geometry that helps you move through space and time",
			null,
			null,
			"oh man, what did my dog eat?!"
		]

		$(".poop.qr").on("click", function () {
			$(this).hide();
			$("#Kennel").css("zIndex", 1);


			const dialog = explanation[poops];
			if (dialog) StoryManager.setDialog(dialog)

			poops++;
			if (poops > 5) {
				$("#Quantumrectangle").show()
				// $("#Paint").hide()
			}
			if (poops > 6) StoryManager.nextBeat();
		});

	},

	function () {
		StoryManager.clearDialog();
		setTimeout(function () {
			// chill out and draw
			StoryManager.nextBeat();
		},10000)

	},
	function () {

		$("#Poop10").show();
		$("#Poop10").on("click", function () {
			$(this).hide();
			StoryManager.nextBeat();
		})

	},
	function () {
		$("#Readme").show();
		StoryManager.setDialog("a message from me?", 4)
		// var fn = function () { StoryManager.nextBeat() }
		// StoryManager.delay(function () { StoryManager.nextBeat() }, 10000)


		let start;

		document.addEventListener('mousemove', function () {
			start = undefined;
		});

		function step(timestamp) {

			if (start === undefined) {
				start = timestamp;
			}

			const elapsed = timestamp - start;

			if (elapsed < 2000) { // Stop the animation after 4 seconds
				window.requestAnimationFrame(step);
			} else {
				console.log("idle for too long, you takin a pic?!")
				StoryManager.nextBeat()
			}
		}

		window.requestAnimationFrame(step);

	},
	function () {
		$("#Updater2").delay(200).slideDown(500);
		// $(".updater2.overlay").show();

		setTimeout(function () {
			StoryManager.setDialog("oh no! the updater is back!", 5)
		}, 1000)

		$("#Updater2").on("click", function () {
			StoryManager.nextBeat();

		});

		timer = setTimeout(function () {
			StoryManager.nextBeat();
		}, 5000)

	},
	function () {
		StoryManager.setDialog("open your phone’s camera and entangle his Quantum bits!")
	}

];

let speechbubbleTimeout;
let timer;

const StoryManager = {
	speechbubbleTimeout: null,
	nextBeat: function () {
		clearTimeout(timer);
		this.currentIndex++;
		const play = storyBeats[this.currentIndex];
		play();
	},
	setDialog: function (text, duration) {

		clearTimeout(speechbubbleTimeout);

		$("#Dialog").text(text)
		$("#Speechbubble").text(text)
		$("#Speechbubble").show()

		if (!duration) return;

		speechbubbleTimeout = setTimeout(function () {
			$("#Speechbubble").hide();
		}, duration * 1000)


	},
	clearDialog: function () {
		clearTimeout(speechbubbleTimeout);

		$("#Dialog").text("")
		$("#Speechbubble").text("")
		$("#Speechbubble").hide()

	},
	delay: function (fn, t) {
		setTimeout(fn, t)
	},

	clean: function () {

		$("#PaulieIntro").hide();
		$("#Netsurf").hide();
		$("#Updater1").hide();
		$(".overlay").hide();
		$("#Sparky").hide();
		$("#Kennel").hide();
		$(".poop").hide();
		// $("#Hyro").hide();
		$("#PoopFiles").hide();
		$("#Readme").hide();
		$("#ReadMeWindow").hide();
		$("#Updater2").hide();
		$("#Quantumrectangle").hide()
		$("#Speechbubble").hide()
	},
	init: function (i = 0) {
		this.clean()
		this.currentIndex = i;
		const play = storyBeats[this.currentIndex];
		play();
		dev()
	}
}

function dev() {
	// $("body").addClass("paulie");

	// $("#Quantumrectangle").show();
	// $("#Musicplayer").hide();
	// $("#Hyro").show();
}


StoryManager.init();


