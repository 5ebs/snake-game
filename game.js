document.addEventListener('keydown', keyPressed);

let canvas = document.getElementById('game');
let scoreDisplay = document.getElementById('gameScore');
let c = canvas.getContext('2d');
const cell = 40;
const rows = 14;
const cols = 14;
canvas.height = rows * cell;
canvas.width = cols * cell;

let dir = {
	x: 0,
	y: 0
};
let snakeInitial = {
	x: rows * cell / 2,
	y: cols * cell / 2
};
let tail = [];
for (let i = 0; i < 3; i++) {
	tail.push({
		x: snakeInitial.x - i * cell,
		y: snakeInitial.y
	});
}
let apple = {
	x: snakeInitial.x + 2 * cell,
	y: snakeInitial.y
};
let score = 0;
let start = true;

function play() {
	setTimeout(() => {
		if (tail[0].x < 0 || tail[0].x === canvas.width || tail[0].y < 0 || tail[0].y === canvas.height) {
			tail = [];
			for (let i = 0; i < 3; i++) {
				tail.push({
					x: snakeInitial.x - i * cell,
					y: snakeInitial.y
				});
			}
			dir = {
				x: 0,
				y: 0
			};
			score = 0;
			start = true;
			while (inTail(apple)) {
				apple = {
					x: Math.floor(Math.random() * cols) * cell,
					y: Math.floor(Math.random() * rows) * cell
				};
			}
		}
		if (check(tail[0].x, tail[0].y)) {
			for (let i = 0; i < score; i++) {
				tail.pop();
			}
			score = 0;
		}
		if (tail[0].x === apple.x && tail[0].y === apple.y) {
			score++;
			tail.push({
				x: tail[tail.length - 1].x,
				y: tail[tail.length - 1].y
			});
			while (inTail(apple)) {
				apple = {
					x: Math.floor(Math.random() * cols) * cell,
					y: Math.floor(Math.random() * rows) * cell
				};
			}
		}
		if (!(dir.x === 0 && dir.y === 0))
			for (let t = tail.length - 1; t > 0; t--) {
				tail[t].x = tail[t - 1].x;
				tail[t].y = tail[t - 1].y;
				start = false;
			}
		tail[0].x += dir.x;
		tail[0].y += dir.y;
		c.clearRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = 'white';
		c.fillRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = 'rgb(240,40,0)';
		c.fillRect(apple.x + 1, apple.y + 1, cell - 2, cell - 2);
		for (let t in tail) {
			c.fillStyle = 'lime';
			c.fillRect(tail[t].x + 1, tail[t].y + 1, cell - 2, cell - 2);
		}
		scoreDisplay.innerHTML = `Score: ${score}`;
		requestAnimationFrame(play);
	}, 1000 / 10);
}
requestAnimationFrame(play);

function inTail(apple) {
	for (let t in tail) {
		if (apple.x === tail[t].x && apple.y === tail[t].y) {
			return true;
		}
	}
	return false;
}

function check(x, y) {
	for (let i = 2; i < tail.length; i++) {
		if (x === tail[i].x && y === tail[i].y) {
			return true;
		}
	}
	return false;
}


// Move the snake

function keyPressed(e) {
	switch (e.keyCode) {
		case 37:
			if (!start && dir.x !== cell)
				dir = {
					x: -cell,
					y: 0
				};
			break;
		case 38:
			e.preventDefault();
			if (dir.y !== cell)
				dir = {
					x: 0,
					y: -cell
				};
			break;
		case 39:
			if (dir.x !== -cell)
				dir = {
					x: cell,
					y: 0
				};
			break;
		case 40:
			e.preventDefault();
			if (dir.y !== -cell)
				dir = {
					x: 0,
					y: cell
				};
			break;
	}
}