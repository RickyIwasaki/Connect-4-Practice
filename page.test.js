describe("toggleDisp(tag), when tag's certain event listener is called", () => {
    it("should toggle display of tag correctly", () => {
        const newDiv = document.createElement("div");
        toggleDisp(newDiv);
        expect(newDiv.classList.contains('display-none')).toBe(true);
        toggleDisp(newDiv);
        expect(newDiv.classList.contains('display-none')).toBe(false);
    });
});

// window
describe("toggleNavBar(), when window is resized", () => {
    it("should toggle displays of nav bar correctly", () => {
        toggleNavBarTags();

        const navBar = document.querySelector('#nav-bar');
        const menuIconIndex = navBar.children.length - 1;
        for(let i = 1; i < menuIconIndex; i++){
            if(innerWidth < 859){
                expect(navBar.children[i].classList.contains('display-none')).toBe(true);
            }
            else{
                expect(navBar.children[i].classList.contains('display-none')).toBe(false);
            }
        }

        if(innerWidth < 233 || 859 <= innerWidth){
            expect(navBar.children[menuIconIndex].classList.contains('display-none')).toBe(true);
        }
        else{
            expect(navBar.children[menuIconIndex].classList.contains('display-none')).toBe(false);
        }
    });
});

// nav bar // side bar
describe("changeSideBarTagAnim(), when mouse pass through side bar tag", () => {
    it("should change background image ratio from num 0 to 100 correctly", (done) => {
        sideBarTags.forEach((tag, i) => {
            sideBarTagsAnimPer[i].per = 0;
            changeSideBarTagAnim(1, i);
        });

        setTimeout(() => {
            sideBarTags.forEach((tag, i) => {
                expect(sideBarTagsAnimPer[i].per).toBe(100);
            });
            done();
        }, 603);
    });
    it("should change background image ratio from num 100 to 0 correctly", (done) => {
        sideBarTags.forEach((tag, i) => {
            sideBarTagsAnimPer[i].per = 100;
            changeSideBarTagAnim(-1, i);
        });

        setTimeout(() => {
            sideBarTags.forEach((tag, i) => {
                expect(sideBarTagsAnimPer[i].per).toBe(0);
            });
            done();
        }, 603);
    });
    it("should change background image ratio from num (0 < num < 100) to 100 correctly", (done) => {
        sideBarTags.forEach((tag, i) => {
            sideBarTagsAnimPer[i].per = 50;
            changeSideBarTagAnim(1, i);
        });

        setTimeout(() => {
            sideBarTags.forEach((tag, i) => {
                expect(sideBarTagsAnimPer[i].per).toBe(100);
            });
            done();
        }, 303);
    });
    it("should change background image ratio from num (0 < num < 100) to 0 correctly", (done) => {
        sideBarTags.forEach((tag, i) => {
            sideBarTagsAnimPer[i].per = 50;
            changeSideBarTagAnim(-1, i);
        });

        setTimeout(() => {
            sideBarTags.forEach((tag, i) => {
                expect(sideBarTagsAnimPer[i].per).toBe(0);
            });
            done();
        }, 303);
    });
});