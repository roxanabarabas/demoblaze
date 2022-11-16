import {
    existUser, existPass,
    emptyUser, emptyPass,
    successUser, successPass,
} from "../../support/testData";
import {SIGN_UP_LINK, SIGN_UP_TITLE} from "../../support/pageObjects/signUpPOM";

describe('These represent different tests for sign up functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.get(SIGN_UP_LINK).click();
	});

    it('Should test that alert for existing user is displayed', () =>  {
        cy.checkSignUpElements();
        cy.performSignUp(existUser, existPass); //custom command please check commands.js   
        //checks that the correct alert message is displayed and clicks OK button
        cy.on('window:alert',function(AlertText) 
        {expect(AlertText).eql('This user already exist.')
        });
         //in case the user already exists the modal should still be opened
         cy.get(SIGN_UP_TITLE).should("be.visible");
    });

    it('Should test that alert for empty user or empty password is displayed', () =>  {
        cy.checkSignUpElements();
        cy.performSignUp(emptyUser, emptyPass);
        //check that the correct alert message is displayed and clicks OK button
        cy.on('window:alert',function(AlertText) 
        {expect(AlertText).eql('Please fill out Username and Password.')
        });
        //in case an empty user or password are provided the modal should still be visible
        cy.get(SIGN_UP_TITLE).should("be.visible");
    });

    it('Should test that alert for successful sign up is displayed', () =>  {
        cy.checkSignUpElements();
        cy.performSignUp(successUser, successPass);
        
        cy.on('window:alert',function(AlertText) 
        {expect(AlertText).eql('Sign up successful.')
        });
        //in case of a successful sign up, after clicking the OK button in the alert, 
        //the modal should not be visible forcing otherwise the test to fail
        cy.get(SIGN_UP_TITLE).should("not.be.visible");
    });
});
