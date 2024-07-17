/// <reference types="Cypress" />
import add from "./unittesting/add";

describe("HTTP Requests", () => {
  it("returns a hello world message", () => {
    //cy.visit('/')
    cy.request("GET", "http://localhost:3003/hello")
      .its("status")
      .should("equal", 200);
  });

  it("returns a hello message with provided name", () => {
    const name = "Jerry";

    // Send a request to the Express route with a name parameter
    cy.request("/hello/Jerry").then((response) => {
      // Assert the response status code and message content
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(`Hello, ${name}!`);
    });
  });
});
