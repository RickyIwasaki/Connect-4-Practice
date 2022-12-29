describe('addPlayer(), when player form is submitted', () => {
    it('should add a new player to players list as obj', () => {
        const name = document.querySelector('#new-name');
        const color = document.querySelector('#new-color');
        name.value = 'name testing';
        color.value = 'blue';
        addPlayer();
        expect(players.length).toBe(1);
    });

    afterEach(() => {
        players = [];
        const footer = document.querySelector('#footer');
        footer.removeChild(footer.lastChild);
    });
});