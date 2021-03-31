

const Sounds = {
	down: document.getElementById("ClickDownSound"),
	up: document.getElementById("ClickUpSound"),
	fart: document.getElementById("FartSound"),
	tada: document.getElementById("TadaSound"),
	power: document.getElementById("PowerSound"),
}

Sounds.down.load();
Sounds.up.load();
Sounds.tada.load();
Sounds.power.load();


/// ==========================

const $OS = $("body");


$(".window.ui.fart").hide()


$OS.powerOn = function () {
	$OS.removeClass("sleeping")
	$OS.addClass("awake")
}
$OS.playSound = function (noise, volume = 0.2) {
	Sounds[noise].volume = volume;
	Sounds[noise].play()
}

// =========== fart.gif ===============

$(".desktop.icon").draggable();

let fartsUntilBootUp = ['niftydex', 'netsurf', 'paint','power']

$(".desktop.fart.icon").on("dblclick", function () {

	// Play gif
	$(".fart.window").show();

	if (fartsUntilBootUp.length === 0) return

	setTimeout(function () {
		Sounds.fart.play();
		var icon = fartsUntilBootUp.pop();
		$('.system.icon.' + icon).slideDown();
	}, 900);

	setTimeout(function () {
		Sounds.fart.play();
		var icon = fartsUntilBootUp.pop();
		$('.system.icon.' + icon).slideDown();
	}, 3000);

	setTimeout(function () {
		Sounds.fart.play();
		var icon = fartsUntilBootUp.pop();
		$('.system.icon.' + icon).slideDown();
	}, 5000);

	setTimeout(function () {
		Sounds.fart.play();
		var icon = fartsUntilBootUp.pop();
		$('.system.icon.' + icon).slideDown();
	}, 7000);
})

$(".fart.icon").css("left", "70%").css("top", "20%")
$(".fart.window").css("left", "10%").css("bottom", "30%")


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


//  ====== System Icons =======


$(".system.icon").hide(); // by default


$(function () {
	$(".system.icon.power").on("click",function() {
		console.log("p[lay")
		$OS.playSound("power")
	}); // by default
})




document.body.addEventListener('pressedOn', function (e) {
	$(".ui.window." + e.detail).show()
}, false);

document.body.addEventListener('pressedOff', function (e) {
	$(".ui.window." + e.detail).hide()
}, false);


$(function () {
	$('.ui.window.error .close').on('click', function () {
		$(".acornoverlay").addClass("full");
		// localStorage.setItem("offline", true)
	});

	const previouslyOffline = localStorage.getItem("offline");

	if (previouslyOffline) {
		$(".acornoverlay").addClass("full");
	}

})

let currentZ = 13;


{

	$(".ui.window").draggable({ handle: '.header', containment: "body", cursor: "none" });
	$('.ui.window .scrollbar-inner').scrollbar();

	$('.ui.window .close').on('click', function () {
		$(this).parent().parent().hide()
	})
	$('.ui.header').on('mousedown', function () {
		$(this).parent().css("zIndex", currentZ++);
	});

}




// const $paintWindow = $("#Paint");

// $.get("/paint", function (data) {
// 	$("#Paint .content").prepend(data)
// }).fail(function (err) {
// 	console.log(err.statusText)
// })

