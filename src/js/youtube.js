const youtube = () => {

	const getParam = (url) => {
		let params = url.substr(29).split('&');
		for (let i = 0; i < params.length; i++) {
			let param = params[i].split('=');
			if (param[i] == "?v") {
				let link = 'https://www.youtube.com/embed/' + param[1];
				return link;
			}
		}
	};

	const bookmarks = JSON.parse(localStorage.getItem('youtube'));
	const album = document.querySelector('.album .row');

	for (let bookmark of bookmarks) {

		var title = bookmark.title;
		var url = bookmark.url;
		var link = getParam(url);
		var description = bookmark.description;

		let content = `
    <div class="yt-framr">
      <iframe src="${link}" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="card-block">
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${description}</p>
      <a href="${url}" class="btn btn-primary">Go!</a>
    </div>
  `;

		let card = document.createElement('div');
		card.className = "card";
		card.innerHTML = content;
		album.appendChild(card);

	}

};
