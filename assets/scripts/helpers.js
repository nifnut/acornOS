

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

function randomRange(min, max)
{
	return min + Math.random() * (max - min);
}
function randomInt(min, max)
{
	var diff = max - min;
	var rand = Math.random() * diff;

	rand += min;

	return Math.floor(rand);
}

function setCookie(name, value, days)
{
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name)
{
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function createSound(filename, callback = function () { })
{

	var src = "/assets/sounds/" + filename;

	var sound = document.createElement('audio');
	sound.controls = 'controls';
	sound.src = src;
	sound.style.display = "none";
	sound.type = 'audio/mpeg';
	sound.preload = "auto"
	document.body.appendChild(sound);


	sound.addEventListener('loadeddata', function ()
	{

		if (sound.readyState >= 2) {
			// sound.play();
		}

		callback()
	});
	return sound;

}

function getOS()
{
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	return os;
}

function isOSValid()
{
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;


	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'Mac OS';
		return true
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
		return false;
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
		return true;
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
		return false
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
		return true;
	}

	return os;
}
