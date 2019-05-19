const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

const grid = () => Array.from(document.getElementsByClassName('q'));

const enableListener = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));

const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));

const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '');

const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;


const clickFn = ($event) => {
    takeTurn(qNumId($event.target), 'x');
    if (!checkForVictory())
        opponentTurn();
};

const endGame = (winningSequence) => {
    console.log(winningSequence)
    winningSequence.forEach(_qEl => _qEl.classList.add('winner'))
    disableListener();
};
const opponentTurn = () => {
    disableListener();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if (!checkForVictory())
            enableListener();
    }, 1000);
}

const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(_c=>{
        const _grid =grid();
        console.log([_grid[_c[0]],_grid[_c[1]],_grid[_c[2]]])
        const sequence = [_grid[_c[0]],_grid[_c[1]],_grid[_c[2]]];
        if(allSame(sequence)){
            victory = true;
            endGame(sequence)
        }
    })
return victory;
}

const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const disableListener = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));

enableListener();