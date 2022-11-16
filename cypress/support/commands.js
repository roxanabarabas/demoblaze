import {
    SIGN_UP_USERNAME, 
    SIGN_UP_PASSWORD, 
    SIGN_UP_BUTTON,
    SIGN_UP_CLOSE_BUTTON,
    SIGN_UP_TITLE,
    SIGN_UP_CLOSE_ICON,
    } from "../support/pageObjects/signUpPOM";
 import {
    LOGIN_TITLE,
    LOGIN_CLOSE_BUTTON,
    LOGIN_CLOSE_ICON,
    LOGIN_USERNAME,
    LOGIN_PASSWORD,
    LOGIN_BUTTON,
    } from "../support/pageObjects/loginPOM";   
import {DISPLAYED_PRODUCTS} from "../support/pageObjects/categoriesPOM";

Cypress.Commands.add("checkSignUpElements", ()=> {
    cy.get(SIGN_UP_CLOSE_BUTTON).should("be.visible");
    cy.get(SIGN_UP_TITLE).should("be.visible").should("have.text", "Sign up");
    cy.get(SIGN_UP_CLOSE_ICON).should("be.visible");
});    
Cypress.Commands.add("performSignUp", (user, pass) => {
    cy.get(SIGN_UP_USERNAME).click().type(user, {force: true});
    cy.get(SIGN_UP_PASSWORD).click().type(pass, {force: true});
    cy.get(SIGN_UP_BUTTON).click();
});
Cypress.Commands.add("checkLogInElements", () => {
    cy.get(LOGIN_TITLE).should("be.visible").should("have.text", "Log in");
    cy.get(LOGIN_CLOSE_BUTTON).should("be.visible");
    cy.get(LOGIN_CLOSE_ICON).should("be.visible");
});
Cypress.Commands.add("peformLogin", (user, pass)=>{
    cy.get(LOGIN_USERNAME).click().type(user, {force: true});
    cy.get(LOGIN_PASSWORD).click().type(pass, {force: true});
    cy.get(LOGIN_BUTTON).click();
});
Cypress.Commands.add("getTitleOfEachProduct", (index) => {
    cy.get(`#tbodyid > div:nth-child(${index+1}) h4 > a`)
});
Cypress.Commands.add("getProductsDisplayedAndCheckCategory", (categoryArray) => {
    cy.get(DISPLAYED_PRODUCTS).each((CATEGORY, index) => {
        //the index of the elements starts with 1 instead of 0, therefore index+1 is passed
        cy.getTitleOfEachProduct(index).should(($el)=> {
            //save in a constant the text of the H4 and check if it's part of the array of phones
            const text = $el.text().trim();
            expect(text).to.be.oneOf(categoryArray);
            });
        });    
});