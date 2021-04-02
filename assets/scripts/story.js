


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
			$("#Desktop").show();
			$("#Paint").show();
			$("#Music").show();
			$("#Hyro").show();
			$("#PaulieIntro").show();
			$("#Dialog").text("i bet you can draw better than me. click me to take control")

			$("#PaulieIntro").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		name: "playing around part 2",
		onStart: function () {
			$("body").addClass("paulie");
			$("#PaulieIntro").hide();
			$("#Dialog").text("heck yeah lets do this together");
			// setTimeout(function () {
			// 	StoryManager.nextBeat()
			// }, 5000)
		}
	},
	{
		name: "updater threat level 0%",
		onStart: function () {
			$("#Updater1").show();
			$("#Dialog").text("ugh, i am so sick of the updater")
			$("#Updater1 button").on("click", function () {
				StoryManager.nextBeat()
			});
		}
	},
	{
		name: "sparky is loose",
		onStart: function () {
			$("#Updater1").hide();

			$("#Hyro").show();
			$("#Kennel").show();
			$("#Dialog").text("oh no sparky got loose")

			$("#Sparky").delay(100).slideDown(0);

			$("#Poop1").delay(2000).slideDown(0);
			$("#Poop2").delay(4000).slideDown(0);

			let poops = 2;

			$("#Poop1").on("click", function () {
				$(this).hide();
				poops--;
				if (poops === 0) StoryManager.nextBeat(); 
			});

			$("#Poop2").on("click", function () {
				$(this).hide();
				poops--;
				if (poops === 0) StoryManager.nextBeat(); 
			});

		}
	},
	{
		name: "paulie explains part 1",
		onStart: function () {

			$("#Dialog").text("oh that, yeah im not sure what it is. i can tell its important though");
			$("#Hyro").show();

			setTimeout(function () {
				StoryManager.nextBeat()
			},2000);
		}
	},
	{
		name: "chasing down the dog and cleaning poop",
		onStart: function () {
			$("#Dialog").text("what the heck did my dog eat")

			$("#Poop3").delay(1000).slideDown(0);
			$("#Poop4").delay(1500).slideDown(0);
			$("#Poop5").delay(2000).slideDown(0);
			$("#Poop6").delay(2500).slideDown(0);
			$("#Poop7").delay(3000).slideDown(0);
			$("#Poop8").delay(3500).slideDown(0);
			$("#Poop9").delay(4000).slideDown(0);

			let poops = 7;

			$(".poop.qr").on("click", function () {
				$(this).hide();
				$("#Kennel").css("zIndex",1);

				poops--;
				if (poops === 0) StoryManager.nextBeat(); 
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

			setTimeout(function () {
				StoryManager.nextBeat()
			}, 1000)
		}
	},
	{
		name: "the final update is here",
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
			$("#PoweredOff").hide();
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

		console.log(beat.name)
		beat.onStart()
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
	$("#Sparky").hide();
	$("#Kennel").hide();
	$(".poop").hide();
	$("#Hyro").hide();
	$("#PoopFiles").hide();
	$("#Readme").hide();
	$("#ReadMeWindow").hide();
	$("#Updater2").hide();
	$("#Final").hide();

	StoryManager.nextBeat();

	dev();
}

main()
