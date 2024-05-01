const allCells = document.querySelectorAll(".border1");
const aiPlayer = 'O';
const huPlayer = 'X';
let availSpots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const restartButton = document.getElementById("restart");
startGame(); //starting the game
allCells.forEach(cell => cell.addEventListener('click', playerTurn)); // click event for every table cell
document.getElementById("table").style.height = document.getElementById("table").clientWidth + "px"; // making the table square
restartButton.addEventListener('click', startGame); // restarting the board
function checkTie(){
	a = board.filter(e => typeof(e) === 'number');
	if(a.length === 0 && !checkWin(huPlayer, board)){
		alert('Game Tie');
		return true;
	}
	return false;
}
function playerTurn(){
	makeMove(huPlayer, board);
}
function gameWin(player, brd){
		let win = [];
		let wins = [[0, 1, 2],	[3, 4, 5],	[6, 7, 8],		[0, 3, 6],		[1, 4, 7],		[2, 5, 8],		[0, 4, 8],		[2, 4, 6]];
		let plays = [];
		let l = brd.length;
		for(let i = 0; i<l; i++){
			if(brd[i] === player) plays.push(i);
		}
		for(let j of wins){
			for(let i of j){
				if(plays.indexOf(i) !== -1) win.push(i);
			}
			if(win.length === 3){
				return true;
			}
			win = [];
		}
	return false;
}
function checkWin(player, brd){
		let win = [];
		let wins = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],	[2, 4, 6]
		]; // all the variants of wins
		let plays = [];
		for(let i = 0; i<brd.length; i++){
			if(brd[i] === player) plays.push(i);
		}
		for(let j of wins){
		for(let i of j){
			if(plays.indexOf(i) !== -1) win.push(i);
		}
		if(win.length === 3){
			for(let i of win) {
				allCells[i].style.backgroundColor = 'blue';
			}
			return true;
		}
		win = [];
		}
return false;
}
function declareWinner(who){
	if(checkWin(who, board)){
	(who === huPlayer) ? alert('Game win!!!!') : alert('Game lose!!!');
	}
}

function startGame(){
	for(let i = 0; i<9; i++){
		allCells[i].innerHTML = '';
		availSpots[i] = i;
		board[i] = i;
		allCells[i].style.backgroundColor = "yellow";
	}
}
function makeMove(player, newbrd){
	if(player === huPlayer){
	var currentCell = parseInt(event.target.id);
	var addToken = document.getElementById(`${currentCell}`);
		if(addToken.innerHTML !== 'X' && addToken.innerHTML !== 'O') {
			if((!checkWin(huPlayer, board) && !checkWin(aiPlayer, board)) && !checkTie()){
				addToken.style.color = 'red';
				addToken.innerHTML = player;
				board[currentCell] = player;
				availSpots = availSpots.filter(value => value !== currentCell);
				if(!checkWin(huPlayer, board) && !checkTie()) makeMove(aiPlayer, board);
			}
			else 
			{
				allCells.forEach(cell => cell.removerEventListener('click', playerTurn));
			}
		}
	}
	else{
		let theCell = minimax(board, aiPlayer).index;
		let addAi = document.getElementById(`${theCell}`);
		addAi.style.color = "lime";
		addAi.innerHTML = player;
		board[theCell] = player;
		availSpots = availSpots.filter(value => value !== theCell);
	}
	declareWinner(player);
}

function minimax(nBoard, ply){
	let avail = nBoard.filter(f => typeof(f) === 'number');
	if(gameWin(aiPlayer, nBoard)) return { score: 10};
	else if(gameWin(huPlayer, nBoard)) return { score: -10};
	else if(avail.length === 0) return {score: 0};
	let moves = [];
	for(let i = 0; i < avail.length; i++){
		let move = {};
		move.index = nBoard[avail[i]];
		nBoard[avail[i]] = ply;
		if(ply === aiPlayer){
			let result = minimax(nBoard, huPlayer);
			move.score = result.score;
		}
		else{
			let result = minimax(nBoard, aiPlayer);
			move.score = result.score;
		}
		nBoard[avail[i]] = move.index;
		moves.push(move);
	}
	let bestMove;
	if(ply === aiPlayer){
		let bestScore = -10000;
		let m = moves.length;
		for(let i = 0; i < m; i++){
			if(bestScore < moves[i].score){
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}	
	else{
		let bestScore = 10000;
		let m = moves.length;
		for(let i = 0; i < m; i++){
			if(bestScore > moves[i].score){
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}