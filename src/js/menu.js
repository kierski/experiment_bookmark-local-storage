
var active = () => {
	const items = document.querySelectorAll('.nav-link');
	const id = document.getElementsByTagName("body")[0].id;

	for (let item of items) {
		let txt = item.textContent;
		if (id === txt) {
			item.classList.add('active');
		}
	}

};
