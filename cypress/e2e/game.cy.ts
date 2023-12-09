/// <reference types="Cypress" />

describe("game screen spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
    });

    it("renders correctly", () => {
        cy.getBySel("notetutor-logo").should("have.attr", "alt", "Notetutor logo");
        cy.getBySel("question-icon");
        cy.contains(/Q1: Select the right note/i);
        cy.getBySel("choice").should("have.length", 5);
        cy.getBySel("menu-btn");
        cy.getBySel("pause-btn");
        cy.getBySel("restart-btn");
        cy.getBySel("clock-display").contains("00:00");
    });

    it("shows correct popup on choice clicks", () => {
        cy.getBySel("correct-choice-btn").click();
        cy.contains(/correct/i);
        cy.getBySel("wrong-choice-btn").first().click();
        cy.contains(/wrong/i);
    });

    it("increments question number by one on choice click", () => {
        cy.getBySel("correct-choice-btn").click();
        cy.contains(/Q1: Select the right note/i).should("not.exist");
        cy.contains(/Q2: Select the right note/i);
        cy.getBySel("wrong-choice-btn").first().click();
        cy.contains(/Q3: Select the right note/i);
    });

    it("updates clock properly", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.tick(5000);
        cy.getBySel("clock-display").contains("00:05");
    });

    it("pauses and resumes the game properly", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.getBySel("clock-display").contains("00:00");
        cy.getBySel("pause-btn").click();
        cy.contains(/resume/i);
        cy.contains(/quit/i);
        cy.tick(5000);
        cy.getBySel("clock-display").contains("00:00");
        cy.getBySel("pm-resume-btn").click();
        cy.tick(5000);
        cy.getBySel("clock-display").contains("00:05");
    });

    it("restarts game properly on restart button click", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.contains(/Q3: Select the right note/i);
        cy.contains(/restart/i).click();
        cy.getBySel("cm-reject").click();
        cy.contains(/Q3: Select the right note/i);
        cy.getBySel("clock-display").contains("00:10");
        cy.contains(/restart/i).click();
        cy.getBySel("cm-confirm").click();
        cy.contains(/Q1: Select the right note/i);
        cy.getBySel("clock-display").contains("00:00");
    });

    it("restarts game properly on pause -> restart button click", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.contains(/Q3: Select the right note/i);
        cy.contains(/pause/i).click();
        cy.getBySel("pm-restart-btn").click();
        cy.getBySel("cm-confirm").click();
        cy.contains(/Q1: Select the right note/i);
        cy.getBySel("clock-display").contains("00:00");
    });

    it("restarts game properly on pause -> quit button click", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.getBySel("correct-choice-btn").first().click();
        cy.tick(5000);
        cy.contains(/Q3: Select the right note/i);
        cy.contains(/pause/i).click();
        cy.getBySel("pm-quit-btn").click();
        cy.getBySel("cm-confirm").click();
        cy.contains(/Q1: Select the right note/i).should("not.exist");
        cy.contains(/Master Your Fretboard/i);
    });

    it("uses updated game settings in game", () => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("start-playing").click();
        cy.contains(/menu/i).click();
        cy.changeSliderValue("#total_ques", 10);
        cy.get('input[name="string"]').uncheck();
        cy.get("#string_1").check();
        cy.get('input[name="fret"]').uncheck();
        cy.get("#fret_0").check();
        cy.getBySel("mm-save-btn").click();
        cy.getBySel("im-close").click();
        cy.getBySel("mm-close-btn").click();
        cy.getBySel("wrong-choice-btn").first().click();
        cy.tick(1000);
        for (let i = 0; i < 9; i++) {
            cy.contains(/^e$/i).click();
            cy.tick(1000);
        }
        cy.contains(/score: 9\/10/i);
        cy.contains(/time: 00:1[0-9]/i);
    });
});
