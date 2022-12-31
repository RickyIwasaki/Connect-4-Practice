const toggleDisp = (tag) => {
    if(tag.classList.contains('display-none')){
        tag.classList.remove('display-none');
    }
    else{
        tag.classList.add('display-none');
    }
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

const addGameBtn = document.querySelectorAll('#add-game-btn');
addGameBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(players.length >= 2){
            const gameForm = document.querySelector('#game-form');
            toggleDisp(gameForm);
        }
    });
});

const addPlayerBtn = document.querySelectorAll('#add-player-btn');
addPlayerBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const playerForm = document.querySelector('#player-form');
        const placeholderName = `player ${players.length + 1}`;
        playerForm.querySelector('#input-name').placeholder = placeholderName;
        toggleDisp(playerForm);
        toggleDisp(formCover);
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

const gameFormSubmitBtn = document.querySelector('#game-form button');
gameFormSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if(players.length >= 2){
        const selectNumPlayers = document.querySelector('#game-form-num-players');
        const numPlayers = selectNumPlayers.value;
        for(let i = 0; i < numPlayers; i++){
            const selectPlayers = document.querySelector('#game-form-select-players');
            const newSelect = document.createElement('select');
            // do this
            // add num players of select, for each select have players.length of options
            // add selected players to new Game();
        }
    }
    else{
        alert('please add players');
    }
});

const addPlayer = (name, color) => {
    const newPlayer = {name, color, score: 0};
    players.push(newPlayer);

    const footer = document.querySelector('#footer');
    const newFooterDiv = document.createElement('div');
    footer.appendChild(newFooterDiv);

    newFooterDiv.classList.add('h-100');
    newFooterDiv.classList.add('pt-15px');
    newFooterDiv.style.backgroundColor = color;

    for(let i = 0; i < 2; i ++){
        const newP = document.createElement('p');
        newFooterDiv.appendChild(newP); 
        newP.classList.add('mt-10px');
        newP.classList.add('mr-30px');
        newP.classList.add('ml-30px');
        newP.classList.add('text-shadow-5px');
    }
    newFooterDiv.children[0].textContent = name;
    newFooterDiv.children[1].textContent = 0;
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


// game
let players = [];


// after script or load
toggleNavBarTags();



// // others
// let newStyle = null;
// newStyle = document.createElement('style');
// document.head.appendChild(newStyle);
// newStyle.rel = 'stylesheet';
// const newAnimation = (body) => {
//     newStyle.innerHTML = body;
// }


// // runs when script is called
// resize();
// setDimensions();
// // runs when doc is finished reading
// window.addEventListener('load', () => {
    
// });