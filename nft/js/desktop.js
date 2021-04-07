/** @format */


let topWindowZ = 5;
let appInFocus = null;


function initialize() {
	focusApp("niftydex");
}


function focusApp(appName) {
	appInFocus = appName;
	const $icon = $(".icon." + appName);
	const $window = $(".window." + appName);
	$icon.addClass("selected");
	$window.show();
	topWindowZ++;
	$window.css("zIndex", topWindowZ);
}

function closeApp(appName) {
	const $icon = $(".icon." + appName);
	const $window = $(".window." + appName);
	$icon.removeClass("selected");
	$window.hide();
	appInFocus = null;
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

	if (appInFocus === appName) {
		closeApp(appName);
	} else {
		focusApp(appName);
	}




}


$(function () {
	$(".icon").on("click", handleIconClick);


	initialize();
});
