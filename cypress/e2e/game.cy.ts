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
});
