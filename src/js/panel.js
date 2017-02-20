const panel = () => {

	var btn = document.querySelector('.bookmark_save');

	const saveBookmark = (e) => {
		e.preventDefault();

		const bookmark = {
			title: document.querySelector('.input_title input').value,
			url: document.querySelector('.input_link input').value,
			description: document.querySelector('#textarea_description').value,
			type: document.querySelector('input[name="type"]:checked').value,
			favourite: document.querySelector('input[type="checkbox"]').checked
		};

		var favourite_bookmarks = [];
		var yt_bookmarks = [];
		var web_bookmarks = [];

		if (!validate(bookmark.title, bookmark.url)) {
			return false;
		}

    if (bookmark.favourite) {
      if (localStorage.getItem('favourite') === null) {
        favourite_bookmarks.push(bookmark);
        localStorage.setItem('favourite', JSON.stringify(favourite_bookmarks));
      } else {
        favourite_bookmarks = JSON.parse(localStorage.getItem('favourite'));
        favourite_bookmarks.push(bookmark);
        localStorage.setItem('favourite', JSON.stringify(favourite_bookmarks));
      }
    }

		if (bookmark.type === 'youtube') {

			if (localStorage.getItem('youtube') === null) {
				yt_bookmarks.push(bookmark);
				localStorage.setItem('youtube', JSON.stringify(yt_bookmarks));
			} else {
				yt_bookmarks = JSON.parse(localStorage.getItem('youtube'));
				yt_bookmarks.push(bookmark);
				localStorage.setItem('youtube', JSON.stringify(yt_bookmarks));
			}

		} else if (bookmark.type === 'web') {

			if (localStorage.getItem('web') === null) {
				yt_bookmarks.push(bookmark);
				localStorage.setItem('web', JSON.stringify(yt_bookmarks));
			} else {
				yt_bookmarks = JSON.parse(localStorage.getItem('web'));
				yt_bookmarks.push(bookmark);
				localStorage.setItem('web', JSON.stringify(yt_bookmarks));
			}

		}

		alertSaveBookmark();

		document.querySelector('form').reset();

	};

	btn.addEventListener('click', saveBookmark, false);

};

// validate
var validate = (title, url) => {
	if (!title || !url) {
		alert('Please fill form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!url.match(regex)) {
		alert('Please use a valid url');
		return false;
	}
	return true;
};

// alert after save bookmark
var alertSaveBookmark = () => {
	var alertMsg = `<div class="alert alert-success" role="alert">
    <strong>Well done!</strong> You successfully read this important alert message.
  </div>`;

	var jumbotron = document.querySelector('.jumbotron .container');

	var alert = document.createElement('div');
	alert.className = "alertMsg";
	alert.innerHTML = alertMsg;
	jumbotron.appendChild(alert);

	const removeAlert = () => {
		var elem = document.querySelector('.alertMsg');
		elem.parentNode.removeChild(alert);
		return false;
	};

	setTimeout(() => removeAlert(), 2000);
};
