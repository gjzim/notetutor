/// <reference types="Cypress" />

describe("template spec", () => {
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

    it.only("pauses and resumes the game properly", () => {
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
});
