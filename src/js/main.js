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
	delay, noValue, newGame, penalty, setHiddenNum
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
	const isClueElem = elem.classList.contains('clues');
	isClueElem
		? clearInterval(statments.timeouts.clue)
		: clearInterval(statments.timeouts.res);
	
	if(text.length > 0) {
		elem.innerHTML += text[0];
		const timeoutId = setTimeout(
			function() {
				print_clues(text.slice(1), elem, delay);
			}, delay
		);
		
		isClueElem
			? statments.timeouts.clue = timeoutId
			: statments.timeouts.res = timeoutId;
	}
}

function removeClueText() {
	cluePlace.textContent = '';
}
function removeResText() {
	resPlace.textContent = '';
}

function removeTexts() {
	removeClueText();
	removeResText();
}

setBtn.addEventListener('click',()=>{
	resetStatments();
	setInterval();
	statments.allMoves = 0;
	moves.innerText = 0;
});

function setInterval() {
	removeTexts();
	statments.numFrom = parseInt(inputFrom.value);
	statments.numTo = parseInt(inputTo.value);
	setHiddenNum();
	print_clues(start, cluePlace, delay);
}

checkBtn.addEventListener('click',()=>{
	resPlace.textContent = '';
	renderMoves()
	checkRes()
});

function checkRes() {
	removeTexts();
	if(!answer.value){
		print_clues(noValue, resPlace, delay);
	} else if (answer.value > statments.numTo || answer.value < statments.numFrom){
		print_clues(penalty, cluePlace, delay);
	} else if (answer.value > statments.hiddenNum){
		print_clues(failDown, resPlace, delay);
	} else if (answer.value < statments.hiddenNum){
		print_clues(failUp, resPlace, delay);
	} else if (parseInt(answer.value) === parseInt(statments.hiddenNum)){
			if(statments.allMoves === 1){
				print_clues(winCheat, resPlace, delay);
				print_clues(newGame, cluePlace, delay);
				resetStatments()
			} else if (statments.allMoves > 1 && statments.allMoves <= 10){
				print_clues(winNormal, resPlace, delay);
				print_clues(newGame, cluePlace, delay);
				resetStatments()
			} else if (statments.allMoves > 10){
				print_clues(winHard, resPlace, delay);
				print_clues(newGame, cluePlace, delay);
				resetStatments()
			}
	}
}

function renderMoves() {
	removeTexts();
	statments.allMoves += 1;
	moves.innerText = statments.allMoves;
	if(statments.movesToClue < 2){
		statments.movesToClue += 1;
	} else {
		if(statments.hiddenNum % 2 === 0){
			print_clues(glueEven, cluePlace, delay);
			statments.movesToClue = 0;
		} else {
			print_clues(glueOdd, cluePlace, delay);
			statments.movesToClue = 0;
		}
	}
}

function resetStatments(){
	statments.movesToClue = 0;
	statments.allMoves = 0;
	statments.numFrom = 0;
	statments.numTo = 0;
	statments.hiddenNum = 0;
	statments.currentNum = 0;
}

setInterval();