export const start = 'Number selected';
export const failDown = 'Number is smaller, try again';
export const failUp = 'Number is bigger, try again';
export const glueOdd = ' Number is Оdd';
export const glueEven = ' Number is Even';
export const winCheat = 'Win on the first try! Are you a cheater or extrasensory individual?';
export const winNormal = 'You win!';
export const winHard = 'Finally... you managed to guess!';
export const noValue = 'Where is you answer?!';
export const newGame = 'For a new game set new interval.';

export const penalty = 'Check the INTERVALS, PLEASE!';

export const delay = 100;

export const statments = {
	movesToClue: 0,
	allMoves: 0,
	numFrom: 0,
	numTo: 0,
	hiddenNum: 0,
	currentNum: 0,
	timeouts: {
		res: null,
		clue: null
	}
}

export function setHiddenNum() {
	statments.hiddenNum = Math.floor(Math.random() * (statments.numTo - statments.numFrom + 1)) + statments.numFrom;
}