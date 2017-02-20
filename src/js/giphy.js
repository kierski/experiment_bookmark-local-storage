const giphy = () => {

	const URL = 'http://api.giphy.com/v1/gifs/search?q=glitch&api_key=dc6zaTOxFJmzC&limit=21';
	const req = new XMLHttpRequest();
	req.open('GET', URL, true);
	req.onreadystatechange = (aEvt) => {
		if (req.readyState == 4) {
			if (req.status == 200) {
				randomGIF(req.responseText);
			} else {
				console.log('Error');
			}
		}
	};
	req.send(null);

	const container = document.querySelector('.giphy');

	const randomGIF = (obj) => {
		var random = Math.ceil(Math.random() * 20);
		var gifs = JSON.parse(obj);
		var gif = gifs.data[random].id;
		var urlGif = 'http://i.giphy.com/3otPoqZUXOWS4wNx4c.gif';
		var url = 'url(http://i.giphy.com/' + gif + '.gif)';
		container.style.backgroundImage = url;
	};

};
