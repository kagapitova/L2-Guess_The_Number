import {
	statments,
	start,
	failDown,
	failUp,
	glueOdd,
	glueEven,
	winCheat,
	winNormal,
	winHard,
	delay, noValue, newGame, penalty
} from './statments.js'; // импортируем состояния


const cluePlace = document.querySelector(".clues");
const resPlace = document.querySelector(".results");
const setBtn = document.querySelector('.set-interval__btn');
const inputFrom = document.querySelector('.from');
const inputTo = document.querySelector('.to');
const checkBtn = document.querySelector('.answer__btn');
const moves = document.getElementById('game__score');
const answer = document.querySelector('.answer');

const print_clues = function(text, elem, delay) {
	if(text.length > 0) {
		elem.innerHTML += text[0];
		disabledAll();
		setTimeout(
			function() {
				print_clues(text.slice(1), elem, delay);
			}, delay
		);
	}
}

function removeClueText() {
	cluePlace.textContent = '';
}
function removeResText() {
	resPlace.textContent = '';
}

setBtn.addEventListener('click',()=>{
	setInterval();
	statments.allMoves = 0;
	moves.innerText = 0;
});

function setInterval(){
	statments.numFrom = parseInt(inputFrom.value);
	statments.numTo = parseInt(inputTo.value);
	statments.hiddenNum = Math.floor(Math.random() * (statments.numTo - statments.numFrom + 1)) + statments.numFrom;
	console.log(statments.hiddenNum)
	console.log(statments.numTo);
	console.log(statments.numFrom);
	print_clues(start, cluePlace, delay);
	setTimeout(
		function() {
			removeClueText();
			enabledAll();
		}, statments.time
	);
}

checkBtn.addEventListener('click',()=>{
	resPlace.textContent = '';
	renderMoves()
	checkRes()
});

function checkRes() {
	if(!answer.value){
		print_clues(noValue, resPlace, delay);
		setTimeout(
			function() {
				removeResText()
				enabledAll();
			}, statments.time
		);
		enabledAll();
	} else if (answer.value > statments.numTo || answer.value < statments.numFrom){
		console.log(statments.numTo);
		console.log(statments.numFrom);
		print_clues(penalty, cluePlace, delay);
		setTimeout(
			function() {
				removeClueText()
				enabledAll();
			}, statments.time
		);
		enabledAll();
	} else if (answer.value > statments.hiddenNum){
		print_clues(failDown, resPlace, delay);
		setTimeout(
			function() {
				removeResText()
				enabledAll();
			}, statments.time
		);
		enabledAll();
	} else if (answer.value < statments.hiddenNum){
		print_clues(failUp, resPlace, delay);
		setTimeout(
			function() {
				removeResText()
				enabledAll();
			}, statments.time
		);
		enabledAll();
	} else if (parseInt(answer.value) === parseInt(statments.hiddenNum)){
			if(statments.allMoves === 1){
				print_clues(winCheat, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
						enabledAll();
					}, statments.time
				);
				print_clues(newGame, cluePlace, delay);
				setTimeout(
					function() {
						removeClueText()
						enabledAll();
					}, statments.time
				);
				enabledAll();
				resetStatments()
			} else if (statments.allMoves > 1 && statments.allMoves <= 10){
				print_clues(winNormal, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
						enabledAll();
					}, statments.bigTime
				);
				print_clues(newGame, cluePlace, delay);
				setTimeout(
					function() {
						removeClueText()
						enabledAll();
					}, statments.bigTime
				);
				resetStatments()
				enabledAll();
			} else if (statments.allMoves > 10){
				print_clues(winHard, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
						enabledAll();
					}, statments.bigTime
				);
				print_clues(newGame, cluePlace, delay);
				setTimeout(
					function() {
						removeClueText()
						enabledAll();
					}, statments.time
				);
				resetStatments()
				enabledAll();
			}
	}
}

function renderMoves(){
	statments.allMoves += 1;
	moves.innerText = statments.allMoves;
	if(statments.movesToClue < 2){
		statments.movesToClue += 1;
	} else {
		if(statments.hiddenNum % 2 === 0){
			print_clues(glueEven, cluePlace, delay);
			setTimeout(
				function() {
					removeClueText()
				}, statments.time
			);
			statments.movesToClue = 0;
		} else {
			print_clues(glueOdd, cluePlace, delay);
			setTimeout(
				function() {
					removeClueText()
				}, statments.time
			);
			statments.movesToClue = 0;
		}
	}
	console.log(statments.allMoves)
	console.log(statments.movesToClue)
}

function disableSetNumBtn(){
	setBtn.disabled = true;
}

function disableCheckNumBtn(){
	checkBtn.disabled = true;
}

function disabledAll(){
	disableSetNumBtn();
	disableCheckNumBtn();
}


function enableSetNumBtn(){
	setBtn.disabled = false;
}

function enableCheckNumBtn(){
	checkBtn.disabled = false;
}

function enabledAll(){
	enableCheckNumBtn();
	enableSetNumBtn();
}
function resetStatments(){
	statments.movesToClue = 0;
	statments.allMoves = 0;
	statments.numFrom = 0;
	statments.numTo = 0;
	statments.hiddenNum = 0;
	statments.currentNum = 0;
}