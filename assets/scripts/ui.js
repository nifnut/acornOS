
let UI = {

	cursor: {
		x: null,
		y: null,
		isTracking: false,
		isPaulie: false,
	},
	updateCursor: function (e) {
		this.cursor.x = e.pageX;
		this.cursor.y = e.pageY;
	}
}

document.addEventListener('mousemove', UI.updateCursor.bind(UI));




let currentZ = 100;


	// $('.ui.window .close').on('click', function () {
	// 	$(this).parent().parent().hide()
	// })
	$('.window .header').on('mousedown', function () {
		$(this).parent().css("zIndex", currentZ++);
	});


