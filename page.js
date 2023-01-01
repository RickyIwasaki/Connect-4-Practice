const toggleDisp = (tag) => {
    if(tag.classList.contains('display-none')){
        tag.classList.remove('display-none');
    }
    else{
        tag.classList.add('display-none');
    }
}

let newStyle = document.createElement('style');
document.head.appendChild(newStyle);
newStyle.rel = 'stylesheet';
const newAnimation = (body) => {
    newStyle.innerHTML = body;
}


// window
const toggleNavBarTags = () => {
    const navBar = document.querySelector('#nav-bar');
    const menuIconIndex = navBar.children.length - 1;
    for(let i = 1; i < menuIconIndex; i++){
        if(innerWidth < 859){
            navBar.children[i].classList.add('display-none');
        }
        else{
            navBar.children[i].classList.remove('display-none');
        }
    }

    if(innerWidth < 233 || 859 <= innerWidth){
        navBar.children[menuIconIndex].classList.add('display-none');
    }
    else{
        navBar.children[menuIconIndex].classList.remove('display-none');
    }
}
window.addEventListener('resize', toggleNavBarTags);


// nav bar // side bar
const sideBarIconBtn = document.querySelector('#side-bar-icon-btn');
const sideBarCover = document.querySelector('#side-bar-cover');
[sideBarIconBtn, sideBarCover].forEach((tag) => {
    tag.addEventListener('click', () => {
        const sideBar = document.querySelector('#side-bar');
        toggleDisp(sideBar);
    });
});

const changeSideBarTagAnim = (action, i) => {
    clearInterval(sideBarTagsAnimPer[i].interval);
    sideBarTagsAnimPer[i].interval = setInterval(() => {
        sideBarTagsAnimPer[i].per += action;

        const colors = ['hsl(4, 100%, 46%)', 'hsl(217, 18%, 18%)'];
        const bgImage = `linear-gradient(to right, ${colors[0]}, ${colors[1]} ${sideBarTagsAnimPer[i].per}%)`;
        sideBarTags[i].style.backgroundImage = bgImage;

        if(sideBarTagsAnimPer[i].per <= 0 || 100 <= sideBarTagsAnimPer[i].per){
            sideBarTagsAnimPer[i].per = 50 + 50 * action;
            clearInterval(sideBarTagsAnimPer[i].interval);
        }
    }, 3);
};
const sideBarTagsAnimPer = [];
const sideBarTags = document.querySelectorAll('#side-bar-tags p');
sideBarTags.forEach((tag, i) => {
    sideBarTagsAnimPer[i] = {per: 0, interval: null};

    tag.addEventListener('mouseenter', () => {
        changeSideBarTagAnim(1, i);
    });
    tag.addEventListener('mouseout', () => {
        changeSideBarTagAnim(-1, i);
    });
});

const formCover = document.querySelector('#form-cover');

const addPlayerBtn = document.querySelectorAll('#add-player-btn');
addPlayerBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const playerForm = document.querySelector('#player-form');
        const placeholderName = `player ${players.length + 1}`;
        playerForm.querySelector('#input-name').placeholder = placeholderName;
        [playerForm, formCover].forEach((tag) => {
            toggleDisp(tag);
        });
    });
});

const addGameBtn = document.querySelectorAll('#add-game-btn');
addGameBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(players.length >= 2){
            const gameForm = document.querySelector('#game-form');
            [gameForm, formCover].forEach((tag) => {
                toggleDisp(tag);
            });

            const selectNumPlayers = document.querySelector('#game-form-num-players');
            changePlayerSelect(selectNumPlayers.value);
            selectNumPlayers.addEventListener('change', () => {
                changePlayerSelect(selectNumPlayers.value);
            });
        }
        else{
            alert('please add players')
        }
    });
});


// form section
formCover.addEventListener('click', () => {
    toggleDisp(formCover);

    const forms = document.querySelector('#forms');
    for(let i  = 0; i < forms.children.length; i++){
        forms.children[i].classList.add('display-none');
    }
});

let players = [];
const addPlayer = (name, color) => {
    const newPlayer = {name, color, score: 0};
    players.push(newPlayer);

    const footer = document.querySelector('#footer');
    const newPlayerSpan = document.createElement('span');
    footer.appendChild(newPlayerSpan);

    newPlayerSpan.classList.add('p-17apx');
    newPlayerSpan.style.backgroundColor = color;

    for(let i = 0; i < 2; i ++){
        const newSpan = document.createElement('span');
        newPlayerSpan.appendChild(newSpan); 
        newSpan.classList.add('text-shadow-5px');

        const newHr = document.createElement('hr');
        newPlayerSpan.appendChild(newHr);
    }
    newPlayerSpan.children[0].textContent = name;
    newPlayerSpan.children[2].textContent = 0;
}
const addColorToPlayerForm = (color) => {
    const colorList = document.querySelector('#color-list');
    const newFormDiv = document.createElement('div');
    colorList.appendChild(newFormDiv);
    
    newFormDiv.classList.add('w-90px');
    newFormDiv.classList.add('h-90px');
    newFormDiv.classList.add('mb-20px');
    newFormDiv.style.backgroundColor = color;
}
const addPlayerToGameForm = () => {
    const inputNumPlayers = document.querySelector('#game-form-num-players');
    const newOption = document.createElement('option');
    newOption.value = players.length;
    newOption.textContent = players.length;
    inputNumPlayers.appendChild(newOption);
}
const playerFormSubmitBtn = document.querySelector('#player-form button');
playerFormSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName = document.querySelector('#input-name');
    const inputColor = document.querySelector('#input-color');
    if(!inputName.value){
        inputName.value = `player ${players.length + 1}`;
    }
    const isPlayerNew = players.every((player) => (
        player.name !== inputName.value && 
        player.color !== inputColor.value
    ));
    if(isPlayerNew){
        addPlayer(inputName.value, inputColor.value);
        inputName.value = '';
        
        addColorToPlayerForm(inputColor.value);
        if(players.length !== 1){
            addPlayerToGameForm();
        }

        const playerForm = document.querySelector('#player-form');
        const formCover = document.querySelector('#form-cover');
        [playerForm, formCover].forEach((tag) => {
            toggleDisp(tag);
        });
    }
    else{
        alert('name or color already exists');
    }
});

let headGame = null;
const changePlayerSelect = (numPlayers) => {
    const selectPlayers = document.querySelector('#game-form-select-players');
    selectPlayers.innerHTML = '';

    for(let i = 0; i < numPlayers; i++){
        const newSelect = document.createElement('select');
        selectPlayers.appendChild(newSelect);

        newSelect.classList.add('p-5px');
        newSelect.classList.add('m-5px');
        newSelect.classList.add('border-0');
        newSelect.classList.add('round-3px');
        newSelect.classList.add('bg-1');
        newSelect.classList.add('c-2');
        newSelect.classList.add('box-shadow-3');
        newSelect.classList.add('fs-15px');

        players.forEach((player, j) => {
            const option = document.createElement('option');
            option.value = j;
            option.innerText = player.name;
            newSelect.appendChild(option);
            //add style class for options
        });
    }
}
const gameFormSubmitBtn = document.querySelector('#game-form button');
gameFormSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const selectPlayers = document.querySelector('#game-form-select-players');

    const gamePlayers = Array.from(selectPlayers.children).reduce((arr, p, i) => {
        arr[i] = +selectPlayers.children[i].value;
        return arr;
    }, []);

    let temp = null;
    if(headGame !== null){
        temp = headGame;
    }
    headGame = new Node(new Game(7, 6, gamePlayers), null, temp);

    const gameForm = document.querySelector('#game-form');
    const formCover = document.querySelector('#form-cover');
    [gameForm, formCover].forEach((tag) => {
        toggleDisp(tag);
    });
});


// game
class Node{
    constructor(Game, prev, next){
        this.Game = Game;
        this.prev = prev;
        this.next = next;
    }
}
class Game{
    constructor(WIDTH, HEIGHT, gamePlayers){
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;

        this.gamePlayers = gamePlayers;
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
        this.table.classList.add('p-5px');
        this.table.classList.add('m-5px');
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
            topCell.classList.add('border-1px');
            topCell.classList.add('c-1');
        }

        for(let y = 0; y < this.HEIGHT; y++){
            const row = document.createElement('tr');
            for(let x = 0; x < this.WIDTH; x++){
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.appendChild(cell);
                cell.classList.add('w-50px');
                cell.classList.add('h-50px');
                cell.classList.add('border-1px');
                cell.classList.add('c-3');
            }
            this.table.appendChild(row);
        }
    }
    findSpotForCol(x){
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
            if (this.board[y][x] === undefined) {
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
        coin.style.backgroundColor = players[this.currPlayer].color;
        coin.style.boxShadow = `${players[this.currPlayer].color} 0 0 5px 2px`;
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
        this.table.children[0].remove();

        const footer = document.querySelector('#footer');
        let currPlayerIndex;
        Array.from(footer.children).some((div, i) => {
            if(div.firstChild.textContent === players[this.currPlayer].name){
                currPlayerIndex = i;
                return true;
            }
            return false;
        });
        footer.children[currPlayerIndex].lastChild.textContent = ++players[currPlayerIndex].score;
    
        setTimeout(() => {
            alert('game finished');
            this.table.parentElement.removeChild(this.table);
        }, 1000);
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


// after script or load
toggleNavBarTags();

