

let topWindowZ = 5;
let appInFocus = null;
let windowLayers = [];

function initialize() {
	focusApp("credenza");
}


function focusApp(appName) {
	appInFocus = appName;
	const $icon = $(".icon." + appName);
	const $window = $(".window." + appName);
	$icon.addClass("selected");
	// $window.toggle("puff", {duration: 100});
	$window.show();
	windowLayers.push(appName);
	topWindowZ++;
	$window.css("zIndex", topWindowZ);
}

function closeApp(appName) {
	const $icon = $(".icon." + appName);
	const $window = $(".window." + appName);
	$icon.removeClass("selected");
	$window.hide();

	// $window.toggle("puff", {duration:100});
	windowLayers.pop();
	appInFocus = windowLayers[windowLayers.length - 1];
}


function handleIconClick(e) {

	const appName = $(this)
		.attr('class')
		.replace("selected", "")
		.replace("icon", "")
		.trim();

	// Special App Funtions
	if (appName === "power") {
		$("body").toggleClass("poweredOff");
		return;
	}
	if (appName === "clock") {

		$(".who.let.the.dogs").addClass("out");


		// return;
	}

	if ($(this).hasClass("selected")) {
		closeApp(appName);
	} else {
		focusApp(appName);
	}

}


$(function () {
	$(".icon").on("click", handleIconClick);


	initialize();
});
