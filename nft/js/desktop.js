/** @format */


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
	windowLayers.pop();
	appInFocus = windowLayers[windowLayers.length-1];
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
