
class PlaygroundApis {

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
            // return token
        })
    }
// *****************************************Project****************************************
getAllProjectsIds(token, idList){
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseURL') + 'projects/all',
        headers: {
            "authorization": 'Bearer ' + token
        }
    }).then((response)=>{
        for (var i =0; i< response.body.length; i++){
            idList.push(response.body[i].project_id)
        }
        cy.wrap(idList).as('idList')
    })
}
deleteAllProjects(list, token){
    for(var i =0; i < list.length; i++){
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseURL') + 'projects/project/'+list[i],
        headers: {
            "authorization": 'Bearer ' + token
        }
    })
}
}

// *****************************************Teams****************************************
getAllTeamIds(token, idList){
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseURL') + 'roles/all',
        headers: {
            "authorization": 'Bearer ' + token
        }
    }).then((response)=>{
        for (var i =0; i< response.body.length; i++){
            idList.push(response.body[i].role_id)
        }
        cy.wrap(idList).as('idList')
    })
}
deleteAllTeams(list, token){
    for(var i =0; i < list.length; i++){
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseURL') + 'roles/role/'+list[i],
        headers: {
            "authorization": 'Bearer ' + token
        }
    })
}
}

// *****************************************People****************************************
getPeopleIds(token, idList){
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseURL') + 'people/all',
        headers: {
            "authorization": 'Bearer ' + token
        }
    }).then((response)=>{
        for (var i =0; i< response.body.length; i++){
            idList.push(response.body[i].people_id)
        }
        cy.wrap(idList).as('idList')
    })
}
deletePeople(list, token){
    for(var i =0; i < list.length; i++){
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseURL') + 'people/person/'+list[i],
        headers: {
            "authorization": 'Bearer ' + token
        }
    })
}
}

// *****************************************Seniorities****************************************
getSenioritiesIds(token, idList){
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseURL') + 'seniorities/all',
        headers: {
            "authorization": 'Bearer ' + token
        }
    }).then((response)=>{
        for (var i =0; i< response.body.length; i++){
            idList.push(response.body[i].seniority_id)
        }
        cy.wrap(idList).as('idList')
    })
}
deleteSeniorities(list, token){
    for(var i =0; i < list.length; i++){
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseURL') + 'seniorities/seniority/'+list[i],
        headers: {
            "authorization": 'Bearer ' + token
        }
    })
}
}

// *****************************************Technologies****************************************
getTechnologiesIds(token, idList){
    cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseURL') + 'technologies/all',
        headers: {
            "authorization": 'Bearer ' + token
        }
    }).then((response)=>{
        for (var i =0; i< response.body.length; i++){
            idList.push(response.body[i].technology_id)
        }
        cy.wrap(idList).as('idList')
    })
}
deleteTechnologies(list, token){
    for(var i =0; i < list.length; i++){
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseURL') + 'technologies/technology/'+list[i],
        headers: {
            "authorization": 'Bearer ' + token
        }
    })
}
}
}
module.exports = new PlaygroundApis();