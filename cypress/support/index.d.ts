/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        getBySel(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
        getBySelLike(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
        changeSliderValue(selector: string, value: any, ...args: any[]): void;
    }
}
