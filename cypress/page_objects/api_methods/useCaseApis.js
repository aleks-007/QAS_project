
class UseCaseApis {

    //Get token
    getToken(){
        let token
        cy.request({
            method: 'POST',
            url: Cypress.env('apiBaseURL') + 'users/login',
            body: {
                "email": Cypress.env('username'),
                "password": Cypress.env('password')
            }
        }).then((response)=>{
            token = response.body.token;
            cy.wrap(token).as('token')
        })
    }

    //Create a use case
    createAUsecase(body){
        cy.get('@token').then((token)=>{

            cy.request({
                method: 'POST',
                url: Cypress.env('apiBaseURL') + 'usecases/usecase',
                headers: {
                    "authorization": 'Bearer ' + token
                },
                body: body
            }).then((response)=>{
                cy.wrap(response).as('response')
                cy.wrap(response.body.user_id).as('user_id')
            })
        })
    }

    //Assert created use case
    assertCreatedUseCase(test_body){
        cy.get('@response').then((response)=>{
            expect(response.status).to.equal(200)

            expect(response.body.title).to.equal(test_body.title)
            expect(response.body.teststeps).to.eql(test_body.teststeps)
            expect(response.body.expected_result).to.equal(test_body.expected_result)
            expect(response.body.description).to.equal(test_body.description)
            expect(response.body.automated).to.equal(test_body.automated)
        })
        
    }
    getLastCreatedUseCaseId(){
        cy.get('@token').then((token)=>{
                cy.request({
                    method: 'GET',
                    failOnStatusCode: false,
                    url: Cypress.env('apiBaseURL') + 'usecases/all',
                    headers: {
                        "authorization": 'Bearer ' + token
                    }
                }).then((response)=>{
                        cy.wrap(response.body[0].usecase_id).as('usecase_id')
                })
            })
    }
    //Edit use case
    editUseCase(body){
        this.getLastCreatedUseCaseId()
        cy.get('@token').then((token)=>{
            cy.get('@usecase_id').then((usecase_id)=>{
                cy.request({
                    method: 'PUT',
                    failOnStatusCode: false,
                    url: Cypress.env('apiBaseURL') + 'usecases/usecase/'+ usecase_id,
                    headers: {
                        "authorization": 'Bearer ' + token
                    },
                    body: body
                }).then((response)=>{
                    cy.wrap(response).as('response_editUseCase')                 
                })
            })
        })
    }
     //Assert created use case
     assertEditedUseCase(test_body){
        cy.get('@response_editUseCase').then((response)=>{
            cy.get('@user_id').then((user_id)=>{
            expect(response.status).to.equal(200)

            expect(response.body.user_id).to.equal(user_id)
            expect(response.body.title).to.equal(test_body.title)
            expect(response.body.teststeps).to.eql(test_body.teststeps)
            expect(response.body.expected_result).to.equal(test_body.expected_result)
            expect(response.body.description).to.equal(test_body.description)
            expect(response.body.automated).to.equal(test_body.automated)
            })
        })
    }
    //Delete use case
    deleteUsecase(){
        var last = this.getLastCreatedUseCaseId()
        cy.get('@token').then((token)=>{
            cy.get('@usecase_id').then((usecase_id)=>{
                cy.request({
                    method: 'DELETE',
                    failOnStatusCode: false,
                    url: Cypress.env('apiBaseURL') + 'usecases/usecase/'+ usecase_id,
                    headers: {
                        "authorization": 'Bearer ' + token
                    }
                }).then((response)=>{
                    cy.wrap(response).as('response_deleteUseCase')        
                    cy.wrap(last).as('last')
                })
            })
        })
    }
     //Assert deleted use case
     assertDeletedUseCase(){
            cy.get('@response_deleteUseCase').then((response)=>{
                expect(response.status).to.equal(200)
            })
    }
    //************************************************************************************************ */
    getAllUseCaseIds(token, idList){
        cy.request({
            method: 'GET',
            url: Cypress.env('apiBaseURL') + 'usecases/all',
            headers: {
                "authorization": 'Bearer ' + token
            }
        }).then((response)=>{
            for (var i =0; i< response.body.length; i++){
                idList.push(response.body[i].usecase_id)
            }
            cy.wrap(idList).as('idList')
        })
    }
    deleteAllUseCases(list, token){
        for(var i =0; i < list.length; i++){
        cy.request({
            method: 'DELETE',
            url: Cypress.env('apiBaseURL') + 'usecases/usecase/'+list[i],
            headers: {
                "authorization": 'Bearer ' + token
            }
        })
    }
}

}
module.exports = new UseCaseApis();