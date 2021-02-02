import UseCaseApis from '../../page_objects/api_methods/useCaseApis'
let fileData = 'data.json'
let data;  //Variable used for handling json file

//edit report
//delete report
describe("Create, edit and delete an issue in report section", ()=>{
    before( async function() {
        data = await cy.fixture(fileData)
        UseCaseApis.getToken()
    })
    it("Create, edit and delete use case", ()=>{
        UseCaseApis.createAUsecase(data.test_body)
        UseCaseApis.assertCreatedUseCase(data.test_body)
        
        UseCaseApis.editUseCase(data.test_edit_body)
        UseCaseApis.assertEditedUseCase(data.test_edit_body)

        UseCaseApis.deleteUsecase()
        UseCaseApis.assertDeletedUseCase()
    })
})