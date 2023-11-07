/// <reference types="Cypress" />

describe("template spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/notetutor");
    });

    it("renders correctly", () => {
        cy.getBySel("notetutor-logo-large")
            .should("have.attr", "src")
            .and("match", /logo-large.*png/i);
        cy.getBySel("notetutor-logo-large").should("have.attr", "alt", "Notetutor logo large");
        cy.contains(/Master your fretboard/i);
        cy.getBySel("start-playing");
        cy.getBySel("customize");
        cy.contains(/Designed & Developed by Gul Jamal Zim/i);
        cy.getBySel("personal-site-link").should("have.attr", "href", "http://gjzim.com");
        cy.get(".github-corner").should("have.attr", "href", "https://github.com/gjzim/notetutor");
    });
});
