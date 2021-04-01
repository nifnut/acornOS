


const storyBeats = [
	{
		mode: ""
	},
	{
		onStart: function () {
			$("#PoweredOff").show();
			$("#Desktop").hide();
			$("#PoweredOff button").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			$("#PoweredOff").hide();
			$("#Desktop").show();
			$("#Dialog").text("i bet you can draw better than me. you take over")
			
			$("#StaticPaulie").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			$("body").addClass("paulie");
			$("#StaticPaulie").hide()
			$("#Dialog").text("")
			setTimeout(function () {
				StoryManager.nextBeat()
			}, 5000)
		}
	},
	{
		onStart: function () {
			$("#Updater1").show();
			$("#Updater1 button").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			$("#Updater1").hide();
			$("#Pet").show();
			$("#Poop1").show();

			let poops = 0;

			$("#Poop1 button").on("click", function () {
				$(this).hide();
				poops++;
				if (poops > 1) {
					StoryManager.nextBeat()
				}
			});
		}
	},
	{
		onStart: function () {
			// explains QR
			console.log("QR")
			$("#Hydro").show();

			$("#Hydro button").on("click", function () {
				console.log("clicked")
				$(this).hide();
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			// poops 8 of 9 QR images
			$("#PoopFiles").show();

			let poops = 0;

			$("#PoopFiles button").on("click", function () {
				$(this).hide();
				poops++;
				if (poops === 3) {
					StoryManager.nextBeat();
					poops++;
				}
			});

		}
	},
	{
		onStart: function () {
			// poops READ ME .txt
			$("#ReadMe").show();
			$("#Readme p").hide();
			$("#ReadMe button").on("click", function () {
				StoryManager.nextBeat();
			})
		}
	},
	{
		onStart: function () {
			$("#Readme p").show();
			// final updater pops up
			setTimeout(function () {
				StoryManager.nextBeat()
			}, 4000)
		}
	},
	{
		onStart: function () {
			$("#Updater2").show();

			$("#Updater2 button").on("click", function () {
				StoryManager.nextBeat();
			})
		}
	},
	{
		name: "Final",
		onStart: function () {
			$("#Desktop").hide();
			$("#Final").show();
			$("body").removeClass("paulie");

		}
	},

];

const StoryManager = {
	currentIndex: 1,
	nextBeat: function () {
		this.currentIndex++;
		let beat = storyBeats[this.currentIndex];

		console.log(beat)
		beat.onStart()
	}
}


function main() {

	$("body > div").hide()
	$("#Updater1").hide();
	$("#Pet").hide();
	$("#Poop1").hide();
	$("#Hydro").hide();
	$("#PoopFiles").hide();
	$("#ReadMe").hide();
	$("#Updater2").hide();

	StoryManager.nextBeat()
}

main()
