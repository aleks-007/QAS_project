import PlaygroundApis from '../page_objects/api_methods/playgroundApis'
import ReportingApis from '../page_objects/api_methods/reportingApis'
import UseCaseApis from '../page_objects/api_methods/useCaseApis'
//Used as a helper class for clean up and etc
class ApiRequests {

    constructor(){

    }

    deleteAllUseCasesMethod(){
        UseCaseApis.getToken() 
        let list = [];
        cy.get('@token').then((token)=>{ 

            UseCaseApis.getAllUseCaseIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            UseCaseApis.deleteAllUseCases(list, token)
        })
    }
    //Delete all projects
    deleteAllProjectsMethod(){
        PlaygroundApis.getToken() 
        let list = [];
        cy.get('@token').then((token)=>{ 

            PlaygroundApis.getAllProjectsIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            PlaygroundApis.deleteAllProjects(list, token)
        })
    }
    //Delete all reports
    deleteAllReportsMethod(){
        Api.getToken();
        cy.get('@token').then((token)=>{ 

            ReportingApis.getAllReportIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            ReportingApis.deleteAllReports(list, token)
        })

     
    }
    //Delete all teams
    deleteAllTeamsMethod(){
        let list = [];
        PlaygroundApis.getToken()
        cy.get('@token').then((token)=>{ 

            PlaygroundApis.getAllTeamIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            PlaygroundApis.deleteAllTeams(list, token)

        })
    }
    //Delete all people
    deletePeopleMethod(){
        let list = [];
        PlaygroundApis.getToken()

        cy.get('@token').then((token)=>{ 
            PlaygroundApis.getPeopleIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            PlaygroundApis.deletePeople(list, token)
        })
    }
    //Delete all seniorities
    deleteSenioritiesMethod(){
        let list = [];
        PlaygroundApis.getToken()

        cy.get('@token').then((token)=>{ 
            PlaygroundApis.getSenioritiesIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            PlaygroundApis.deleteSeniorities(list, token)
        })
    }
    //Delete all technologies
    deleteTechnologiesMethod(){
        let list = [];
        PlaygroundApis.getToken()

        cy.get('@token').then((token)=>{ 
            PlaygroundApis.getTechnologiesIds(token, list)
        })
        cy.get('@token').then((token)=>{ 
            PlaygroundApis.deleteTechnologies(list, token)
        })
    }
}
module.exports = new ApiRequests();
