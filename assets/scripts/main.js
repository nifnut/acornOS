


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

main()
