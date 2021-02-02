
class ReportingApis {
    constructor() {

    }

    //Get token
    
    getToken(){
        let token
        cy.request({
            method: 'POST',
            url: Cypress.env('baseURL') + 'api/users/login',
            body: {
                "email": Cypress.env('username'),
                "password": Cypress.env('password')
            }
        }).then((response)=>{
            token = response.body.token;
            cy.wrap(token).as('token')
            // return token
        })
    }
    /**
     * Create an issue
     * 
     *
     */
    createAnIssue(body){
        cy.get('@token').then((token)=>{

            cy.request({
                method: 'POST',
                url: Cypress.env('baseURL') + 'api/reports/report',
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
     /**
     * Assert created issue
     * @param  data 
     */
    assertCreatedIssue(data){
        cy.get('@response').then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body.summary).to.eql(data)      
        })
    }
    
    /**
     * Edit an issue
     * 
     *
     */
    editAnIssue(body){
        cy.get('@token').then((token)=>{
            cy.get('@user_id').then((user_id)=>{
                console.log(user_id)
                cy.request({
                    method: 'PUT',
                    failOnStatusCode: false,
                    url: Cypress.env('baseURL') + 'api/reports/'+ report_id,
                    headers: {
                        "authorization": 'Bearer ' + token
                    },
                    body: body
                }).then((response)=>{
                    // cy.wrap(response).as('response1')
                    expect(response1.status).to.equal(200)
                 
                })
            })
        })
    }
   
    /**
     * Assert created issue
     * @param  data 
     */
    assertEditedIssue(data){
        cy.get('@response1').then((response)=>{
            // expect(response1.status).to.equal(200)
            // expect(response.body.summary).to.eql(data)

            console.log(response.uder_id)
            expect(response.body.summary).to.eql(data)

            
        })
    }
    /**
     * Get all reports id
     * 
     */
    getAllReportIds(){
        var idList = [];
        cy.get('@token').then((token)=>{
        cy.request({
            method: 'GET',
            url: Cypress.env('baseURL') + 'api/reports/all',
            headers: {
                "authorization": 'Bearer ' + token
            }
        }).then((response)=>{
            for (var i =0; i< response.body.length; i++){
                idList.push(response.body[i].report_id)
            }
            cy.wrap(idList).as('idList')
        })
    })
}
/**
 * Delete all reports
 */
    deleteAllReports() {
        cy.get('@token').then((token)=>{
            cy.get('@idList').then((list)=>{
                for(var i =0; i < list.length; i++){
                    cy.request({
                        failOnStatusCode: false,
                        method: 'DELETE',
                        url: Cypress.env('baseURL') + 'api/reports/'+list[i],
                        headers: {
                            "authorization": 'Bearer ' + token
                        }
                    })
                }
            })
        }) 
    }
}

module.exports = new ReportingApis();