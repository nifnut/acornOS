


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
			$("#StaticPaulie").hide();
			$("#Dialog").text("")
			setTimeout(function () {
				StoryManager.nextBeat()
			}, 5000)
		}
	},
	{
		onStart: function () {
			$("#Updater1").show();
			$("#Dialog").text("i am so sick of the updater")
			$("#Updater1 button").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			$("#Updater1").hide();
			$("#Pet").show();
			$("#Kennel").show();
			$("#Dialog").text("oh no sparky got loose")
			

			let poops = 0;

			$("#Poop1 button").on("click", function () {
				$(this).hide();
				poops++;
				if (poops > 1) {
					StoryManager.nextBeat()
				}
			});
			setTimeout(function () {
				$("#Poop1").show();
			}, 1000)
			
		}
	},
	{
		onStart: function () {
			// explains QR
			$("#Dialog").text("oh that, yeah im not sure what it is. i can tell its important though")
			$("#Hydro").show();

			$("#Hydro button").on("click", function () {
				$(this).hide();
				StoryManager.nextBeat()
			});
		}
	},
	{
		onStart: function () {
			$("#Dialog").text("what the heck did my dog eat")
			$("#PoopFiles").show();

			let poops = 0;

			$("#PoopFiles button").on("click", function () {
				$(this).hide();
				poops++;
				if (poops === 7) {
					StoryManager.nextBeat();
					poops++;
				}
			});

		}
	},
	{
		onStart: function () {
			// poops READ ME .txt
			$("#ReadMeFile").show();
			$("#ReadMeFile").on("click", function () {
				StoryManager.nextBeat();
			})
		}
	},
	{
		onStart: function () {
			$("#ReadMeWindow").show();
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

		// console.log(beat)
		beat.onStart()
	}
}


function main() {

	$("body > div").hide()
	$("#Updater1").hide();
	$("#Pet").hide();
	$("#Kennel").hide();
	$("#Poop1").hide();
	$("#Hydro").hide();
	$("#PoopFiles").hide();
	$("#ReadMeFile").hide();
	$("#ReadMeWindow").hide();
	$("#Updater2").hide();

	StoryManager.nextBeat()
}

main()
