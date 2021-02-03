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
        cy.get(Playground.seniorityTitle).should('have.text', data.team.qa)
    })
    it("Add new collegue and fill seniority, technologies and team", ()=>{
       
        Playground.addCollegue(data.collegues.alex,  data.seniority.intermediate, data.team.qa, 2, data.tech.java, data.tech.appium)

        //Assert
        Playground.assertCollegueWasAdded(Playground.peopleList, data.collegues.alex) //Assert that colegue was added
        cy.get(Playground.peopleList).contains(data.collegues.alex).click() //Open details

        //Assert
        cy.get(Playground.peopleFullNameInput).should('have.value', data.collegues.alex) //Assert full name

        Playground.assertAddedTechnologies(data.tech.appium, data.tech.java) //Assert tech

        cy.get(Playground.seniority).should('have.text', data.seniority.intermediate)  //Assert seniority

        cy.get(Playground.team).should('have.text', data.team.qa)  //Assert team

    })
    it("Create new project and add collegue", ()=>{
       
        Playground.addProject(data.projects.sandbox_qa, data.collegues.alex)
    
        //Assert
        Playground.assertProjectWasAdded(Playground.projectList, data.projects.sandbox_qa) //Assert that project was added

        cy.get(Playground.projectList).contains(data.projects.sandbox_qa).click() //Open details

        //Assert details of the project
        cy.get(Playground.projectTitle).should('have.text', data.projects.sandbox_qa)

        cy.get(Playground.teamTitle).should('have.text', data.team.qa)

        Playground.assertCollegueDetails( data.collegues.alex,  data.seniority.intermediate, data.tech.java, data.tech.appium)

    })
    after("Clean Up",()=>{
        ApiRequests.deleteAllProjectsMethod()
        ApiRequests.deleteAllTeamsMethod()
        ApiRequests.deletePeopleMethod()
        ApiRequests.deleteSenioritiesMethod()
        ApiRequests.deleteTechnologiesMethod()
    })

})