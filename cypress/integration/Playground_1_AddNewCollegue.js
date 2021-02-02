import Dashboard from '../page_objects/dashboardPage'
import Login from '../page_objects/loginPage'
import Playground from '../page_objects/playgroundPage'
import ApiRequests from '../helpers/ApiRequests'


let fileData = 'data.json'
let data;  //Variable used for handling json file

describe("Playground:Add new collegue", ()=>{

    //Read data
    before(  function(){
        cy.fixture(fileData).then(d => {
            data = d;
        })
    })
    //Login
    beforeEach( function(){
        cy.visit(Cypress.env('baseURL'))
        cy.get(Login.loginButton).click()
        Login.login(Cypress.env('username'), Cypress.env('password'))
        cy.get(Dashboard.playgroundCard).click();

    })
    it("Create technology", ()=>{

        Playground.createTechnology(data.tech.appium)
        cy.get(Playground.technologyTitle).should("contain", data.tech.appium)

        Playground.createTechnology(data.tech.java)
        cy.get(Playground.technologyTitle).should("contain", data.tech.java)
    })
    it("Create seniority", ()=>{

        Playground.createSeniorities(data.seniority.intermediate)
        cy.get(Playground.seniorityTitle).should('have.text', data.seniority.intermediate)
   })
    it("Create a team", ()=>{

        Playground.createTeam('QA')
        cy.get(Playground.seniorityTitle).should('have.text', 'QA')
    })
    it("Add new collegue and fill seniority, technologies and team", ()=>{
       
        Playground.addCollegue('Aleksandra',  'Intermediate', 'QA', 2, 'Java', 'Appium')

        //Assert
        Playground.assertCollegueWasAdded(Playground.peopleList, 'Aleksandra') //Assert that colegue was added
        cy.get(Playground.peopleList).contains('Aleksandra').click() //Open details

        cy.get(Playground.peopleFullNameInput).should('have.value', 'Aleksandra') //Assert full name

        Playground.assertAddedTechnologies('Appium','Java') //Assert tech

        cy.get(Playground.seniority).should('have.text', 'Intermediate')  //Assert seniority

        cy.get(Playground.team).should('have.text', 'QA')  //Assert team

    })
    it("Create new project and add collegue", ()=>{
       
        Playground.addProject('QA Sandbox', 'Aleksandra')
    
        //Assert
        Playground.assertProjectWasAdded(Playground.projectList, 'QA Sandbox') //Assert that project was added

        cy.get(Playground.projectList).contains('QA Sandbox').click() //Open details

        //Assert details of the project
        cy.get(Playground.projectTitle).should('have.text', 'QA Sandbox')
        cy.get(Playground.teamTitle).should('have.text', 'QA')

        Playground.assertCollegueDetails( 'Aleksandra', 'Intermediate', 'Java', 'Appium')

    })
    after("Clean Up",()=>{
        ApiRequests.deleteAllProjectsMethod()
        ApiRequests.deleteAllTeamsMethod()
        ApiRequests.deletePeopleMethod()
        ApiRequests.deleteSenioritiesMethod()
        ApiRequests.deleteTechnologiesMethod()
        //delete all teams
    //delete all people
    //delete all seniorities
    //delete all technologies
    })

})