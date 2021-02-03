import UseCaseApis from '../../page_objects/api_methods/useCaseApis'
let fileData = 'data.json'
let data;  //Variable used for handling json file


describe("Create, edit and delete an issue in report section", ()=>{
    before( async function() {
        data = await cy.fixture(fileData)
        UseCaseApis.getToken()
    })
    it("Create, edit and delete use case", ()=>{
        /** Create an use case and assert data */
        UseCaseApis.createAUsecase(data.test_body)
        UseCaseApis.assertCreatedUseCase(data.test_body)
        /**Edit created use case and asert data */
        UseCaseApis.editUseCase(data.test_edit_body)
        UseCaseApis.assertEditedUseCase(data.test_edit_body)
        /**Delete use case */
        UseCaseApis.deleteUsecase()
        UseCaseApis.assertDeletedUseCase()
    })
})