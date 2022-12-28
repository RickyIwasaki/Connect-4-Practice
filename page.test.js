// window resize
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

// menu stuff
describe('closeMenu(), when certain tags are clicked', () => {
    it('should display menu', () => {
        menuMinimized = false;
        closeMenu();
        const menu = document.querySelector('#menu');
        expect(menu.classList.contains('display-none')).toBe(true);
    });
    it('shouldn t display menu', () => {
        menuMinimized = true;
        closeMenu();
        const menu = document.querySelector('#menu');
        expect(menu.classList.contains('display-none')).toBe(false);
    });

    afterAll(() => {
        if(!menuMinimized){
           closeMenu(); 
        }
    });
});
describe('menuTagIncrease(i), when hovering over menu tag', () => {
    // could fail due to lag
    it('should increase tag s percentage', (done) =>{
        menuTagsVals.hovering[0] = true;
        menuTagsVals.per[0] = 0;
        menuTagIncrease(0);
        setTimeout(() => {
            expect(menuTagsVals.per[0]).toBe(100);
            done();
        }, 1000);
    });

    afterAll(() => {
        menuTagsVals.hovering[0] = false;
        menuTagsVals.per[0] = 0;
    });
});
describe('menuTagDecrease(i), when  menu tag', () => {
    // could fail due to lag
    it('should decrease tag s percentage', (done) =>{
        menuTagsVals.hovering[0] = false;
        menuTagsVals.per[0] = 100;
        menuTagDecrease(0);
        setTimeout(() => {
            expect(menuTagsVals.per[0]).toBe(0);
            done();
        }, 1000);
    });
});