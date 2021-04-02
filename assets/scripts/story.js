

const isDev = window.location.hostname === "127.0.0.1";

const settings = {
	currentIndex: isDev ? 0 : 0,
	pacing: isDev ? 1 : 1,
}


const storyBeats = [
	{
		mode: ""
	},
	{
		name: "powered off",
		onStart: function () {
			$("#PoweredOff").show();
			$("#Desktop").hide();
			$("#PoweredOff button").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		name: "playing around part 1",
		onStart: function () {
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
		}
	},
	{
		name: "playing around part 2",
		onStart: function () {
			UI.cursor.isTracking = true;
			$("body").addClass("paulie");
			$('.overlay').hide();
			$("#PaulieIntro").hide();

			StoryManager.setDialog("success!", 5);

			setTimeout(function () {
				StoryManager.nextBeat()
			}, 11000 * StoryManager.pacing)
		}
	},
	{
		name: "updater threat level 0%",
		onStart: function () {
			$("#Updater1").show();
			$(".updater1.overlay").show();


			setTimeout(function () {
				StoryManager.setDialog("ugh, i am so sick of the updater");
			}, 1000)


			$("#Updater1").on("click", function () {
				StoryManager.nextBeat();
				// StoryManager.clearDialog();
			});
		}
	},
	{
		name: "sparky is loose",
		onStart: function () {
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

		}
	},
	{
		name: "paulie explains part 1",
		onStart: function () {


			$("#Hyro").show();

			StoryManager.setDialog("oh that, yeah im not sure what it is. i can tell its important though");

			setTimeout(function () {
				StoryManager.nextBeat()
			}, 2000);
		}
	},
	{
		name: "chasing down the dog and cleaning poop",
		onStart: function () {
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
				$("#Quantumrectangle").show()

				const dialog = explanation[poops];
				if (dialog) StoryManager.setDialog(dialog)

				poops++;
				if (poops > 6) StoryManager.nextBeat();
			});
		}
	},
	{
		name: "readme.txt",
		onStart: function () {
			$("#Poop10").show();
			$("#Poop10").on("click", function () {
				$(this).hide();
				StoryManager.nextBeat();
			})
		}
	},
	{
		name: "final moments before the final update",
		onStart: function () {
			$("#Readme").show();
			StoryManager.setDialog("a message from me?")
			// var fn = function () { StoryManager.nextBeat() }
			StoryManager.delay(function () { StoryManager.nextBeat() }, 10000)
		}
	},
	{
		name: "the final update is here",
		onStart: function () {
			$("#Updater2").delay(200).slideDown(500);
			$(".updater2.overlay").show();

			setTimeout(function () {
				StoryManager.setDialog("oh no! the updater is back!", 5)
			}, 1000)

			$("#Updater2").on("click", function () {
				StoryManager.nextBeat();

			});

			timer = setTimeout(function () {
				StoryManager.nextBeat();
			}, 5000)
		}
	},
	{
		name: "Final",
		onStart: function () {
			StoryManager.setDialog("open your phone’s camera and entangle his Quantum bits!")
		}
	},

];

let speechbubbleTimeout;
let timer;

const StoryManager = {
	...settings,
	speechbubbleTimeout: null,
	nextBeat: function () {
		clearTimeout(timer);

		this.currentIndex++;
		let beat = storyBeats[this.currentIndex];

		console.log(beat.name)
		beat.onStart()
	},
	setDialog: function (text, duration) {

		clearTimeout(speechbubbleTimeout);

		$("#Dialog").text(text)
		$("#Speechbubble").text(text)

		$("#Speechbubble").show()

		if (!duration) return;

		speechbubbleTimeout = setTimeout(function () {
			$("#Speechbubble").hide();
		}, duration * 1000 * StoryManager.pacing)


	},
	clearDialog: function () {
		clearTimeout(speechbubbleTimeout);

		$("#Dialog").text("")
		$("#Speechbubble").text("")
		$("#Speechbubble").hide()

	},
	delay: function (fn, t) {
		setTimeout(fn, t)
	}
}

function dev() {
	// $("body").addClass("paulie");

	// $("#Paint").show();
	// $("#Music").show();
	// $("#Hyro").show();
}


function main() {

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

	StoryManager.nextBeat();

	dev();
}

main();


