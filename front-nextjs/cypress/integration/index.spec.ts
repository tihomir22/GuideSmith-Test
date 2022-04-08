import phones from "../../../guidesmith-back/src/phones.json";
describe("Application e2e", () => {
  let listLength = 0;
  before(() => {
    cy.visit("http://localhost:3001/");
    cy.get(".ant-card")
      .its("length")
      .then((listLengthParam) => (listLength = listLengthParam));
  }),
    it("should display phones and allows accesing their detail", () => {
      // Start from the index page
      cy.visit("http://localhost:3001/");

      cy.get(".ant-card").first().click();

      cy.url().should("not.be", "/");

      cy.get(".ant-list-items > div").children().should("have.length.at.least", 8);

      cy.get(".actions > button").should("exist");
    });

  it("goes back on click detail item button", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    cy.get(".ant-card").first().click();
    cy.get(".actions").children().first().click();

    cy.url().should("equal", "http://localhost:3001/");
  });
  it("creates an element", () => {
    // Start from the index page
    let actualindex = 0;
    function typeInput(value: any) {
      cy.get(".ant-form").get("input,textarea").eq(actualindex).type(value);
      actualindex++;
    }
    cy.visit("http://localhost:3001/");
    cy.get(".floating-action > button").first().click();
    let phoneToCreate = phones[0];
    [
      phoneToCreate.name,
      phoneToCreate.manufacturer,
      phoneToCreate.description,
      phoneToCreate.color,
      phoneToCreate.price,
      phoneToCreate.imageUrl,
      phoneToCreate.screen,
      phoneToCreate.processor,
      phoneToCreate.ram,
    ].forEach((phoneData) => typeInput(phoneData));
    cy.get("button.submit-create-phone-modal").first().click();
    cy.get(".ant-card").its("length").should("be.gt", listLength);
  });

  it("deletes an element", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    cy.get(".ant-card").first().click();
    cy.get(".actions").children().eq(1).click();

    cy.url().should("equal", "http://localhost:3001/");
    cy.get(".ant-card").its("length").should("be.eq", listLength);
  });
});
export {};
