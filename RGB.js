var numSquares = 6;
var colors = [];
var pickedColor;
var header = document.querySelector("#header");
var rgb = document.getElementById("rgb");
var reset = document.querySelector("#reset");
var message = document.getElementById("message");
var modeBtns = document.querySelectorAll(".mode");
var background = document.querySelector("body");
var squares = document.querySelectorAll(".square");

init();

function init() {
	setModeBtns();
	resetGame();
	setSquares();
}

function setModeBtns() {
	for (var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function () {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			// 3 squares will be visible in easy mode and 6 in hard mode
			this.textContent === "EASY" ? numSquares = 3 : numSquares = 6
			resetGame();
		});
	}
}

function resetGame() {
	//change header background to random colour
	header.style.backgroundColor = randomColor();
	// changing the background
	background.style.backgroundColor = randomColor();
	// new colours of blocks
	colors = generateRandomColors(numSquares);
	//pick random colour for initialisation
	pickedColor = pickColor();
	//change rgb to match pickedColor
	rgb.textContent = pickedColor;
	//change colours of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		// in easy game, only 3 squares will be visible
		else {
			squares[i].style.display = "none";
		}
	}
	//text should be new colours
	reset.textContent = "PLAY AGAIN";
}

reset.addEventListener("click", function () {
	resetGame();
});

function setSquares() {
	for (var i = 0; i < squares.length; i++) {
		// add initial colours to squares
		squares[i].style.backgroundColor = colors[i];

		// add event listeners to the squares
		squares[i].addEventListener("click", function () {
			// grab colour of pickedColor
			var clickedColor = this.style.backgroundColor;

			// compare colour to pickedColor 
			if (clickedColor === pickedColor) {
				for (var i = 0; i < squares.length; i++) {
					squares[i].style.backgroundColor = pickedColor;
				}
				header.style.backgroundColor = pickedColor;
				message.textContent = "CORRECT!";
				//reset text should be play again
				reset.textContent = "PLAY AGAIN!";
			} else {
				this.style.backgroundColor = background.style.backgroundColor;
				message.textContent = "WRONG!! TRY AGAIN!";
			}
		});
	}

}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// to generate random colours for the squares
function generateRandomColors(num) {
	//make an array
	var arr = [];

	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		randc = randomColor();
		// so that block and the background colour are not same
		while (randc == background.style.backgroundColor) {
			randc = randomColor();
		}
		arr.push(randc);
	}
	return arr;
}

// to return random colour in proper format
function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	// spaces after , are important
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

