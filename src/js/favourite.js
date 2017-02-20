const favourite = () => {

	const bookmarks = JSON.parse(localStorage.getItem('favourite'));
	const favouriteList = document.querySelector('.album .list-group');

	for (let bookmark of bookmarks) {

		var title = bookmark.title;
		var url = bookmark.url;
		var description = bookmark.description;

		let content = `
    <a href="${url}" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${title}</h5>
      </div>
      <p class="mb-1">${description}</p>

    </a>
  `;

		let list = document.createElement('div');
		list.className = "fav_elem";
		list.innerHTML = content;
		favouriteList.appendChild(list);

	}

};
