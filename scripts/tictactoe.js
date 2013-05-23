/* Many thanks to Microsoft Developer Network (MSDN) for providing this script.
 * You can get this script from http://msdn.microsoft.com/en-us/library/ms537509(v = vs.85).aspx
 */
var row,
	column,
	board,
	userSpots,
	gameSpots,
	userSpot,
	gameSpot,
	xImageTag,
	oImageTag,
	emptySpots,
	wins,
	losses,
	draws,
	storagePrefix,
	difficulty,
	blots,
	lines;


Array.prototype.copyUnique = function() {
	this.sort();

	var a = new Array();
	a.push(this[0]);
	count = 0;
	for (i = 1; i < this.length; i++) {
		if (this[i] != a[a.length - 1]) {
			a.push(this[i]);
		}
	}
	return a;
}

function initBoard() {
	// Initialize board variables
	userSpot = 1;
	gameSpot = 0;
	row = column = 3;
	blots = new Array();
	lines = new Array();
	userSpots = new Array();
	gameSpots = new Array();
	board = new Array(row * column);
	xImageTag = "<img src='images/x_pic.png' />";
	oImageTag = "<img src='images/o_pic.png' />";
	storagePrefix = "ttt_";
	
	// Database
	if ('localStorage' in window && window['localStorage']!== null) {
		if (localStorage[storagePrefix + 'wins']) {
			wins = localStorage[storagePrefix + 'wins'];
		} else {
			wins = 0;
		}
		if (localStorage[storagePrefix + 'difficulty']) {
			difficulty = parseInt(localStorage[storagePrefix + 'difficulty']);
		} else {
			difficulty = 0;
		}
		if (localStorage[storagePrefix + 'losses']) {
			losses = localStorage[storagePrefix + 'losses'];
		} else {
			losses = 0;
		}
		if (localStorage[storagePrefix + 'draws']) {
			draws = localStorage[storagePrefix + 'draws'];
		} else {
			draws = 0;
		}
	} else {
		wins = 0;
		losses = 0;
		draws = 0;
	}
	
	// UI
	$('#wins').text(wins.toString());
	$('#losses').text(losses.toString());
	$('#draws').text(draws.toString());
	
	
}

function resetBoard() {
	// Clear each cell in the board
	for (i = 0; i < board.length; i++) {
		board[i] = -1;
		$("#cell-" + (i + 1).toString()).empty();
	}
	
	emptySpots = board.length;
	userSpots.splice(0, userSpots.length);
	gameSpots.splice(0, gameSpots.length);
	
	if (difficulty == 0) {
		difficulty = parseInt($('.selected').attr('id').substr(5));
	} else {
		// There is some value for difficulty in the DB
		// Use that to setup the UI for difficulty
		$('.selected').removeClass('selected');
		$('#diff-' + difficulty).addClass('selected');
	}
		
	$('#announcement').fadeOut('slow');
}

function clearRecords() {
	if ('localStorage' in window && window['localStorage']!== null) {
		wins   = 0;
		losses = 0;
		draws  = 0;
		if (localStorage[storagePrefix + 'wins']) 	delete localStorage[storagePrefix + 'wins'];
		if (localStorage[storagePrefix + 'losses']) delete localStorage[storagePrefix + 'losses'];
		if (localStorage[storagePrefix + 'draws']) 	delete localStorage[storagePrefix + 'draws'];
		updateRecordsAndInformationPanel(2);
	}
}

function registerUserMove(choice) {
	if (board[choice - 1] == -1) {
		board[choice - 1] = 1;
		userSpots.push(choice - 1);
		emptySpots = emptySpots - 1;
		return true;
	} else {
		return false
	}
}

function computerThinks() {
	if (lines.length > 0) lines.splice(0, lines.length);
	if (blots.length > 0) blots.splice(0, blots.length);
	var lookAhead = difficulty;
	var centre = 0;
	if (emptySpots == 9) {
		index = Math.round(Math.random() * board.length);
		if (index == board.length) index = Math.round(Math.random() * board.length);
		playAt(index);
		return index + 1;
	}
	if (gameSpots.length > 1) seekFor(gameSpot);
	switch (lookAhead) {
	case 2:
		var corners = [0, 2, 6, 8];
		var cardinals = [1, 3, 5, 7];
		var centre = 4;
		if (userSpots.length == 1) {
			if (board[centre] == 1) {
				possiblePlays = [1, 3, 7, 9];
				gameSpot = playFrom(corners);
				return gameSpot + 1;
			} else {
				for (i = 0;
				i < corners.length;
				i++) {
					if (board[corners[i]] == 1) {
						playAt(centre);
						return centre + 1;
					}
				}
				for (i = 0;
				i < cardinals.length;
				i++) {
					if (board[cardinals[i]] == 1) {
						gameSpot = playFrom(corners);
						return gameSpot + 1;
					}
				}
			}
		} else if (userSpots.length >= 2) {
			if (centre == 0) {
				if ((board[0] == 1 && board[8] == 1) || (board[2] == 1 && board[6] == 1)) {
					gameSpot = playFrom(cardinals);
					return gameSpot + 1;
				}
			}
			if (board[centre] == -1) {
				if ((board[0] == 1 && board[8] == 1) || (board[2] == 1 && board[0] == 1)) {
					playAt(centre);
					return centre + 1;
				}
			}
			if (board[0] == 1) {
				if (board[2] == 1 && board[1] == -1) {
					playAt(1);
					return 2;
				}
				if (board[6] == 1 && board[3] == -1) {
					playAt(3);
					return 4;
				}
			}
			if (board[2] == 1) {
				if (board[0] == 1 && board[1] == -1) {
					playAt(1);
					return 2;
				}
				if (board[8] == 1 && board[5] == -1) {
					playAt(5);
					return 6;
				}
			}
			if (board[6] == 1) {
				if (board[0] == 1 && board[3] == -1) {
					playAt(3);
					return 4;
				}
				if (board[8] == 1 && board[7] == -1) {
					playAt(7);
					return 8;
				}
			}
			if (board[8] == 1) {
				if (board[2] == 1 && board[5] == -1) {
					playAt(5);
					return 6;
				}
				if (board[6] == 1 && board[7] == -1) {
					playAt(7);
					return 8;
				}
			}
		}
	case 1:
		seekFor(userSpot);
		if (lines.length > 0) {
			gameSpot = playFrom(lines);
			return gameSpot + 1;
		} else if (blots.length > 0) {
			gameSpot = playFrom(blots);
			return gameSpot + 1;
		}
	case 0:
	default:
		for (i = 0;
		i < row;
		i++) {
			for (j = 0;
			j < column;
			j++) {
				spot = row * (i) + j;
				if (board[spot] == -1) {
					playAt(spot);
					return spot + 1;
				}
			}
		}
	}
	function goUp(x, y, step) {
		return (x - step >= 0) ? row * (x - step) + y : centre;
	}
	function goLeft(x, y, step) {
		return (y - step >= 0) ? row * (x) + (y - step) : centre;
	}
	function goDown(x, y, step) {
		return (x + step < row) ? row * (x + step) + y : centre;
	}
	function goRight(x, y, step) {
		return (y + step < column) ? row * (x) + (y + step) : centre;
	}
	function seekFor(piece) {
		for (i = 0;
		i < row;
		i++) {
			for (j = 0;
			j < column;
			j++) {
				centre = row * (i) + j;
				step = 1;
				if (board[centre] == piece) {
					seekCardinal(i, j, step, goLeft, piece);
					seekCardinal(i, j, step, goRight, piece);
					seekCardinal(i, j, step, goUp, piece);
					seekCardinal(i, j, step, goDown, piece);
					seekCorner(i, j, step, goUp, goRight, piece);
					seekCorner(i, j, step, goUp, goLeft, piece);
					seekCorner(i, j, step, goDown, goRight, piece);
					seekCorner(i, j, step, goDown, goLeft, piece);
				}
			}
		}
	}
	function seekCorner(x, y, range, func1, func2, lookingFor) {
		if (func1 == func2) {
			alert("The CPU has been handicapped!");
			return -1;
		}
		firstStepNear = func1(x, y, range);
		firstStepNear_x = Math.floor(firstStepNear / row);
		firstStepNear_y = firstStepNear % row;
		secondStepNear = func2(firstStepNear_x, firstStepNear_y, range);
		if (secondStepNear!= centre) {
			if (board[secondStepNear] == lookingFor) {
				firstStepFar = func1(i, j, range + 1);
				if (firstStepFar!= centre) {
					firstStepFar_x = Math.floor(firstStepFar / row);
					firstStepFar_y = firstStepFar % column;
					secondStepFar = func2(firstStepFar_x, firstStepFar_y, range + 1);
					if (board[secondStepFar] == -1) {
						lines.push(secondStepFar);
					}
				}
			} else if (board[secondStepNear] == -1) {
				blots.push(secondStepNear);
			}
		}
	}
	function seekCardinal(x, y, range, func, lookingFor) {
		near = func(x, y, range);
		if (near!= centre) {
			if (board[near] == lookingFor) {
				far = func(x, y, range + 1);
				if (board[far] == -1) {
					lines.push(far);
				}
			} else if (board[near] == -1) {
				blots.push(near);
			}
		}
	}
	function playAt(spot) {
		board[spot] = 0;
		gameSpots.push(spot);
		emptySpots = emptySpots - 1;
	}
	function playFrom(playOptions) {
		a = playOptions.copyUnique();
		aLen = a.length;
		index = Math.round(Math.random() * aLen);
		if (index >= aLen) {
			if (aLen == 1) {
				index = 0;
			} else {
				index = Math.round(Math.random() * aLen - 1);
			}
		}
		spotToPlay = a[index];
		playAt(spotToPlay);
		return spotToPlay;
	}
}

function gameplay() {
	var o_spot = computerThinks();
	$("#cell-" + o_spot.toString())
		.append(oImageTag)
		.addClass("cell");
	if (gameWon(gameSpots)) {
		updateRecordsAndInformationPanel(0);
		return;
	} else if (gameOver()) {
		updateRecordsAndInformationPanel(-1);
		return;
	}
}

function gameOver() {
	return (emptySpots == 0);
}
function gameWon(playerGrid) {
	won = false;
	playerGrid.sort();
	if (playerGrid.length >= 3) {
		position = 0;
		for (position;
		playerGrid.length;
		position = position + 1) {
			if (playerGrid.length - position < row) break;
			winningRow = x = Math.floor(playerGrid[position] / row);
			winningColumn = y = playerGrid[position] % row;
			verticalCount = 1;
			horizontalCount = 1;
			positiveDiagonalCount = (x == y) ? 1 : 0;
			negativeDiagonalCount = (row - x - 1 == y) ? 1 : 0;
			for (streak = position + 1;
			streak < playerGrid.length;
			streak++) {
				x = Math.floor(playerGrid[streak] / row);
				y = playerGrid[streak] % row;
				if (x == winningRow) horizontalCount++;
				if (y == winningColumn) verticalCount++;
				if (x == y) positiveDiagonalCount++;
				if (row - x - 1 == y) negativeDiagonalCount++;
			}
			if (verticalCount == 3 || horizontalCount == 3 || positiveDiagonalCount == 3 || negativeDiagonalCount == 3) return true;
		}
	}
	return false;
}

function updateRecordsAndInformationPanel(winner) {
	if (winner == 1) {
		wins++;
		emptySpots = 0;
		$('#announcement')
			.text('You win !');
	} else if (winner == 0) {
		losses++;
		emptySpots = 0;
		$('#announcement')
			.text('You lose :(');
	} else if (winner == -1) {
		draws++;
		$('#announcement')
			.text('It\'s a tie ( ._.)');
	}
	if ('localStorage' in window && window['localStorage']!== null) {
		localStorage[storagePrefix + 'wins'] = wins;
		localStorage[storagePrefix + 'losses'] = losses;
		localStorage[storagePrefix + 'draws'] = draws;
	}
	
	// refresh the scoreboard
	$('#wins').text(wins.toString());
	$('#losses').text(losses.toString());
	$('#draws').text(draws.toString());
	
	if (winner <= 1 && winner >= -1) $('#announcement').fadeIn(2000);
}

function getInternetExplorerVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
	}
	return rv;
}

$(document).ready(function() {
	initBoard();
	resetBoard();
	$(".cell")
		.click(function() {
		var winner;
		if (gameOver());
		else {
			var freeSpot = registerUserMove(parseInt($(this)
				.attr("id")
				.substr(5)));
			if (freeSpot) {
				$(this)
					.append(xImageTag);
				if (gameWon(userSpots)) {
					updateRecordsAndInformationPanel(1);
					return;
				} else if (gameOver()) {
					updateRecordsAndInformationPanel(-1);
					return;
				}
				thinkTime = setTimeout("gameplay()", difficulty * 200);
			}
		}
	});
	$('#mainNav li[name = new game]')
		.click(function() {
		resetBoard();
	});
	$('#mainNav li[name = reset]')
		.click(function() {
		resetBoard();
		clearRecords();
	});
	
	// Respond to difficulty changes
	$('#difficulty > li').click(function() {
		
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		
		if (emptySpots == 9) {
			difficulty = parseInt($('.selected')
				.attr('id')
				.substr(5));
		} else {
			$('#announcement')
				.text('Click \'New Game\' to effect changes');
			$('#announcement')
				.fadeIn('slow');
		}
		
		// Store the difficulty in the database
		localStorage[storagePrefix + 'difficulty'] = difficulty;
	});
	
	// Ostracize IE
	if (getInternetExplorerVersion()!= -1) {
		document.getElementById('mainNav')
			.style.display = 'none';
		document.getElementById('itsme')
			.style.display = 'none';
		document.getElementById('itsmeagain')
			.style.display = 'none';
		document.getElementById('container')
			.style.display = 'none';
		document.getElementById('mmenu1')
			.style.display = 'none';
		document.getElementById('mmenu2')
			.style.display = 'none';
		$('#inyourface')
			.text("Download Chrome, Firefox or Safari.")
			.css({
			'font': 'bold',
			'color': 'white',
			'border': '2px solid red',
			'font-size': '40px'
		});
	}
});
