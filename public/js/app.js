'use strict';

var active = function active() {
	var items = document.querySelectorAll('.nav-link');
	var id = document.getElementsByTagName("body")[0].id;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var item = _step.value;

			var txt = item.textContent;
			if (id === txt) {
				item.classList.add('active');
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};
'use strict';

var giphy = function giphy() {

	var URL = 'http://api.giphy.com/v1/gifs/search?q=glitch&api_key=dc6zaTOxFJmzC&limit=21';
	var req = new XMLHttpRequest();
	req.open('GET', URL, true);
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				randomGIF(req.responseText);
			} else {
				console.log('Error');
			}
		}
	};
	req.send(null);

	var container = document.querySelector('.giphy');

	var randomGIF = function randomGIF(obj) {
		var random = Math.ceil(Math.random() * 20);
		var gifs = JSON.parse(obj);
		var gif = gifs.data[random].id;
		var urlGif = 'http://i.giphy.com/3otPoqZUXOWS4wNx4c.gif';
		var url = 'url(http://i.giphy.com/' + gif + '.gif)';
		container.style.backgroundImage = url;
	};
};
'use strict';

var panel = function panel() {

	var btn = document.querySelector('.bookmark_save');

	var saveBookmark = function saveBookmark(e) {
		e.preventDefault();

		var bookmark = {
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
var validate = function validate(title, url) {
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
var alertSaveBookmark = function alertSaveBookmark() {
	var alertMsg = '<div class="alert alert-success" role="alert">\n    <strong>Well done!</strong> You successfully read this important alert message.\n  </div>';

	var jumbotron = document.querySelector('.jumbotron .container');

	var alert = document.createElement('div');
	alert.className = "alertMsg";
	alert.innerHTML = alertMsg;
	jumbotron.appendChild(alert);

	var removeAlert = function removeAlert() {
		var elem = document.querySelector('.alertMsg');
		elem.parentNode.removeChild(alert);
		return false;
	};

	setTimeout(function () {
		return removeAlert();
	}, 2000);
};
'use strict';

var favourite = function favourite() {

		var bookmarks = JSON.parse(localStorage.getItem('favourite'));
		var favouriteList = document.querySelector('.album .list-group');

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
				for (var _iterator = bookmarks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var bookmark = _step.value;


						var title = bookmark.title;
						var url = bookmark.url;
						var description = bookmark.description;

						var content = '\n    <a href="' + url + '" class="list-group-item list-group-item-action">\n      <div class="d-flex w-100 justify-content-between">\n        <h5 class="mb-1">' + title + '</h5>\n      </div>\n      <p class="mb-1">' + description + '</p>\n\n    </a>\n  ';

						var list = document.createElement('div');
						list.className = "fav_elem";
						list.innerHTML = content;
						favouriteList.appendChild(list);
				}
		} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
		} finally {
				try {
						if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
						}
				} finally {
						if (_didIteratorError) {
								throw _iteratorError;
						}
				}
		}
};
'use strict';

var web = function web() {

	var bookmarks = JSON.parse(localStorage.getItem('web'));
	var web = document.querySelector('.album .row');

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = bookmarks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var bookmark = _step.value;


			var title = bookmark.title;
			var url = bookmark.url;
			var description = bookmark.description;

			var content = '\n      <div class="card-block">\n        <h4 class="card-title">' + title + '</h4>\n        <p class="card-text">' + description + '</p>\n        <a href="' + url + '" class="btn btn-primary">Go!</a>\n      </div>\n  ';

			var card = document.createElement('div');
			card.className = "card";
			card.innerHTML = content;
			web.appendChild(card);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};
'use strict';

var youtube = function youtube() {

	var getParam = function getParam(url) {
		var params = url.substr(29).split('&');
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split('=');
			if (param[i] == "?v") {
				var _link = 'https://www.youtube.com/embed/' + param[1];
				return _link;
			}
		}
	};

	var bookmarks = JSON.parse(localStorage.getItem('youtube'));
	var album = document.querySelector('.album .row');

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = bookmarks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var bookmark = _step.value;


			var title = bookmark.title;
			var url = bookmark.url;
			var link = getParam(url);
			var description = bookmark.description;

			var content = '\n    <div class="yt-framr">\n      <iframe src="' + link + '" frameborder="0" allowfullscreen></iframe>\n    </div>\n    <div class="card-block">\n      <h4 class="card-title">' + title + '</h4>\n      <p class="card-text">' + description + '</p>\n      <a href="' + url + '" class="btn btn-primary">Go!</a>\n    </div>\n  ';

			var card = document.createElement('div');
			card.className = "card";
			card.innerHTML = content;
			album.appendChild(card);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};
'use strict';

var bodyID = document.getElementsByTagName("body")[0].id;

// active item in menu
active();

// generate giphy
if (bodyID === 'home') {
  giphy();
}

// panel
if (bodyID === 'panel') {
  panel();
}

// youtube bookmark
if (bodyID === 'youtube') {
  youtube();
}

// youtube bookmark
if (bodyID === 'favourite') {
  favourite();
}

// web bookmark
if (bodyID === 'web') {
  web();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUuanMiLCJnaXBoeS5qcyIsInBhbmVsLmpzIiwiZmF2b3VyaXRlLmpzIiwid2ViLmpzIiwieW91dHViZS5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJhY3RpdmUiLCJpdGVtcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImlkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpdGVtIiwidHh0IiwidGV4dENvbnRlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnaXBoeSIsIlVSTCIsInJlcSIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsImFFdnQiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmFuZG9tR0lGIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsInNlbmQiLCJjb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwib2JqIiwicmFuZG9tIiwiTWF0aCIsImNlaWwiLCJnaWZzIiwiSlNPTiIsInBhcnNlIiwiZ2lmIiwiZGF0YSIsInVybEdpZiIsInVybCIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicGFuZWwiLCJidG4iLCJzYXZlQm9va21hcmsiLCJlIiwicHJldmVudERlZmF1bHQiLCJib29rbWFyayIsInRpdGxlIiwidmFsdWUiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJmYXZvdXJpdGUiLCJjaGVja2VkIiwiZmF2b3VyaXRlX2Jvb2ttYXJrcyIsInl0X2Jvb2ttYXJrcyIsIndlYl9ib29rbWFya3MiLCJ2YWxpZGF0ZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImFsZXJ0U2F2ZUJvb2ttYXJrIiwicmVzZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiYWxlcnQiLCJleHByZXNzaW9uIiwicmVnZXgiLCJSZWdFeHAiLCJtYXRjaCIsImFsZXJ0TXNnIiwianVtYm90cm9uIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwicmVtb3ZlQWxlcnQiLCJlbGVtIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwic2V0VGltZW91dCIsImJvb2ttYXJrcyIsImZhdm91cml0ZUxpc3QiLCJjb250ZW50IiwibGlzdCIsIndlYiIsImNhcmQiLCJ5b3V0dWJlIiwiZ2V0UGFyYW0iLCJwYXJhbXMiLCJzdWJzdHIiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwYXJhbSIsImxpbmsiLCJhbGJ1bSIsImJvZHlJRCJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJQSxTQUFTLFNBQVRBLE1BQVMsR0FBTTtBQUNsQixLQUFNQyxRQUFRQyxTQUFTQyxnQkFBVCxDQUEwQixXQUExQixDQUFkO0FBQ0EsS0FBTUMsS0FBS0YsU0FBU0csb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUNELEVBQXBEOztBQUZrQjtBQUFBO0FBQUE7O0FBQUE7QUFJbEIsdUJBQWlCSCxLQUFqQiw4SEFBd0I7QUFBQSxPQUFmSyxJQUFlOztBQUN2QixPQUFJQyxNQUFNRCxLQUFLRSxXQUFmO0FBQ0EsT0FBSUosT0FBT0csR0FBWCxFQUFnQjtBQUNmRCxTQUFLRyxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsUUFBbkI7QUFDQTtBQUNEO0FBVGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXbEIsQ0FYRDs7O0FDREEsSUFBTUMsUUFBUSxTQUFSQSxLQUFRLEdBQU07O0FBRW5CLEtBQU1DLE1BQU0sNkVBQVo7QUFDQSxLQUFNQyxNQUFNLElBQUlDLGNBQUosRUFBWjtBQUNBRCxLQUFJRSxJQUFKLENBQVMsS0FBVCxFQUFnQkgsR0FBaEIsRUFBcUIsSUFBckI7QUFDQUMsS0FBSUcsa0JBQUosR0FBeUIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2xDLE1BQUlKLElBQUlLLFVBQUosSUFBa0IsQ0FBdEIsRUFBeUI7QUFDeEIsT0FBSUwsSUFBSU0sTUFBSixJQUFjLEdBQWxCLEVBQXVCO0FBQ3RCQyxjQUFVUCxJQUFJUSxZQUFkO0FBQ0EsSUFGRCxNQUVPO0FBQ05DLFlBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0E7QUFDRDtBQUNELEVBUkQ7QUFTQVYsS0FBSVcsSUFBSixDQUFTLElBQVQ7O0FBRUEsS0FBTUMsWUFBWXZCLFNBQVN3QixhQUFULENBQXVCLFFBQXZCLENBQWxCOztBQUVBLEtBQU1OLFlBQVksU0FBWkEsU0FBWSxDQUFDTyxHQUFELEVBQVM7QUFDMUIsTUFBSUMsU0FBU0MsS0FBS0MsSUFBTCxDQUFVRCxLQUFLRCxNQUFMLEtBQWdCLEVBQTFCLENBQWI7QUFDQSxNQUFJRyxPQUFPQyxLQUFLQyxLQUFMLENBQVdOLEdBQVgsQ0FBWDtBQUNBLE1BQUlPLE1BQU1ILEtBQUtJLElBQUwsQ0FBVVAsTUFBVixFQUFrQnhCLEVBQTVCO0FBQ0EsTUFBSWdDLFNBQVMsMkNBQWI7QUFDQSxNQUFJQyxNQUFNLDRCQUE0QkgsR0FBNUIsR0FBa0MsT0FBNUM7QUFDQVQsWUFBVWEsS0FBVixDQUFnQkMsZUFBaEIsR0FBa0NGLEdBQWxDO0FBQ0EsRUFQRDtBQVNBLENBM0JEOzs7QUNBQSxJQUFNRyxRQUFRLFNBQVJBLEtBQVEsR0FBTTs7QUFFbkIsS0FBSUMsTUFBTXZDLFNBQVN3QixhQUFULENBQXVCLGdCQUF2QixDQUFWOztBQUVBLEtBQU1nQixlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxJQUFFQyxjQUFGOztBQUVBLE1BQU1DLFdBQVc7QUFDaEJDLFVBQU81QyxTQUFTd0IsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkNxQixLQURwQztBQUVoQlYsUUFBS25DLFNBQVN3QixhQUFULENBQXVCLG1CQUF2QixFQUE0Q3FCLEtBRmpDO0FBR2hCQyxnQkFBYTlDLFNBQVN3QixhQUFULENBQXVCLHVCQUF2QixFQUFnRHFCLEtBSDdDO0FBSWhCRSxTQUFNL0MsU0FBU3dCLGFBQVQsQ0FBdUIsNEJBQXZCLEVBQXFEcUIsS0FKM0M7QUFLaEJHLGNBQVdoRCxTQUFTd0IsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaUR5QjtBQUw1QyxHQUFqQjs7QUFRQSxNQUFJQyxzQkFBc0IsRUFBMUI7QUFDQSxNQUFJQyxlQUFlLEVBQW5CO0FBQ0EsTUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBLE1BQUksQ0FBQ0MsU0FBU1YsU0FBU0MsS0FBbEIsRUFBeUJELFNBQVNSLEdBQWxDLENBQUwsRUFBNkM7QUFDNUMsVUFBTyxLQUFQO0FBQ0E7O0FBRUMsTUFBSVEsU0FBU0ssU0FBYixFQUF3QjtBQUN0QixPQUFJTSxhQUFhQyxPQUFiLENBQXFCLFdBQXJCLE1BQXNDLElBQTFDLEVBQWdEO0FBQzlDTCx3QkFBb0JNLElBQXBCLENBQXlCYixRQUF6QjtBQUNBVyxpQkFBYUcsT0FBYixDQUFxQixXQUFyQixFQUFrQzNCLEtBQUs0QixTQUFMLENBQWVSLG1CQUFmLENBQWxDO0FBQ0QsSUFIRCxNQUdPO0FBQ0xBLDBCQUFzQnBCLEtBQUtDLEtBQUwsQ0FBV3VCLGFBQWFDLE9BQWIsQ0FBcUIsV0FBckIsQ0FBWCxDQUF0QjtBQUNBTCx3QkFBb0JNLElBQXBCLENBQXlCYixRQUF6QjtBQUNBVyxpQkFBYUcsT0FBYixDQUFxQixXQUFyQixFQUFrQzNCLEtBQUs0QixTQUFMLENBQWVSLG1CQUFmLENBQWxDO0FBQ0Q7QUFDRjs7QUFFSCxNQUFJUCxTQUFTSSxJQUFULEtBQWtCLFNBQXRCLEVBQWlDOztBQUVoQyxPQUFJTyxhQUFhQyxPQUFiLENBQXFCLFNBQXJCLE1BQW9DLElBQXhDLEVBQThDO0FBQzdDSixpQkFBYUssSUFBYixDQUFrQmIsUUFBbEI7QUFDQVcsaUJBQWFHLE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0MzQixLQUFLNEIsU0FBTCxDQUFlUCxZQUFmLENBQWhDO0FBQ0EsSUFIRCxNQUdPO0FBQ05BLG1CQUFlckIsS0FBS0MsS0FBTCxDQUFXdUIsYUFBYUMsT0FBYixDQUFxQixTQUFyQixDQUFYLENBQWY7QUFDQUosaUJBQWFLLElBQWIsQ0FBa0JiLFFBQWxCO0FBQ0FXLGlCQUFhRyxPQUFiLENBQXFCLFNBQXJCLEVBQWdDM0IsS0FBSzRCLFNBQUwsQ0FBZVAsWUFBZixDQUFoQztBQUNBO0FBRUQsR0FYRCxNQVdPLElBQUlSLFNBQVNJLElBQVQsS0FBa0IsS0FBdEIsRUFBNkI7O0FBRW5DLE9BQUlPLGFBQWFDLE9BQWIsQ0FBcUIsS0FBckIsTUFBZ0MsSUFBcEMsRUFBMEM7QUFDekNKLGlCQUFhSyxJQUFiLENBQWtCYixRQUFsQjtBQUNBVyxpQkFBYUcsT0FBYixDQUFxQixLQUFyQixFQUE0QjNCLEtBQUs0QixTQUFMLENBQWVQLFlBQWYsQ0FBNUI7QUFDQSxJQUhELE1BR087QUFDTkEsbUJBQWVyQixLQUFLQyxLQUFMLENBQVd1QixhQUFhQyxPQUFiLENBQXFCLEtBQXJCLENBQVgsQ0FBZjtBQUNBSixpQkFBYUssSUFBYixDQUFrQmIsUUFBbEI7QUFDQVcsaUJBQWFHLE9BQWIsQ0FBcUIsS0FBckIsRUFBNEIzQixLQUFLNEIsU0FBTCxDQUFlUCxZQUFmLENBQTVCO0FBQ0E7QUFFRDs7QUFFRFE7O0FBRUEzRCxXQUFTd0IsYUFBVCxDQUF1QixNQUF2QixFQUErQm9DLEtBQS9CO0FBRUEsRUExREQ7O0FBNERBckIsS0FBSXNCLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCckIsWUFBOUIsRUFBNEMsS0FBNUM7QUFFQSxDQWxFRDs7QUFvRUE7QUFDQSxJQUFJYSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ1QsS0FBRCxFQUFRVCxHQUFSLEVBQWdCO0FBQzlCLEtBQUksQ0FBQ1MsS0FBRCxJQUFVLENBQUNULEdBQWYsRUFBb0I7QUFDbkIyQixRQUFNLGtCQUFOO0FBQ0EsU0FBTyxLQUFQO0FBQ0E7O0FBRUQsS0FBSUMsYUFBYSxtRkFBakI7QUFDQSxLQUFJQyxRQUFRLElBQUlDLE1BQUosQ0FBV0YsVUFBWCxDQUFaO0FBQ0EsS0FBSSxDQUFDNUIsSUFBSStCLEtBQUosQ0FBVUYsS0FBVixDQUFMLEVBQXVCO0FBQ3RCRixRQUFNLHdCQUFOO0FBQ0EsU0FBTyxLQUFQO0FBQ0E7QUFDRCxRQUFPLElBQVA7QUFDQSxDQWJEOztBQWVBO0FBQ0EsSUFBSUgsb0JBQW9CLFNBQXBCQSxpQkFBb0IsR0FBTTtBQUM3QixLQUFJUSwwSkFBSjs7QUFJQSxLQUFJQyxZQUFZcEUsU0FBU3dCLGFBQVQsQ0FBdUIsdUJBQXZCLENBQWhCOztBQUVBLEtBQUlzQyxRQUFROUQsU0FBU3FFLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBUCxPQUFNUSxTQUFOLEdBQWtCLFVBQWxCO0FBQ0FSLE9BQU1TLFNBQU4sR0FBa0JKLFFBQWxCO0FBQ0FDLFdBQVVJLFdBQVYsQ0FBc0JWLEtBQXRCOztBQUVBLEtBQU1XLGNBQWMsU0FBZEEsV0FBYyxHQUFNO0FBQ3pCLE1BQUlDLE9BQU8xRSxTQUFTd0IsYUFBVCxDQUF1QixXQUF2QixDQUFYO0FBQ0FrRCxPQUFLQyxVQUFMLENBQWdCQyxXQUFoQixDQUE0QmQsS0FBNUI7QUFDQSxTQUFPLEtBQVA7QUFDQSxFQUpEOztBQU1BZSxZQUFXO0FBQUEsU0FBTUosYUFBTjtBQUFBLEVBQVgsRUFBZ0MsSUFBaEM7QUFDQSxDQW5CRDs7O0FDckZBLElBQU16QixZQUFZLFNBQVpBLFNBQVksR0FBTTs7QUFFdkIsTUFBTThCLFlBQVloRCxLQUFLQyxLQUFMLENBQVd1QixhQUFhQyxPQUFiLENBQXFCLFdBQXJCLENBQVgsQ0FBbEI7QUFDQSxNQUFNd0IsZ0JBQWdCL0UsU0FBU3dCLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXRCOztBQUh1QjtBQUFBO0FBQUE7O0FBQUE7QUFLdkIseUJBQXFCc0QsU0FBckIsOEhBQWdDO0FBQUEsVUFBdkJuQyxRQUF1Qjs7O0FBRS9CLFVBQUlDLFFBQVFELFNBQVNDLEtBQXJCO0FBQ0EsVUFBSVQsTUFBTVEsU0FBU1IsR0FBbkI7QUFDQSxVQUFJVyxjQUFjSCxTQUFTRyxXQUEzQjs7QUFFQSxVQUFJa0MsOEJBQ1M3QyxHQURULDhJQUdxQlMsS0FIckIsbURBS2tCRSxXQUxsQix5QkFBSjs7QUFVQSxVQUFJbUMsT0FBT2pGLFNBQVNxRSxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQVksV0FBS1gsU0FBTCxHQUFpQixVQUFqQjtBQUNBVyxXQUFLVixTQUFMLEdBQWlCUyxPQUFqQjtBQUNBRCxvQkFBY1AsV0FBZCxDQUEwQlMsSUFBMUI7QUFFQTtBQTFCc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRCdkIsQ0E1QkQ7OztBQ0NBLElBQU1DLE1BQU0sZUFBTTs7QUFFaEIsS0FBTUosWUFBWWhELEtBQUtDLEtBQUwsQ0FBV3VCLGFBQWFDLE9BQWIsQ0FBcUIsS0FBckIsQ0FBWCxDQUFsQjtBQUNELEtBQU0yQixNQUFNbEYsU0FBU3dCLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWjs7QUFIaUI7QUFBQTtBQUFBOztBQUFBO0FBS2pCLHVCQUFxQnNELFNBQXJCLDhIQUFnQztBQUFBLE9BQXZCbkMsUUFBdUI7OztBQUUvQixPQUFJQyxRQUFRRCxTQUFTQyxLQUFyQjtBQUNBLE9BQUlULE1BQU1RLFNBQVNSLEdBQW5CO0FBQ0EsT0FBSVcsY0FBY0gsU0FBU0csV0FBM0I7O0FBRUEsT0FBSWtDLGdGQUUyQnBDLEtBRjNCLDRDQUd5QkUsV0FIekIsK0JBSWFYLEdBSmIsd0RBQUo7O0FBUUEsT0FBSWdELE9BQU9uRixTQUFTcUUsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0FjLFFBQUtiLFNBQUwsR0FBaUIsTUFBakI7QUFDQWEsUUFBS1osU0FBTCxHQUFpQlMsT0FBakI7QUFDQUUsT0FBSVYsV0FBSixDQUFnQlcsSUFBaEI7QUFJQTtBQTFCZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRCakIsQ0E1QkQ7OztBQ0RBLElBQU1DLFVBQVUsU0FBVkEsT0FBVSxHQUFNOztBQUVyQixLQUFNQyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ2xELEdBQUQsRUFBUztBQUN6QixNQUFJbUQsU0FBU25ELElBQUlvRCxNQUFKLENBQVcsRUFBWCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLENBQWI7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsT0FBT0ksTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3ZDLE9BQUlFLFFBQVFMLE9BQU9HLENBQVAsRUFBVUQsS0FBVixDQUFnQixHQUFoQixDQUFaO0FBQ0EsT0FBSUcsTUFBTUYsQ0FBTixLQUFZLElBQWhCLEVBQXNCO0FBQ3JCLFFBQUlHLFFBQU8sbUNBQW1DRCxNQUFNLENBQU4sQ0FBOUM7QUFDQSxXQUFPQyxLQUFQO0FBQ0E7QUFDRDtBQUNELEVBVEQ7O0FBV0EsS0FBTWQsWUFBWWhELEtBQUtDLEtBQUwsQ0FBV3VCLGFBQWFDLE9BQWIsQ0FBcUIsU0FBckIsQ0FBWCxDQUFsQjtBQUNBLEtBQU1zQyxRQUFRN0YsU0FBU3dCLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBZDs7QUFkcUI7QUFBQTtBQUFBOztBQUFBO0FBZ0JyQix1QkFBcUJzRCxTQUFyQiw4SEFBZ0M7QUFBQSxPQUF2Qm5DLFFBQXVCOzs7QUFFL0IsT0FBSUMsUUFBUUQsU0FBU0MsS0FBckI7QUFDQSxPQUFJVCxNQUFNUSxTQUFTUixHQUFuQjtBQUNBLE9BQUl5RCxPQUFPUCxTQUFTbEQsR0FBVCxDQUFYO0FBQ0EsT0FBSVcsY0FBY0gsU0FBU0csV0FBM0I7O0FBRUEsT0FBSWtDLGdFQUVlWSxJQUZmLDRIQUt5QmhELEtBTHpCLDBDQU11QkUsV0FOdkIsNkJBT1dYLEdBUFgsc0RBQUo7O0FBV0EsT0FBSWdELE9BQU9uRixTQUFTcUUsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0FjLFFBQUtiLFNBQUwsR0FBaUIsTUFBakI7QUFDQWEsUUFBS1osU0FBTCxHQUFpQlMsT0FBakI7QUFDQWEsU0FBTXJCLFdBQU4sQ0FBa0JXLElBQWxCO0FBRUE7QUF2Q29CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5Q3JCLENBekNEOzs7QUNDQSxJQUFNVyxTQUFTOUYsU0FBU0csb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUNELEVBQXhEOztBQUVBO0FBQ0FKOztBQUVBO0FBQ0EsSUFBSWdHLFdBQVcsTUFBZixFQUF1QjtBQUNyQnJGO0FBQ0Q7O0FBRUQ7QUFDQSxJQUFJcUYsV0FBVyxPQUFmLEVBQXdCO0FBQ3RCeEQ7QUFDRDs7QUFFRDtBQUNBLElBQUl3RCxXQUFXLFNBQWYsRUFBMEI7QUFDeEJWO0FBQ0Q7O0FBRUQ7QUFDQSxJQUFJVSxXQUFXLFdBQWYsRUFBNEI7QUFDMUI5QztBQUNEOztBQUVEO0FBQ0EsSUFBSThDLFdBQVcsS0FBZixFQUFzQjtBQUNwQlo7QUFDRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBhY3RpdmUgPSAoKSA9PiB7XG5cdGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdi1saW5rJyk7XG5cdGNvbnN0IGlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmlkO1xuXG5cdGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcblx0XHRsZXQgdHh0ID0gaXRlbS50ZXh0Q29udGVudDtcblx0XHRpZiAoaWQgPT09IHR4dCkge1xuXHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHR9XG5cdH1cblxufTtcbiIsImNvbnN0IGdpcGh5ID0gKCkgPT4ge1xuXG5cdGNvbnN0IFVSTCA9ICdodHRwOi8vYXBpLmdpcGh5LmNvbS92MS9naWZzL3NlYXJjaD9xPWdsaXRjaCZhcGlfa2V5PWRjNnphVE94RkptekMmbGltaXQ9MjEnO1xuXHRjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0cmVxLm9wZW4oJ0dFVCcsIFVSTCwgdHJ1ZSk7XG5cdHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoYUV2dCkgPT4ge1xuXHRcdGlmIChyZXEucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRpZiAocmVxLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0cmFuZG9tR0lGKHJlcS5yZXNwb25zZVRleHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Vycm9yJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXEuc2VuZChudWxsKTtcblxuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2lwaHknKTtcblxuXHRjb25zdCByYW5kb21HSUYgPSAob2JqKSA9PiB7XG5cdFx0dmFyIHJhbmRvbSA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMjApO1xuXHRcdHZhciBnaWZzID0gSlNPTi5wYXJzZShvYmopO1xuXHRcdHZhciBnaWYgPSBnaWZzLmRhdGFbcmFuZG9tXS5pZDtcblx0XHR2YXIgdXJsR2lmID0gJ2h0dHA6Ly9pLmdpcGh5LmNvbS8zb3RQb3FaVVhPV1M0d054NGMuZ2lmJztcblx0XHR2YXIgdXJsID0gJ3VybChodHRwOi8vaS5naXBoeS5jb20vJyArIGdpZiArICcuZ2lmKSc7XG5cdFx0Y29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHVybDtcblx0fTtcblxufTtcbiIsImNvbnN0IHBhbmVsID0gKCkgPT4ge1xuXG5cdHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtfc2F2ZScpO1xuXG5cdGNvbnN0IHNhdmVCb29rbWFyayA9IChlKSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgYm9va21hcmsgPSB7XG5cdFx0XHR0aXRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0X3RpdGxlIGlucHV0JykudmFsdWUsXG5cdFx0XHR1cmw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dF9saW5rIGlucHV0JykudmFsdWUsXG5cdFx0XHRkZXNjcmlwdGlvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RleHRhcmVhX2Rlc2NyaXB0aW9uJykudmFsdWUsXG5cdFx0XHR0eXBlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidHlwZVwiXTpjaGVja2VkJykudmFsdWUsXG5cdFx0XHRmYXZvdXJpdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWRcblx0XHR9O1xuXG5cdFx0dmFyIGZhdm91cml0ZV9ib29rbWFya3MgPSBbXTtcblx0XHR2YXIgeXRfYm9va21hcmtzID0gW107XG5cdFx0dmFyIHdlYl9ib29rbWFya3MgPSBbXTtcblxuXHRcdGlmICghdmFsaWRhdGUoYm9va21hcmsudGl0bGUsIGJvb2ttYXJrLnVybCkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cbiAgICBpZiAoYm9va21hcmsuZmF2b3VyaXRlKSB7XG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm91cml0ZScpID09PSBudWxsKSB7XG4gICAgICAgIGZhdm91cml0ZV9ib29rbWFya3MucHVzaChib29rbWFyayk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvdXJpdGUnLCBKU09OLnN0cmluZ2lmeShmYXZvdXJpdGVfYm9va21hcmtzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYXZvdXJpdGVfYm9va21hcmtzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3VyaXRlJykpO1xuICAgICAgICBmYXZvdXJpdGVfYm9va21hcmtzLnB1c2goYm9va21hcmspO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3VyaXRlJywgSlNPTi5zdHJpbmdpZnkoZmF2b3VyaXRlX2Jvb2ttYXJrcykpO1xuICAgICAgfVxuICAgIH1cblxuXHRcdGlmIChib29rbWFyay50eXBlID09PSAneW91dHViZScpIHtcblxuXHRcdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5b3V0dWJlJykgPT09IG51bGwpIHtcblx0XHRcdFx0eXRfYm9va21hcmtzLnB1c2goYm9va21hcmspO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneW91dHViZScsIEpTT04uc3RyaW5naWZ5KHl0X2Jvb2ttYXJrcykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0eXRfYm9va21hcmtzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneW91dHViZScpKTtcblx0XHRcdFx0eXRfYm9va21hcmtzLnB1c2goYm9va21hcmspO1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneW91dHViZScsIEpTT04uc3RyaW5naWZ5KHl0X2Jvb2ttYXJrcykpO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmIChib29rbWFyay50eXBlID09PSAnd2ViJykge1xuXG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dlYicpID09PSBudWxsKSB7XG5cdFx0XHRcdHl0X2Jvb2ttYXJrcy5wdXNoKGJvb2ttYXJrKTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3dlYicsIEpTT04uc3RyaW5naWZ5KHl0X2Jvb2ttYXJrcykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0eXRfYm9va21hcmtzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2ViJykpO1xuXHRcdFx0XHR5dF9ib29rbWFya3MucHVzaChib29rbWFyayk7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd3ZWInLCBKU09OLnN0cmluZ2lmeSh5dF9ib29rbWFya3MpKTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGFsZXJ0U2F2ZUJvb2ttYXJrKCk7XG5cblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJykucmVzZXQoKTtcblxuXHR9O1xuXG5cdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVCb29rbWFyaywgZmFsc2UpO1xuXG59O1xuXG4vLyB2YWxpZGF0ZVxudmFyIHZhbGlkYXRlID0gKHRpdGxlLCB1cmwpID0+IHtcblx0aWYgKCF0aXRsZSB8fCAhdXJsKSB7XG5cdFx0YWxlcnQoJ1BsZWFzZSBmaWxsIGZvcm0nKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgZXhwcmVzc2lvbiA9IC9bLWEtekEtWjAtOUA6JV9cXCsufiM/Ji8vPV17MiwyNTZ9XFwuW2Etel17Miw0fVxcYihcXC9bLWEtekEtWjAtOUA6JV9cXCsufiM/Ji8vPV0qKT8vZ2k7XG5cdHZhciByZWdleCA9IG5ldyBSZWdFeHAoZXhwcmVzc2lvbik7XG5cdGlmICghdXJsLm1hdGNoKHJlZ2V4KSkge1xuXHRcdGFsZXJ0KCdQbGVhc2UgdXNlIGEgdmFsaWQgdXJsJyk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufTtcblxuLy8gYWxlcnQgYWZ0ZXIgc2F2ZSBib29rbWFya1xudmFyIGFsZXJ0U2F2ZUJvb2ttYXJrID0gKCkgPT4ge1xuXHR2YXIgYWxlcnRNc2cgPSBgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIiByb2xlPVwiYWxlcnRcIj5cbiAgICA8c3Ryb25nPldlbGwgZG9uZSE8L3N0cm9uZz4gWW91IHN1Y2Nlc3NmdWxseSByZWFkIHRoaXMgaW1wb3J0YW50IGFsZXJ0IG1lc3NhZ2UuXG4gIDwvZGl2PmA7XG5cblx0dmFyIGp1bWJvdHJvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qdW1ib3Ryb24gLmNvbnRhaW5lcicpO1xuXG5cdHZhciBhbGVydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRhbGVydC5jbGFzc05hbWUgPSBcImFsZXJ0TXNnXCI7XG5cdGFsZXJ0LmlubmVySFRNTCA9IGFsZXJ0TXNnO1xuXHRqdW1ib3Ryb24uYXBwZW5kQ2hpbGQoYWxlcnQpO1xuXG5cdGNvbnN0IHJlbW92ZUFsZXJ0ID0gKCkgPT4ge1xuXHRcdHZhciBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0TXNnJyk7XG5cdFx0ZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsZXJ0KTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0c2V0VGltZW91dCgoKSA9PiByZW1vdmVBbGVydCgpLCAyMDAwKTtcbn07XG4iLCJjb25zdCBmYXZvdXJpdGUgPSAoKSA9PiB7XG5cblx0Y29uc3QgYm9va21hcmtzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3VyaXRlJykpO1xuXHRjb25zdCBmYXZvdXJpdGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsYnVtIC5saXN0LWdyb3VwJyk7XG5cblx0Zm9yIChsZXQgYm9va21hcmsgb2YgYm9va21hcmtzKSB7XG5cblx0XHR2YXIgdGl0bGUgPSBib29rbWFyay50aXRsZTtcblx0XHR2YXIgdXJsID0gYm9va21hcmsudXJsO1xuXHRcdHZhciBkZXNjcmlwdGlvbiA9IGJvb2ttYXJrLmRlc2NyaXB0aW9uO1xuXG5cdFx0bGV0IGNvbnRlbnQgPSBgXG4gICAgPGEgaHJlZj1cIiR7dXJsfVwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPiR7dGl0bGV9PC9oNT5cbiAgICAgIDwvZGl2PlxuICAgICAgPHAgY2xhc3M9XCJtYi0xXCI+JHtkZXNjcmlwdGlvbn08L3A+XG5cbiAgICA8L2E+XG4gIGA7XG5cblx0XHRsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxpc3QuY2xhc3NOYW1lID0gXCJmYXZfZWxlbVwiO1xuXHRcdGxpc3QuaW5uZXJIVE1MID0gY29udGVudDtcblx0XHRmYXZvdXJpdGVMaXN0LmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdH1cblxufTtcbiIsIlxuY29uc3Qgd2ViID0gKCkgPT4ge1xuXG4gIGNvbnN0IGJvb2ttYXJrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dlYicpKTtcblx0Y29uc3Qgd2ViID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsYnVtIC5yb3cnKTtcblxuXHRmb3IgKGxldCBib29rbWFyayBvZiBib29rbWFya3MpIHtcblxuXHRcdHZhciB0aXRsZSA9IGJvb2ttYXJrLnRpdGxlO1xuXHRcdHZhciB1cmwgPSBib29rbWFyay51cmw7XG5cdFx0dmFyIGRlc2NyaXB0aW9uID0gYm9va21hcmsuZGVzY3JpcHRpb247XG5cblx0XHRsZXQgY29udGVudCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+XG4gICAgICAgIDxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4ke3RpdGxlfTwvaDQ+XG4gICAgICAgIDxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgICAgIDxhIGhyZWY9XCIke3VybH1cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkdvITwvYT5cbiAgICAgIDwvZGl2PlxuICBgO1xuXG5cdFx0bGV0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjYXJkLmNsYXNzTmFtZSA9IFwiY2FyZFwiO1xuXHRcdGNhcmQuaW5uZXJIVE1MID0gY29udGVudDtcblx0XHR3ZWIuYXBwZW5kQ2hpbGQoY2FyZCk7XG5cblxuXG5cdH1cblxufTtcbiIsImNvbnN0IHlvdXR1YmUgPSAoKSA9PiB7XG5cblx0Y29uc3QgZ2V0UGFyYW0gPSAodXJsKSA9PiB7XG5cdFx0bGV0IHBhcmFtcyA9IHVybC5zdWJzdHIoMjkpLnNwbGl0KCcmJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXJhbSA9IHBhcmFtc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0aWYgKHBhcmFtW2ldID09IFwiP3ZcIikge1xuXHRcdFx0XHRsZXQgbGluayA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgcGFyYW1bMV07XG5cdFx0XHRcdHJldHVybiBsaW5rO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRjb25zdCBib29rbWFya3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5b3V0dWJlJykpO1xuXHRjb25zdCBhbGJ1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGJ1bSAucm93Jyk7XG5cblx0Zm9yIChsZXQgYm9va21hcmsgb2YgYm9va21hcmtzKSB7XG5cblx0XHR2YXIgdGl0bGUgPSBib29rbWFyay50aXRsZTtcblx0XHR2YXIgdXJsID0gYm9va21hcmsudXJsO1xuXHRcdHZhciBsaW5rID0gZ2V0UGFyYW0odXJsKTtcblx0XHR2YXIgZGVzY3JpcHRpb24gPSBib29rbWFyay5kZXNjcmlwdGlvbjtcblxuXHRcdGxldCBjb250ZW50ID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ5dC1mcmFtclwiPlxuICAgICAgPGlmcmFtZSBzcmM9XCIke2xpbmt9XCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+XG4gICAgICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JHt0aXRsZX08L2g0PlxuICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICAgIDxhIGhyZWY9XCIke3VybH1cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPkdvITwvYT5cbiAgICA8L2Rpdj5cbiAgYDtcblxuXHRcdGxldCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y2FyZC5jbGFzc05hbWUgPSBcImNhcmRcIjtcblx0XHRjYXJkLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdFx0YWxidW0uYXBwZW5kQ2hpbGQoY2FyZCk7XG5cblx0fVxuXG59O1xuIiwiXG5jb25zdCBib2R5SUQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uaWQ7XG5cbi8vIGFjdGl2ZSBpdGVtIGluIG1lbnVcbmFjdGl2ZSgpO1xuXG4vLyBnZW5lcmF0ZSBnaXBoeVxuaWYgKGJvZHlJRCA9PT0gJ2hvbWUnKSB7XG4gIGdpcGh5KCk7XG59XG5cbi8vIHBhbmVsXG5pZiAoYm9keUlEID09PSAncGFuZWwnKSB7XG4gIHBhbmVsKCk7XG59XG5cbi8vIHlvdXR1YmUgYm9va21hcmtcbmlmIChib2R5SUQgPT09ICd5b3V0dWJlJykge1xuICB5b3V0dWJlKCk7XG59XG5cbi8vIHlvdXR1YmUgYm9va21hcmtcbmlmIChib2R5SUQgPT09ICdmYXZvdXJpdGUnKSB7XG4gIGZhdm91cml0ZSgpO1xufVxuXG4vLyB3ZWIgYm9va21hcmtcbmlmIChib2R5SUQgPT09ICd3ZWInKSB7XG4gIHdlYigpO1xufVxuIl19
