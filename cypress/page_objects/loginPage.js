class Login {
    constructor(){
      //Locators
        this.loginButton = 'a.btn:nth-child(4)'
        this.forgotPassButton = 'a.btn:nth-child(3)'


        this.username = '[name="email"]'
        this.password = '[name="password"]'
        this.submitButton = '[data-testid="submit_btn"]'
    }

    login(user, pass){ 
        cy.get(this.username).clear().type(user)   
        cy.get(this.password).clear().type(pass, {log:false}) 
        cy.get(this.submitButton).click()
    }
}
module.exports = new Login();