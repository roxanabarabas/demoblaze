import { PRODUCT_TO_BE_ADDED_TO_CART, ADD_TO_CART_BUTTON,
        CART_LINK,CART_PRODUCTS_TITLE, CART_TOTAL_TITLE,
        CART_TOTAL_PRICE, CART_FIRST_PRODUCT_ADDED, CART_PLACE_ORDER_BUTTON,
        CART_DELETE_LINK, PLACE_ORDER_TITLE, PLACE_ORDER_NAME, PLACE_ORDER_CREDIT_CARD,
        PURCHASE_BUTTON, PURCHASE_MESSAGE, PURCHASE_OK_BUTTON,
} from "../../support/pageObjects/cartPOM";
import {successUser, successPass, product_added_to_cart_name,
        place_order_name, place_order_card,
} from "../../support/testData";
import {LOGIN_LINK} from "../../support/pageObjects/loginPOM";

describe('Tests for cart functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
	});

    it("Should test the successful adding of a product to the cart and its purchase", () => {
      //first the user needs to be logged in so that products can be added to cart
      cy.get(LOGIN_LINK).click();
      cy.peformLogin(successUser, successPass);
      cy.wait(2000);

     //first select a random product (in this case the first one) which will be added to the cart
      cy.get(PRODUCT_TO_BE_ADDED_TO_CART).click({force:true});
      cy.get(ADD_TO_CART_BUTTON).should("be.visible").click({force:true});
      //verify that alert message with product added is displayed and click ok
      cy.on('window:alert',function(AlertText) 
        {expect(AlertText).eql('Product added.')
        });

      //check cart content  
      cy.get(CART_LINK).click({force:true});  
      cy.wait(2000);

      cy.get(CART_PRODUCTS_TITLE).should("be.visible").should("have.text", "Products");
      cy.get(CART_TOTAL_TITLE).should("be.visible").should("have.text","Total");
      cy.get(CART_TOTAL_PRICE).should("be.visible").should("not.be.null");
      cy.get(CART_FIRST_PRODUCT_ADDED).should("be.visible").should("have.text",product_added_to_cart_name);
      cy.get(CART_DELETE_LINK).should("be.visible");    
      
      //place order
      cy.get(CART_PLACE_ORDER_BUTTON).click();
      cy.get(PLACE_ORDER_TITLE).should("be.visible");
      //fill in only mandatory fields
      cy.get(PLACE_ORDER_NAME).type(place_order_name);
      cy.get(PLACE_ORDER_CREDIT_CARD).type(place_order_card);
      cy.get(PURCHASE_BUTTON).click();

      //verify successfull purchase
      cy.get(PURCHASE_MESSAGE).should("be.visible").should("have.text", "Thank you for your purchase!");
      cy.get(PURCHASE_OK_BUTTON).click();  
      
      //note: other tests like deleting the added product, closing the purchase or validation of the purchase modal can be added
    });
});