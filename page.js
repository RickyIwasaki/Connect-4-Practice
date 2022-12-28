// window resize
const minimizeHead = () => {
    const head = document.querySelector('#head');
    for(let i = 1; i < head.children.length - 1; i++){
        head.children[i].classList.add('display-none');
    }
    head.children[head.children.length - 1].classList.remove('display-none');
}
const maximizeHead = () => {
    const head = document.querySelector('#head');
    for(let i = 1; i < head.children.length - 1; i++){
        head.children[i].classList.remove('display-none');
    }
    head.children[head.children.length - 1].classList.add('display-none');
}

let headMinimized = false;
const resize = () => {
    //head-tags
    if(innerWidth < 763){
        if(!headMinimized){
            headMinimized = true;
            minimizeHead();
        }
    }
    else{
        if(headMinimized){
            headMinimized = false;
            maximizeHead();
        }
    }
}
window.addEventListener('resize', () => {
    resize();
});


// menu stuff
let menuMinimized = true;
const closeMenu = () => {
    const menu = document.querySelector('#menu');
    if(menuMinimized){
        menuMinimized = false;
        menu.classList.remove('display-none');
    }
    else{
        menuMinimized = true;
        menu.classList.add('display-none');
    }
};
const menuBtn = document.querySelector('#menu-icon-btn');
menuBtn.addEventListener('click', closeMenu);
const menuCover = document.querySelector('#menu-cover');
menuCover.addEventListener('click', closeMenu);

const menuTagsVals = {hovering: [], per: [], interval: []};
const menuTags = document.querySelector('#menu-tags');
const menuTagIncrease = (i) => {
    if(menuTagsVals.hovering[i] && menuTagsVals.per[i] < 100){
        menuTagsVals.interval[i] = setInterval(() => {
            menuTagsVals.per[i]++;
            menuTags.children[i].style.backgroundImage = `linear-gradient(to right, hsl(4, 100%, 46%), hsl(217, 18%, 18%) ${menuTagsVals.per[i]}%)`;

            if(menuTagsVals.per[i] >= 100){
                clearInterval(menuTagsVals.interval[i]);
            }
        }, 3);
    }
};
const menuTagDecrease = (i) => {
    if(!menuTagsVals.hovering[i] && menuTagsVals.per[i] > 0){
        menuTagsVals.interval[i] = setInterval(() => {
            menuTagsVals.per[i]--;
            menuTags.children[i].style.backgroundImage = `linear-gradient(to right, hsl(4, 100%, 46%), hsl(217, 18%, 18%) ${menuTagsVals.per[i]}%)`;

            if(menuTagsVals.per[i] <= 0){
                clearInterval(menuTagsVals.interval[i]);
            }
        }, 3);
    }
};
for(let i = 0; i < menuTags.children.length; i++){
    menuTagsVals.hovering[i] = false;
    menuTagsVals.per[i] = 0;

    menuTags.children[i].addEventListener('mouseover', () => {
        clearInterval(menuTagsVals.interval[i]);
        menuTagsVals.hovering[i] = true;
        menuTagIncrease(i);
    });
    menuTags.children[i].addEventListener('mouseout', () => {
        clearInterval(menuTagsVals.interval[i]);
        menuTagsVals.hovering[i] = false;
        menuTagDecrease(i);
    });
}





resize();
window.addEventListener('load', () => {
    
});


// const resizeGame = () => {
//     if(innerWidth < 700 || innerHeight < 800){
//         closeGame();
//     }
//     else{    
//         setGameD();
//     }
// };

// let isFading = false;
// //hidden <= display:none;
// //couldn't think of better name
// let isHidden = false;
// const closeGame = () => {
//     if(!isHidden && !isFading){
//         isFading = true;
//         fadeGame();
//     }
// };

// const fadeGame = () => {
//     let opacity = 1;

//     const fadeAway = setInterval(() => {
//         opacity -= 0.1;
        
//         if(opacity <= 0){
//             isHidden = true;
//             isFading = false;

//             const game = document.querySelector('#game');
//             const underGame = document.querySelector('#under-game');

//             game.style.display = 'none';
//             underGame.style.display = 'block';
            
//             clearInterval(fadeAway);
//         }
//         else{
//             const game = document.querySelector('#game');
//             game.style.opacity = opacity;
//         }
//     }, 50);
// };

// const setGameD = () => {
//     const underGame = document.querySelector('#under-game');
//     const game = document.querySelector('#game');

//     underGame.style.display = 'none';
//     game.style.opacity = 1;
//     game.style.display = 'block';

//     isHidden = false;
    

//     const boardTd = document.querySelectorAll('.tiles');

//     const dRatio = 7 / 8;
//     const windowRatio = innerWidth / innerHeight;

//     if(dRatio < windowRatio){
//         game.style.width = `${(innerHeight * 7 / 8).toFixed(3)}px`;
//         game.style.height = `${innerHeight}px`;

//         const tdSize = (innerHeight / 8).toFixed(3) - 5;
//         for(let td of boardTd){
//             td.style.width = `${tdSize}px`;
//             td.style.height = `${tdSize}px`;
//         }
//     }
//     else{
//         game.style.width = `${innerWidth}px`;
//         game.style.height = `${(innerWidth * 8 / 7).toFixed(3)}px`;

//         const tdSize = (innerWidth / 7).toFixed(3) - 5;
//         for(let td of boardTd){
//             td.style.width = `${tdSize}px`;
//             td.style.height = `${tdSize}px`;
//         }
//     }
// };

// const startGame = () => {
//     const startScr = document.querySelector('#start-screen');
//     const board = document.querySelector('#board');
//     const gameFooter = document.querySelector('#game-footer');

//     startScr.style.display = 'none';
//     board.style.display = 'block';
//     gameFooter.style.display = 'block';

//     playerTurn = Math.floor(Math.random() * 2) + 1;

//     const gameAmt = document.querySelector('num-games');
//     try{
//         gameAmt.value;
//         gameLimit = gameAmt.value;
//     }
//     catch(error){
//         gameLimit = 3;
//     }
// };


// window.addEventListener('resize', resizeGame);

// const multiGame = document.querySelector('#multi-game');
// multiGame.addEventListener('change', () => {
//     const gameNum = document.querySelector('#game-num');
//     if(multiGame.checked){
//         gameNum.style.display = 'block';
//     }
//     else{
//         gameNum.style.display = 'none';
//     }
// });

// window.addEventListener('submit', (event) => {
//     event.preventDefault();
//     startGame();
//     resetBoard();
//     setPlayerColors();
//     changeTurn();
// });

// window.addEventListener('load', () => {
//     makeBoard();
//     resizeGame();
// });