
const web = () => {

  const bookmarks = JSON.parse(localStorage.getItem('web'));
	const web = document.querySelector('.album .row');

	for (let bookmark of bookmarks) {

		var title = bookmark.title;
		var url = bookmark.url;
		var description = bookmark.description;

		let content = `
      <div class="card-block">
        <h4 class="card-title">${title}</h4>
        <p class="card-text">${description}</p>
        <a href="${url}" class="btn btn-primary">Go!</a>
      </div>
  `;

		let card = document.createElement('div');
		card.className = "card";
		card.innerHTML = content;
		web.appendChild(card);



	}

};
