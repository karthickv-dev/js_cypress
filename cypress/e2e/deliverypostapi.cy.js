describe("POST Delivery Details", () => {
  it("Valid Trust Type for Account No 11111", () => {
  
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      headers: {
        'Content-Type': 'application/json'
      },
      body: [
        {
          accountNo: "11111",
          accountType: "Trust",
        },
      ],
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });
  it("Valid Brokerage Type for Account No 22222", () => {
    const requestBody = [
      {
        accountNo: "22222",
        accountType: "Brokerage",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });

  it("Valid Trust Type for Account No 33333", () => {
    const requestBody = [
      {
        accountNo: "33333",
        accountType: "Trust",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });

  it("Valid Brokerage Type for Account No 44444", () => {
    const requestBody = [
      {
        accountNo: "44444",
        accountType: "Brokerage",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });

  it("Invalid Account No and Valid Account Type", () => {
    const requestBody = [
      {
        accountNo: "123456",
        accountType: "Trust",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(204);
    });
  });

  it("Invalid account Type and valid Account No", () => {
    const requestBody = [
      {
        accountNo: "11111",
        accountType: "String",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(204);
    });
  });

  it("Invalid account Type and Invalid Account No", () => {
    const requestBody = [
      {
        accountNo: "12345",
        accountType: "String",
      },
    ];
    cy.request({
      method: "POST",
      url: "http://localhost:3000/edelivery/details/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).equal(204);
    });
  });

});
