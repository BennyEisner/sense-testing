describe("Smoke: core flows", () => {
  it("login success and catalog visible", () => {
    cy.visit("/");
    cy.get("[data-testid=login-email]").type("test@example.com");
    cy.get("[data-testid=login-password]").type("Password123");
    cy.get("[data-testid=login-submit]").click();
    cy.get("[data-testid=page-catalog]").should("exist");
    cy.get("[data-testid=banner-message]").should(
      "contain",
      "Login successful",
    );
  });

  it("login failure shows error", () => {
    cy.visit("/");
    cy.get("[data-testid=login-email]").type("wrong@example.com");
    cy.get("[data-testid=login-password]").type("Wrong");
    cy.get("[data-testid=login-submit]").click();
    cy.get("[data-testid=banner-message]").should(
      "contain",
      "Invalid credentials",
    );
  });

  it("can add to cart and checkout", () => {
    cy.visit("/");
    cy.get("[data-testid=login-email]").type("test@example.com");
    cy.get("[data-testid=login-password]").type("Password123");
    cy.get("[data-testid=login-submit]").click();

    cy.get("[data-testid=product-1-add]").click();
    cy.get("[data-testid=nav-checkout]").click();
    cy.get("[data-testid=cart-count]").should("contain", "1");
    cy.get("[data-testid=checkout-submit]").click();
    cy.get("[data-testid=banner-message]").should(
      "contain",
      "Checkout complete",
    );
  });

  it("can update profile", () => {
    cy.visit("/");
    cy.get("[data-testid=login-email]").type("test@example.com");
    cy.get("[data-testid=login-password]").type("Password123");
    cy.get("[data-testid=login-submit]").click();

    cy.get("[data-testid=nav-profile]").click();
    cy.get("[data-testid=profile-name]").clear().type("New Name");
    cy.get("[data-testid=profile-save]").click();
    cy.get("[data-testid=banner-message]").should("contain", "Profile updated");
  });
});
