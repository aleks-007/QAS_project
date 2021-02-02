
import Dashboard from '../page_objects/dashboardPage'
import Login from '../page_objects/loginPage'
import UseCases from '../page_objects/useCasesPage'
import ApiRequests from '../helpers/ApiRequests'
import useCasesPage from '../page_objects/useCasesPage'
/**
* Scenario
* 
* 1. Login to the app using your username and password
* 2. In Sandbox section open Use Cases page
* 3. Create 4 Use Cases by filling in the data making sure to cover all validations. 
* Each of the 4 test cases should contain different title, desc, expected result and steps.
* 
* 4. Edit all input fileds in the created test case by replacing it with string 
* "This field previously had" + no. of char in the previous string + "characters" 
* 
*/
let fileData = 'data.json'
let data;  //Variable used for handling json file

describe("Scenario 1", ()=>{

/**This before hook will load data.json from fixtures */  

before(  function(){
    cy.fixture(fileData).then(d => {
        data = d;
    })
    //Clean Up
    ApiRequests.deleteAllUseCasesMethod()
})
 /************************************** Step 1 & 2 ******************************************/

beforeEach( function() {

    cy.visit(Cypress.env('baseURL'))

    cy.get(Login.loginButton).click()

    Login.login(Cypress.env('username'), Cypress.env('password'))

    cy.url().should('eq', Cypress.env('baseURL') + 'dashboard')

    cy.get(Dashboard.useCaseCard).click();
})

 /*************************************** Step 3 *******************************************/
it("Create 4 Different Use Cases", ()=>{

    [data.Tests[1], data.Tests[2], data.Tests[3], data.Tests[4]]
        .forEach((d)=>{

            UseCases.createUseCase(d.testName, d.descIndicator, d.desc, d.expectedResult,
            d.numOfSteps, d.automatedIndicator,  d.step1, d.step2, d.step3, d.step4, d.step5, d.step6)

            cy.get(UseCases.useCaseContainer).contains(d.testName).click()   

            /**Assertions*/
            cy.get(UseCases.useCaseAutomatedRadio).invoke('val').then((val)=>{   //Assert status of the test
                expect(val).to.contain(d.automatedIndicator)
            })
            UseCases.assertUseCaseSteps(d.testName, d.desc, d.expectedResult, d.step1, d.step2, d.step3, d.step4, d.step5, d.step6)  //Assert use case steps

            cy.get(useCasesPage.backButton).click()
        })
})
 /*************************************** Step 4 *******************************************/
it("Change input fields of some 4 use cases", ()=>{
    [data.Tests[1], data.Tests[2], data.Tests[3], data.Tests[4]]
        .forEach((d)=>{
            UseCases.editUseCaseInputFields(d.testName)
            cy.get(UseCases.useCaseContainer).contains("This field previously had " + d.testName.replace(" ", "").length + " characters").click()
            
            /**Assertions*/
            UseCases.assertEditingUseCase()

            cy.get(useCasesPage.backButton).click()
        })
})
after("Clean Up: delete all use cases", ()=>{
// Clean Up
   ApiRequests.deleteAllUseCasesMethod()
})

})
