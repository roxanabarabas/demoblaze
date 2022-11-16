import {PHONE_CATEGORY, LAPTOP_CATEGORY,  MONITOR_CATEGORY} from "../../support/pageObjects/categoriesPOM";
import {phones_categories, laptops_categories, monitors_categories} from "../../support/testData";

describe('These represent different tests for categories functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
	});

    it("Should test that when selecting phone category only phone products are displayed", () => {
      cy.get(PHONE_CATEGORY).click({force: true});
      cy.get(PHONE_CATEGORY).click({force: true}); //discovered that it's necessary to click twice for Cypress to detect the updated list of products
      cy.wait(2000); //needed to add a wait for the product list to be updated before continuing

      cy.getProductsDisplayedAndCheckCategory(phones_categories); //custom function, please check commands.js
    });

    it("Should test that when selecting laptop category only laptop products are displayed", () => {
        cy.get(LAPTOP_CATEGORY).click({force: true});
        cy.get(LAPTOP_CATEGORY).click({force: true});
        cy.wait(2000); 
        
        cy.getProductsDisplayedAndCheckCategory(laptops_categories);
      });

    it("Should test that when selecting monitor category only monitor products are displayed", () => {
        cy.get(MONITOR_CATEGORY).click({force: true});
        cy.get(MONITOR_CATEGORY).click({force: true}); 
        cy.wait(2000); 
        
        cy.getProductsDisplayedAndCheckCategory(monitors_categories);
    }); 

});

    
