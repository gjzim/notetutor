/// <reference types="Cypress" />

describe("end screen spec", () => {
    beforeEach(() => {
        cy.clock();
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("customize").click();
        cy.changeSliderValue("#total_ques", 1);
        cy.getBySel("mm-save-btn").click();
        cy.getBySel("im-close").click();
        cy.getBySel("mm-close-btn").click();

        cy.getBySel("start-playing").click();
        for (let i = 0; i < 10; i++) {
            cy.getBySel("correct-choice-btn").first().click();
            cy.tick(1000);
        }
    });

    it("shows correct data in the end screen", () => {
        cy.contains(/score: 10\/10/i);
        cy.contains(/time: 00:1[0-9]/i);
        cy.contains(/Designed & Developed by Gul Jamal Zim/i);
        cy.getBySel("personal-site-link").should("have.attr", "href", "http://gjzim.com");
    });

    it("starts a new game on play again click", () => {
        cy.contains(/play again/i).click();
        cy.contains(/Q1: Select the right note/i);
        cy.getBySel("clock-display").contains("00:00");
    });

    it("loads the startup screen on go back click", () => {
        cy.contains(/go back/i).click();
        cy.contains(/Master your fretboard/i);
        cy.getBySel("start-playing");
    });
});
