class UseCases {
   
      constructor(){

        //Locators
        this.backButton = '.fa-arrow-left'
        this.createUseCaseButton = '[data-testid="create_use_case_btn"]'
        this.useCaseContainer = '[class="list-group-item list-group-item-action"]'

        this.useCaseTitle = '[name="title"]'
        this.useCaseDesc = '[name="description"]'
        this.useCaseExpectedRes = '[name="expected_result"]'
        this.useCaseAutomatedRadio = '[data-testid="automated-switch"]'

        this.useCaseStep = '[id="stepId"]'
        this.useCaseStepId = '#stepId'

        this.useCaseAddStepButton = 'button[data-testid="add_step_btn"]'
        this.useCaseDeleteStepButton = '[data-testid="delete_usecase_step_btn"]'
        this.useCaseSubmitButton = '[data-testid="submit_btn"]'
        
      }
  
    /*--------------------------------------------------------------------------------------------
     * Function to set number of steps in use case
     * 
     * */
    addSteps(num_of_steps){
        for(var i = 1; i<num_of_steps; i++){
            cy.get(this.useCaseAddStepButton).click()
        }
    }
    /*--------------------------------------------------------------------------------------------
     * Function to fill use case steps
     * 
     * @num_of_steps Number of use csae test step
     * @step Test steps
     * */
    fillSteps( num_of_steps, ...step){
        for(var i = 0; i<num_of_steps; i++){
            cy.get('[name="testStepId-' + i + '"]').type(step[i]) //Locator suitable to iterate thrpugh steps
        }
    }
    /*--------------------------------------------------------------------------------------------
     * Method to count characters of existing values in input fields.
     * 
     * @param element Locator for input field which contain value 
     * 
     * As a return we wrap number.
     */
    countCharacters(element){
        cy.get(element).invoke('val').then((d)=>{
            var numOfChars = d.replace(" ", "").length
            cy.wrap(numOfChars).as('num')
        })
    }
    /*--------------------------------------------------------------------------------------------
     * Method will replace all input fields text with the number of characters that previously had.
     * ex. "Step 1"  ---> "This field previously had " + @num + " characters" 
     * 
     * @param el Locator for all input fields on the page
     */
    replaceInputWithNumber(el){
        let text;
         cy.get('@num').then((num)=>{ //@num wrapped number of charasters
            cy.get(el).clear().type("This field previously had " + num + " characters")
            text =  "This field previously had " + num + " characters"
            cy.wrap(text).as('inputText')
         })
         
    }
    /*********************************************Methods****************************************/

     /*******************************************************************************************
      * Create use case
      * 
      * @title Summary of the use case
      * boolean @desc_indicator Set true if you want to add description otherwise false.
      * @desc Description of the use case.
      * @expected_result Expected result.
      * @use_case_step Test step of the use case.
      * @num_of_steps This represent number of test steps.
      * @automated_switch Click if your test is automated otherwise no.
      * boolean @automated_indicator Set true if you want your test to be automated otherwise false.
      */

     createUseCase(title, desc_indicator, desc, expected_result, 
        num_of_steps, automated_indicator, ...step){

        cy.get(this.createUseCaseButton).click()

        //Add title
        cy.get(this.useCaseTitle).type(title)

        //Add description - optional
        if(desc_indicator===true){
            cy.get(this.useCaseDesc).type(desc)
        }
        //Add expected result
        cy.get(this.useCaseExpectedRes).type(expected_result)

        //Set test to be automated - optional
        if(automated_indicator===true){
            cy.get(this.useCaseAutomatedRadio).click({force:true})
        }

        //Add test steps
        this.addSteps(num_of_steps)
        
        //Fill steps
        this.fillSteps(num_of_steps, ...step)

        cy.get(this.useCaseSubmitButton).click({force:true})
    }
    /*********************************************************************************************
     * Edit input fields of use case. 
     * 
     * Input fields already contains values, 
     * so the method will collect value and count how many characters there are. 
     * After what it will update complete text with the phrase: 
     * 
     * "This field previously had " + num + " characters" 
     * @param use_case_title The ttle of the use case
     * 
     */
    editUseCaseInputFields(use_case_title){
        //Select test to edit
        let list = [];   //List for saving data after it was edited
        cy.get(this.useCaseContainer).contains(use_case_title).click()
        
        //Collect all input fields
        cy.get('input[type="text"],textarea', {multiple:true}).then(($elements)=>{
            
            for(let el of $elements){ //Iterate through all input fields
               this.countCharacters(el)
               this.replaceInputWithNumber(el)
               cy.get('@inputText').then((el)=>{
               list.push(el)  
            })
            }
            cy.wrap(list).as('finalList')
            cy.get(this.useCaseSubmitButton).click()
        })
    }
    /*******************************************************************************************
     * This method is actually assertion for all input fields on the Use Case page
     * Use it after you create the ue case.
     * 
     * @param steps  List containing all input fields of one use case
     */
    assertUseCaseSteps(...steps){
        cy.get('input[type="text"],textarea', {multiple:true}).then(($elem)=>{
            var i = 0;
            for(let el of $elem){
                cy.get(el).should('have.value', steps[i])
                i++;
            }
        })
    }
    /********************************************************************************************
     * This method is assertion for all input fields on the Use Case page in case 
     * we are about to edit test case. 
     * 
     * Use this after @editUseCaseInputFields method.
     * 
     * Could be changed for other purposes.
     */
    assertEditingUseCase(){
        cy.get('input[type="text"],textarea', {multiple:true}).then(($elem)=>{
            cy.get('@finalList').then((list) => {
                var i = 0;
                for(let el of $elem){
                    cy.get(el).should('have.value', list[i])
                    i++;
                }
            })
        })
    }
    
  }
  module.exports = new UseCases();