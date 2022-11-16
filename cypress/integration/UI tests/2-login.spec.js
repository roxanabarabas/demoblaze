import {LOGIN_LINK, LOGIN_TITLE, LOGIN_LINK_FOR_LOG_OUT, LOGIN_WELCOME_USER} from "../../support/pageObjects/loginPOM";
import {existUser, loginIncorrectPass, successUser, successPass} from "../../support/testData";

describe('These represent different tests for login functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.get(LOGIN_LINK).click();
	});

    it('Should test that alert for wrong password is displayed', () =>  {
       cy.checkLogInElements();
       cy.peformLogin(existUser, loginIncorrectPass); //custom command please check commands.js
        //check that the correct alert message is displayed and close alert
       cy.on('window:alert',function(AlertText) 
       {expect(AlertText).eql('Wrong password.')
       });
       //in case a wrong password is entered the modal should still be opened
       cy.get(LOGIN_TITLE).should("be.visible");
    });

    it('Should test that alert for empty user or empty password is displayed', () =>  {
        cy.checkLogInElements();
        cy.peformLogin(existUser, loginIncorrectPass);
 
        cy.on('window:alert',function(AlertText) 
        {expect(AlertText).eql('Please fill out Username and Password.')
        });
        //in case a field is not provided the modal should still be opened
        cy.get(LOGIN_TITLE).should("be.visible");
     });

     it('Should test that the user has been logged in successfully', () =>  {
        cy.checkLogInElements();
        cy.peformLogin(successUser, successPass);
        //with correct credentials provided the login modal should close automatically
        cy.get(LOGIN_TITLE).should("not.be.visible");
        cy.get(LOGIN_LINK_FOR_LOG_OUT).should("be.visible");
        cy.get(LOGIN_WELCOME_USER).should("be.visible").should("have.text", `Welcome ${successUser}`)
     });
});   