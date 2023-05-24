/// <reference types="cypress" />

describe("Comment Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Find title", () => {
    cy.contains("JSON Placeholder: React Redux");
    cy.contains("Album")
      .get()
      .should("have.length", 2)
      .last()
      .within(() => {
        cy.get("img").should('exist').should('be.visible');
      });
    cy.get('[test-id="album-test"]')
      .children()
      .should("contain", "Check memories made")
      .and("be.visible");
  });

  // it("Sign In", () => {
  //   const email = "random@email.mail";
  //   const password = "randomPass";
  //   // get button
  //   cy.get("button[name=login]").click();
  //   // asset url
  //   cy.url().should("include", "login");
  //   // fill form
  //   cy.get("input[name=email]").type(email);
  //   cy.get("input[name=password]").type(password);
  //   cy.get("button[type=submit]").click();

  //   cy.contains("Logout").click();
  // });

  // it("Find Comments", () => {
  //   cy.contains("Comments");
  // });

  // it("Find Photos", () => {
  //   cy.contains("JSON Placeholder: React Redux");
  // });

  // it("Find title", () => {
  //   cy.contains("JSON Placeholder: React Redux");
  // });

  // it("Go to Album page from home page", () => {
  //   cy.contains("Album").click().contains("Album");
  // });

  // it("Go to Album page from home page when caption is clicked", () => {
  //   cy.contains("Check Memories made").click();
  //   cy.contains("Album");
  // });

  // it("Opens Github", () => {
  //   //  cy.get("button").as("btn")
  //   //  cy.get("@btn").should("have.text", "Github");
  //   cy.contains("Github")
  //     .should('have.attr','href="https://github.com/igmrrf/react-redux-jsonplaceholder');
  // });
});
