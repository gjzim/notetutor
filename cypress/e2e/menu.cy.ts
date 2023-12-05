/// <reference types="Cypress" />
import { DEFAULT_OPTIONS } from "./../../src/constants/options";

describe("menu screen spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/notetutor");
        cy.getBySel("customize").click();
    });

    it("renders correctly", () => {
        cy.contains(/menu/i);
        cy.contains(/total questions/i);
        cy.contains(/strings/i);
        cy.contains(/frets/i);
        cy.get("#total_ques").should("have.value", DEFAULT_OPTIONS.totalQues);
        cy.get("#total_ques_display").contains(DEFAULT_OPTIONS.totalQues);
        cy.get("#strings");
        cy.get("input[name='string']").should("have.length", 6);
        DEFAULT_OPTIONS.strings.forEach((stringId) => {
            cy.get(`input#string_${stringId}`).should("be.checked");
        });
        cy.get("#frets-select");
        cy.getBySel("mm-reset-btn");
        cy.getBySel("mm-save-btn");
        cy.getBySel("mm-close-btn");
    });

    it("handles total question slider correctly", () => {
        cy.changeSliderValue("#total_ques", 50);
        cy.get("#total_ques_display").contains(50);
    });

    it("shows and hides reset confirm modal properly", () => {
        cy.getBySel("mm-reset-btn").click();
        cy.contains("Do you really want to reset game options to default?");
        cy.getBySel("cm-confirm").click();
        cy.contains("Do you really want to reset game options to default?").should("not.exist");

        cy.getBySel("mm-reset-btn").click();
        cy.contains("Do you really want to reset game options to default?");
        cy.getBySel("cm-reject").click();
        cy.contains("Do you really want to reset game options to default?").should("not.exist");
    });

    it("resets settings on reset modal confirm", () => {
        cy.changeSliderValue("#total_ques", 50);
        cy.get("#strings").select("1,2,3");
        cy.get("#frets-select").select("1,2,3,4,5");
        cy.getBySel("mm-reset-btn").click();
        cy.getBySel("cm-confirm").click();
        cy.get("#total_ques_display").contains(DEFAULT_OPTIONS.totalQues);
        cy.get("#strings").should("have.value", DEFAULT_OPTIONS.strings.join(","));
        cy.get("#frets-select").should("have.value", DEFAULT_OPTIONS.frets.join(","));
    });

    it("handles close button operations properly", () => {
        cy.getBySel("mm-close-btn").click();
        cy.contains(/menu/i).should("not.exist");

        cy.getBySel("customize").click();
        cy.changeSliderValue("#total_ques", 50);
        cy.getBySel("mm-close-btn").click();
        cy.contains(/There are unsaved changes. Do you really want to close?/i);
        cy.getBySel("cm-confirm").click();
        cy.contains(/menu/i).should("not.exist");

        cy.getBySel("customize").click();
        cy.changeSliderValue("#total_ques", 50);
        cy.getBySel("mm-close-btn").click();
        cy.contains(/There are unsaved changes. Do you really want to close?/i);
        cy.getBySel("cm-reject").click();
        cy.contains(/menu/i);
    });

    it("saves updated options properly", () => {
        const updatedOption = { ...DEFAULT_OPTIONS, totalQues: 50 };
        cy.clearLocalStorage();
        cy.changeSliderValue("#total_ques", updatedOption.totalQues);
        cy.getBySel("mm-save-btn")
            .click()
            .should(() => {
                expect(localStorage.getItem("nt-game-options")).to.equal(JSON.stringify(updatedOption));
            });
        cy.contains(/Settings successfully updated. New settings will take effect from the next question\/new game/i);
    });

    it("shows error properly", () => {
        cy.get("#strings").select("1,2,3");
        cy.get("#string_1").uncheck();
        cy.get("#string_2").uncheck();
        cy.get("#string_3").uncheck();
        cy.getBySel("mm-save-btn").click();
        cy.contains(/Please select at least one string and fret/i);
    });
});
