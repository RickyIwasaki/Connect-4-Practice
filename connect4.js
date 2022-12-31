class Node{
    constructor(GAME, prev, next){
        this.GAME = GAME;
        this.prev = prev;
        this.next = next;
    }
}
class Game{
    constructor(WIDTH, HEIGHT, ...gamePlayers){
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;

        this.gamePlayers = [...gamePlayers];
        this.currPlayer = this.gamePlayers[Math.floor(Math.random() * this.gamePlayers.length)];

        this.board = [];
        this.table = document.createElement('table');
        this.makeBoard();
        this.makeHTMLBoard();
    }
    makeBoard(){
        for(let y = 0; y < this.HEIGHT; y++){
            this.board.push(Array.from( { length: this.WIDTH } ));
        }
    }
    makeHTMLBoard(){
        const games = document.querySelector('#games');
        this.table.classList.add('p-2');
        this.table.classList.add('m-2');
        this.table.classList.add('float-left');
        this.table.classList.add('bg-2');
        games.insertBefore(this.table, games.firstChild);

        const topTr = document.createElement('tr');
        this.table.appendChild(topTr);
        this.handleTopClick = this.handleTopClick.bind(this);
        topTr.addEventListener('click', this.handleTopClick);
        for(let x = 0; x < this.WIDTH; x++){
            const topCell = document.createElement('td');
            topCell.setAttribute('id', x);
            topTr.appendChild(topCell);
            topCell.classList.add('w-50px');
            topCell.classList.add('h-50px');
            topCell.classList.add('border-1');
            topCell.classList.add('box-shadow-5');
            topCell.classList.add('bga-3');
        }

        for(let y = 0; y < this.HEIGHT; y++){
            const row = document.createElement('tr');
            for(let x = 0; x < this.WIDTH; x++){
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.appendChild(cell);
                cell.classList.add('w-50px');
                cell.classList.add('h-50px');
                cell.classList.add('border-1');
            }
            this.table.appendChild(row);
        }
    }
    findSpotForCol(x){
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
              return y;
            }
          }
          return null;
    }
    placeInTable(y, x){
        const coin = document.createElement('div');
        coin.classList.add('w-50px');
        coin.classList.add('h-50px');
        coin.classList.add('round-50');
        coin.classList.add('pos-relative');
        coin.style.backgroundColor = this.currPlayer.color;
        coin.style.boxShadow = `${this.currPlayer.color} 0 0 5px 2px`;
        newAnimation(`
            @keyframes dropCoin{
                from {top: ${-(y + 1) * 52}px;}
                to {top: 0;}
            }
            .anima-1{
                animation-name: dropCoin;
                animation-duration: 1s;
            }
        `);
        coin.classList.add('anima-1');
        const topCell = this.table.querySelectorAll('tr')[y + 1].querySelectorAll('td')[x];
        topCell.appendChild(coin);
    }
    endGame(){
        this.table.parentElement.removeChild(this.table);
        const footer = document.querySelector('#footer');
        let currPlayerIndex;
        Array.from(footer.children).some((div, i) => {
            if(div.firstChild.textContent === this.currPlayer.name){
                currPlayerIndex = i;
                return true;
            }
            return false;
        });
        footer.children[currPlayerIndex].lastChild.textContent = ++players[currPlayerIndex].score;
        alert('game finished');
    }
    handleTopClick(event){
        const x = +event.target.id;
        this.findSpotForCol = this.findSpotForCol.bind(this);
        const y = this.findSpotForCol(x);
        if(y === null){
            return;
        }
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if(this.checkForWin()){
            return this.endGame();
        }
        if(this.board.every((row) => row.every(cell => cell))){
            return this.endGame();
        }

        let nextPlayerIndex;
        this.gamePlayers.some((player, i) => {
            if(player === this.currPlayer){
                nextPlayerIndex = i + 1;
                return true;
            }
            return false;
        });
        if(nextPlayerIndex === this.gamePlayers.length){
            this.currPlayer = this.gamePlayers[0];
        }
        else{
            this.currPlayer = this.gamePlayers[nextPlayerIndex];
        }
    }
    checkForWin(){
        const _win = (cells) => cells.every(([y, x]) => 
            y >= 0 &&
            y < this.HEIGHT &&
            x >= 0 &&
            x < this.WIDTH &&
            this.board[y][x] === this.currPlayer
        );

        for(let y = 0; y < this.HEIGHT; y++){
            for(let x = 0; x < this.WIDTH; x++){
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }
}
class Player{
    constructor(name, color){
        this.name = name;
        this.color = color;
    }
}

















// //later add game dimension inputs
// const dispGameForm = () => {
//     if(players.length >= 2){
//         const form = document.querySelector('#game-form');
//         const formCover = document.querySelector('#form-cover');
//         if(form.classList.contains('display-none')){
//             form.classList.remove('display-none');
//             formCover.classList.remove('display-none');

//             formCover.classList.remove('display-none');
//             formCover.addEventListener('click', () => {
//                 form.classList.add('display-none');
//                 formCover.classList.add('display-none');
//             });
//             window.addEventListener('keydown', (event) => {
//                 if(event.key === 'Escape'){
//                     form.classList.add('display-none');
//                     formCover.classList.add('display-none');
//                 }
//             });
//         }
//         else{
//             form.classList.add('display-none');
//             formCover.classList.remove('display-none');
//         }
//     }
//     else{
//         alert('add more players');
//     }
// };
// const dispPlayerForm = () => {
//     const form = document.querySelector('#player-form');
//     const formCover = document.querySelector('#form-cover');
//     if(form.classList.contains('display-none')){
//         form.querySelector('#new-name').setAttribute('placeholder', `player ${players.length + 1}`);
//         form.classList.remove('display-none');

//         formCover.classList.remove('display-none');
//         formCover.addEventListener('click', () => {
//             form.classList.add('display-none');
//             formCover.classList.add('display-none');
//         });
//         window.addEventListener('keydown', (event) => {
//             if(event.key === 'Escape'){
//                 form.classList.add('display-none');
//                 formCover.classList.add('display-none');
//             }
//         });
//     }
//     else{
//         form.classList.add('display-none');
//         formCover.classList.remove('display-none');
//     }
// };

// let headGame = null;
// const newGame = (event) => {
//     try{
//         event.preventDefault();
//     }
//     catch(error){}
//     const form = document.querySelector('#game-form');
//     const formSelector = form.querySelectorAll('select');
//     if(formSelector[0].selectedIndex !== formSelector[1].selectedIndex){
//         const p1 = players[formSelector[0].selectedIndex];
//         const p2 = players[formSelector[1].selectedIndex];
//         const newPlayer1 = new Player(p1.name, p1.color);
//         const newPlayer2 = new Player(p2.name, p2.color);
//         const newGame = new Game(7, 6, newPlayer1, newPlayer2);
//         if(headGame === null){
//             headGame = new Node(newGame, null, null);
//         }
//         else{
//             const temp = headGame;
//             headGame = new Node(newGame, null, temp);
//             temp.prev = headGame;
//         }

//         const formCover = document.querySelector('#form-cover');
//         form.classList.add('display-none');
//         formCover.classList.add('display-none');
//     }
//     else{
//         alert('Please select two different players');
//     }
// };
// let players = [];
// const addPlayer = (event) => {
//     try{
//         
//     }
//     catch(error){}
//     const newName = document.querySelector('#new-name');
//     const newColor = document.querySelector('#new-color');
//     const name = newName.value? newName.value: `player ${players.length + 1}`;
//     const color = newColor.value;

//     if(players.every((obj) => obj.name !== name)){
//         // only works with one type of color checking ex: rgb, hex, hsl, hsv
//         if(players.every((obj) => obj.color !== color)){
//             players[players.length] = {name: name, color: color, score: 0};

//             const form = document.querySelector('#player-form');
//             const formCover = document.querySelector('#form-cover');
//             form.classList.add('display-none');
//             formCover.classList.add('display-none');
        
//             const footer = document.querySelector('#footer');
//             const newDiv = document.createElement('div');
//             footer.appendChild(newDiv);
//             newDiv.classList.add('w-90px');
//             newDiv.classList.add('h-90px');
//             newDiv.classList.add('float-left');
//             newDiv.classList.add('text-center'); 
//             newDiv.setAttribute('style', `background-color: ${color};`);
//             const newP1 = document.createElement('p');
//             newDiv.appendChild(newP1);  
//             newP1.classList.add('c-1');
//             newP1.classList.add('text-shadow-1');
//             newP1.textContent = name;
//             const newP2 = document.createElement('p');
//             newDiv.appendChild(newP2);
//             newP2.classList.add('c-1');
//             newP2.classList.add('text-shadow-1');
//             newP2.textContent = '0';
            
//             const gameForm = document.querySelector('#game-form');
//             const formSelect = gameForm.querySelectorAll('select');
//             const newOption1 = document.createElement('option');
//             const newOption2 = document.createElement('option');
//             formSelect[0].appendChild(newOption1);
//             formSelect[1].appendChild(newOption2);
//             newOption1.textContent = name;
//             newOption2.textContent = name;
//             newName.value = '';
//         }
//         else{
//             alert('this color already exists');
//         }
//     }
//     else{
//         alert('this name already exists');
//     }
// };


// // menu buttons
// const newGameBtn = document.querySelectorAll('#new-game-btn');
// newGameBtn.forEach((btn) => {
//     btn.addEventListener('click', dispGameForm);
// });
// const gameFormSubmitBtn = document.querySelector('#game-form').querySelector('button');
// gameFormSubmitBtn.addEventListener('click', newGame);

// const newPlayerBtn = document.querySelectorAll('#add-player-btn');
// newPlayerBtn.forEach((btn) => {
//     btn.addEventListener('click', dispPlayerForm);
// });
// const playerFormSubmitBtn = document.querySelector('#player-form').querySelector('button');
// playerFormSubmitBtn.addEventListener('click', addPlayer);



// solve game display done
// solve coin display 












