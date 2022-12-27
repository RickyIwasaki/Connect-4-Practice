// assuming minimizeHead() and maximizeHead() works properly
describe('resize(), when window dimensions changes', () => {
    it('read script file to test', () => {
        expect(true).toBe(true);
    });
    // // resize innerWidth to less than 763px to test
    // it('should convert headMinimized to true', () => {
    //     headMinimized = false;
    //     resize();
    //     // won't break on multiple calls
    //     resize();
    //     expect(headMinimized).toBe(true);
    // });
    // // resize innerWidth to other to test
    // it('should convert headMinimized to false', () => {
    //     headMinized = true;
    //     resize();
    //     expect(headMinimized).toBe(false);
    // });
});

// using maximizeHead() for testing
describe('minimizeHead(), when innerWidth is less and headMinimized is false', () => {
    beforeEach(() => {
        maximizeHead();
    });

    it('should display and undisplay head tags', () => {   
        minimizeHead();
        const head = document.querySelector('#head');
        for(let i = 1; i < head.children.length - 1; i++){
            expect(head.children[i].classList.contains('display-none')).toBe(true);
        }
        expect(head.children[head.children.length - 1].classList.contains('display-none')).toBe(false);
        // won't break on multiple calls
        minimizeHead();
    });

    afterEach(() => {
        if(innerWidth < 763){
            minimizeHead();
        }
        else{
            maximizeHead();
        }
    });
});

// using minimizeHead() for testing
describe('maximizeHead(), when innerWidth is more and headMinimized is true', () => {
    beforeEach(() => {
        minimizeHead();
    }); 

    it('should display and undisplay head tags', () => { 
        maximizeHead();
        const head = document.querySelector('#head');
        for(let i = 1; i < head.children.length - 1; i++){
            expect(head.children[i].classList.contains('display-none')).toBe(false);
        }
        expect(head.children[head.children.length - 1].classList.contains('display-none')).toBe(true);
        // won't break on multiple calls
        maximizeHead();
    });

    afterEach(() => {
        if(innerWidth < 763){
            minimizeHead();
        }
        else{
            maximizeHead();
        }
    });
});