// search.js — smart search bar with engine prefix routing
// @g <query>   → Google
// @ddg <query> → DuckDuckGo
// <query>      → Google (default)

const ENGINES = {
	'@g':   q => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
	'@ddg': q => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
};

const DEFAULT_ENGINE = ENGINES['@g'];

document.getElementById('searchInput').addEventListener('keydown', e => {
	if (e.key !== 'Enter') return;

	const raw = e.target.value.trim();
	if (!raw) return;

	let url;
	const prefix = Object.keys(ENGINES).find(p => raw.startsWith(p + ' '));
	if (prefix) {
		url = ENGINES[prefix](raw.slice(prefix.length + 1).trim());
	} else {
		url = DEFAULT_ENGINE(raw);
	}

	if (CONFIG.openInNewTab) {
		window.open(url, '_blank');
	} else {
		window.location.href = url;
	}

	e.target.value = '';
});
