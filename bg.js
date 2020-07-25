const body = document.querySelector("body");

const IMG_Number = 4;
//그림의 갯수.

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/image${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_Number);
  //floor는 버림, ceiling은 올림.

  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}
init();
