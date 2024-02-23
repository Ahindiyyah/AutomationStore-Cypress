/// <reference types="cypress" />
import 'cypress-xpath';

describe('Automation Test Store', () => {
    beforeEach(() => {
        cy.visit('https://automationteststore.com/');
        cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=58"]').click();
    });

    it('should select men\'s items and assert cart number', () => {
        chooseManItems();
        assertCartItemCount(4);
    });

    it('should assert contact number', () => {
        assertContactNumber("+123 456 7890");
    });

    it('should print footer text in uppercase', () => {
        printFooterTextInUpperCase();
    });
});

function chooseManItems() {
    cy.get('.grid > ').its('length').then((Length) => {
        for (let i = 0; i < Length; i++) {
            cy.get('.grid > ').eq(i).click()
            cy.get('.cart').click()
            cy.go(-2)
        }
    })
}

function assertCartItemCount(expectedCount) {
    cy.get('.dropdown-toggle > .label').invoke('text').then((actualCount) => {
        expect(parseInt(actualCount.trim())).to.equal(expectedCount);
    });
}

function assertContactNumber(expectedNumber) {
    cy.get('.contact > :nth-child(1)').invoke('text').then((actualNumber) => {
        expect(actualNumber.trim()).to.equal(expectedNumber);
    });
}

function printFooterTextInUpperCase() {
    cy.get('.footersocial').invoke('text').then((footerText) => {
        cy.log(footerText.toUpperCase());
    });
}
