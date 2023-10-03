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


const gluePlace = document.querySelector(".clues");
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
		setTimeout(
			function() {
				print_clues(text.slice(1), elem, delay);
			}, delay
		);
	}
}

function removeGlueText() {
	gluePlace.textContent = '';
}
function removeResText() {
	resPlace.textContent = '';
}

setBtn.addEventListener('click',()=>{
	setInterval()
});

function setInterval(){
	statments.numFrom = parseInt(inputFrom.value);
	statments.numTo = parseInt(inputTo.value);
	statments.hiddenNum = Math.floor(Math.random() * (statments.numTo - statments.numFrom)) + statments.numFrom;
	console.log(statments.hiddenNum)
	print_clues(start, gluePlace, delay);
	setTimeout(
		function() {
			removeGlueText()
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
			}, statments.time
		);
	} else if (answer.value > statments.numTo || answer.value < statments.numFrom){
		print_clues(penalty, gluePlace, delay);
		setTimeout(
			function() {
				removeGlueText()
			}, statments.time
		);
	} else if (answer.value > statments.hiddenNum){
		print_clues(failDown, resPlace, delay);
		setTimeout(
			function() {
				removeResText()
			}, statments.time
		);
	} else if (answer.value < statments.hiddenNum){
		print_clues(failUp, resPlace, delay);
		setTimeout(
			function() {
				removeResText()
			}, statments.time
		);
	} else if (parseInt(answer.value) === parseInt(statments.hiddenNum)){
			if(statments.allMoves === 1){
				print_clues(winCheat, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
					}, statments.time
				);
				print_clues(newGame, gluePlace, delay);
				setTimeout(
					function() {
						removeGlueText()
					}, statments.time
				);
				resetStatments()
			} else if (statments.allMoves > 1 && statments.allMoves <= 10){
				print_clues(winNormal, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
					}, statments.bigTime
				);
				print_clues(newGame, gluePlace, delay);
				setTimeout(
					function() {
						removeGlueText()
						
					}, statments.bigTime
				);
				resetStatments()
			} else if (statments.allMoves > 10){
				print_clues(winHard, resPlace, delay);
				setTimeout(
					function() {
						removeResText()
					}, statments.bigTime
				);
				print_clues(newGame, gluePlace, delay);
				setTimeout(
					function() {
						removeGlueText()
					}, statments.time
				);
				resetStatments()
			}
	}
}

function renderMoves(){
	statments.allMoves += 1;
	moves.innerText = statments.allMoves;
	if(statments.mavesToGlue < 2){
		statments.mavesToGlue += 1;
	} else {
		if(statments.hiddenNum % 2 === 0){
			print_clues(glueEven, gluePlace, delay);
			setTimeout(
				function() {
					removeGlueText()
				}, statments.time
			);
			statments.mavesToGlue = 0;
		} else {
			print_clues(glueOdd, gluePlace, delay);
			setTimeout(
				function() {
					removeGlueText()
				}, statments.time
			);
			statments.mavesToGlue = 0;
		}
	}
	console.log(statments.allMoves)
	console.log(statments.mavesToGlue)
}

function resetStatments(){
	statments.mavesToGlue = 0;
	statments.allMoves = 0;
	statments.numFrom = 0;
	statments.numTo = 0;
	statments.hiddenNum = 0;
	statments.currentNum = 0;
}