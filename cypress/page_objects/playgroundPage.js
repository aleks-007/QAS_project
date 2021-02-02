class Playground {
    constructor() {
        //Tab technologies
        this.technologiesTab = '[href = "/technologies"]'
        this.createTechnologyButton = '.btn-text'
        this.technologyTitleInput = '[name="technology_title"]'
        this.submitTechButton = 'button[type="submit"][value="Submit"]'
        this.technologyTitle = '.card-profile .list-group-item'

        //Tab seniorities
        this.senioritiesTab = '[href = "/seniorities"]'
        this.createSeniorityButton = '[href="/create-seniority"]'
        this.seniorityTitleInput = '[name="seniority_title"]'
        this.submitSeniorityButton = 'button[type="submit"][value="Submit"]'

        this.seniorityTitle = '.list-group-item'

        //Tab people
        this.peopleTab = '[href="/people"]'
        this.peopleCreateButton = '[href="/create-person"]'
        this.peopleFullNameInput = '[name="people_name"]'
        this.peopleSelectTech = '[placeholder="Select technologies"]'
        this.peopleOptions = '[role="option"]'
        this.peopleSelectSeniority = '[placeholder="Select seniority"]'
        this.peopleSelectTeam = '[placeholder="Select team"]'
        
        this.submitNewCollegueButton = 'button[type="submit"][value="Submit"]'

        this.peopleList = '.list-group-item'    //List containing all colleguas
        this.seniority = ':nth-child(3) > :nth-child(1) > .react-dropdown-select > .react-dropdown-select-content > span'
        this.team = ':nth-child(4) > :nth-child(1) > .react-dropdown-select > .react-dropdown-select-content > span'

        //Tab teams
        this.teamTab = '[href="/roles"]'
        this.teamTitleInput = '[placeholder="* Team Title"]'
        this.createTeamButton = '[href="/create-role"]'

        //Tab projects
        this.projectsTab = '[href="/projects"]'
        this.createProjectButton = '[href="/create-project"]'
        this.projectTitleInput = '[name="project_title"]'
        this.projectSelectPeople = '[placeholder="Select people"]'
        this.submitNewProjectButton = 'button[type="submit"][value="Submit"]'
        this.projectList = '.list-group-item'

        this.projectTitle = '.mb-3 > b'
        this.teamTitle = 'h5'
        this.colegueDetails = '.project-container > div > div > *'
        this.collegueInfoName = '.row .col b'
        this.collegueInfoLevel = '.row .col i'
        this.collegueInfoTech = '.row .col span'

    }
    /*--------------------------------------------------------------------------------------------
    *Select technologies on 'New Person' form 
    *
    */
    selectTech(numOfTech,...tech){
        cy.get(this.peopleSelectTech).click()

       for(var i = 0; i<numOfTech; i++){
        cy.get(this.peopleOptions).contains(tech[i]).click()
       }
    }
    /*--------------------------------------------------------------------------------------------
    * Select seniority on 'New Person' form 
    */
    selectSeniority(seniority){
        cy.get(this.peopleSelectSeniority).click()
        cy.get(this.peopleOptions).contains(seniority).click()
    }
    /*--------------------------------------------------------------------------------------------
    * Select seniority on 'New Person' form 
    */
    selectTeam(team){
        cy.get(this.peopleSelectTeam).click()
        cy.get(this.peopleOptions).contains(team).click()
    }

    /*****************************************Methods****************************************/
    /******************************************************************************************
    *Create technology -> 'Technologies' tab
    *@param tech ex. Appium, Java
    */
   createTechnology(tech){
       cy.get(this.technologiesTab).click()
       cy.get(this.createTechnologyButton).click()
       cy.get(this.technologyTitleInput).type(tech)
       cy.get(this.submitTechButton).click()
   }
   /*******************************************************************************************
    * Create seniorities -> 'Seniorities' tab
    * @param seniority ex. Junior, Intermediate, Senior
    */
   createSeniorities(seniority){
    cy.get(this.senioritiesTab).click()
    cy.get(this.createSeniorityButton).click()
    cy.get(this.seniorityTitleInput).type(seniority)
    cy.get(this.submitSeniorityButton).click()

   }
   /*******************************************************************************************
    * Create team 
    * @param team 
    */
   createTeam(team){
    cy.get(this.teamTab).click()
    cy.get(this.createTeamButton).click()
    cy.get(this.teamTitleInput).type(team)
    cy.get(this.submitSeniorityButton).click()

   }
   /*******************************************************************************************
    * This method will add/create a new collegue. -> 'New person' form
    * 
    * @param name
    * @param seniority
    * @param team
    * @param numOfTech Number of technologies -> used as counter 
    * @param tech List of technologies
    * 
    * */
   addCollegue(name, seniority, team, numOfTech, ...tech){
       
       cy.get(this.peopleTab).click()
       cy.get(this.peopleCreateButton).click()
       
       cy.get(this.peopleFullNameInput).type(name) //Enter full name
       this.selectTech(numOfTech,...tech)  //Fill technologies
       this.selectSeniority(seniority)   //Select seniority
       this.selectTeam(team)  //Select team

       cy.get(this.submitNewCollegueButton).click()
       
   }
   /*******************************************************************************************
    * Select collegue in 'New Project' form 
    * 
    * @param collegue Full name of the collegue
    * 
    */
   selectCollegue(collegue){
    cy.get(this.projectSelectPeople).click()
    cy.get(this.peopleOptions).contains(collegue).click()
}
   /*********************************************************************************************
    * Create a new project and add collegue.
    * 
    * @param name Project name
    * @param collegue Full name of the collegue
    * 
    */
   addProject(name, collegue){
       
    cy.get(this.projectsTab).click()
    cy.get(this.createProjectButton).click()
    
    cy.get(this.projectTitleInput).type(name)  //Enter project name
    this.selectCollegue(collegue)   //Select collegue

    cy.get(this.submitNewProjectButton).click()
    
}
/************************************************************************************************
* Used for asserting technologies on 'Edit Person' form 
* @param tech 
* 
*/
assertAddedTechnologies(...tech){
    let parsedText
    cy.get(':nth-child(2) > :nth-child(1) > .react-dropdown-select > .react-dropdown-select-content').invoke('text').then(($loc)=>{  
        parsedText = $loc.split("×") 
        parsedText.pop()

        expect(parsedText).to.have.members(tech)
    })
   }
/*******************************************************************************************
    * Used for asserting that collegue was successfuly added/created.
    * 
    * Goes after @addCollegue method
    * 
    * @param {} loc  
    * @param {*} collegueName 
    */
   assertCollegueWasAdded(loc, collegueName){

    cy.get(loc).then(($elements)=>{
        let list =[];
        for(let el of $elements){
            cy.get(el).invoke('text').then((t)=>{
                list.push(t)
            })
        } 
        cy.wrap(list).as('peopleList')
        cy.get('@peopleList').then((p)=>{
            expect(p).to.include(collegueName)
        })
    })
}

 /**************************************************************************************************
    * Used for asserting that project was successfuly added.
    * 
    * @param loc Project list
    * @param projectName 
    */
   assertProjectWasAdded(loc, projectName){

    cy.get(loc).then(($elements)=>{
        let list =[];
        for(let el of $elements){
            cy.get(el).invoke('text').then((t)=>{
                list.push(t)
                expect(list).to.include(projectName)
            })
        } 
        // cy.wrap(list).as('projectList')
        // cy.get('@projectList').then((p)=>{
        //     expect(p).to.include(projectName)
        // })
    })
}

/**************************************************************************************************
    * Used for asserting in details that collegue was successfuly added on project.
    * 
    * @param collegueName 
    * @param seniority 
    * @param tech 
    * 
    * 
    */
   assertCollegueDetails( collegueName, seniority, ...tech){ 

        var listHardcoded = [collegueName, seniority, ...tech]  //List of data to be checked 
        var listCollected = [];  //Data that will be collected

        cy.get(this.collegueInfoName).invoke('text').then((n)=>{
            listCollected.push(n)
            cy.get(this.collegueInfoLevel).invoke('text').then((l)=>{
                listCollected.push(l)
                cy.get(this.collegueInfoTech).invoke('text').then((t)=>{   //text:' Java,  Appium'
                    
                    let g = t.split(",")    // text: ' Java',' Appium'
                    
                    for(var i of g){                    
                        listCollected.push(i.trim())  // text: 'Java'
                    }
                    for(var j = 0; j<listCollected.length; j++){
                        expect(listCollected[j]).to.equal(listHardcoded[j])
                    }
                })
            })
        })
}

}
module.exports = new Playground();