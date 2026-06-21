// ┌┬┐┬┌┬┐┌─┐
//  │ ││││├┤
//  ┴ ┴┴ ┴└─┘
// Set time and Date
//
// Note: this profile has privacy.resistFingerprinting enabled, which forces
// `new Date()` to report UTC to web pages. We pin an explicit timezone via
// Intl so the clock shows local (Malaysia) time without weakening RFP.

const CLOCK_TIMEZONE = 'Asia/Kuala_Lumpur'; // UTC+8, no DST

window.onload = displayClock();
function displayClock() {
	const now = new Date();

	const parts = {};
	for (const p of new Intl.DateTimeFormat('en-US', {
		timeZone: CLOCK_TIMEZONE,
		hourCycle: CONFIG.twelveHourFormat ? 'h12' : 'h23',
		hour: 'numeric',
		minute: '2-digit',
		month: 'short',
		day: 'numeric',
	}).formatToParts(now)) {
		parts[p.type] = p.value;
	}

	const hh = parts.hour;
	const min = parts.minute;
	const ampm = CONFIG.twelveHourFormat && parts.dayPeriod ? ' ' + parts.dayPeriod.toLowerCase() : '';

	document.getElementById('hour').innerText = hh;
	document.getElementById('separator').innerHTML = ' : ';
	document.getElementById('minutes').innerText = min + ampm;

	document.getElementById('month').innerText = parts.month;
	document.getElementById('day').innerText = parts.day;

	setTimeout(displayClock, 1000);
}
