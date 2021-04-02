
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

