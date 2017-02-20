
const bodyID = document.getElementsByTagName("body")[0].id;

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
