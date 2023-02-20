const validator = require('./model-files/validation.js');
const storer = require('./model-files/storing');
const dbValidator = require('./db-files/validation') ;
const dbStorer = require('./db-files/storing');
const dbView = require('./db-files/views');
const modelView = require('./model-files/views');
const {deleteBublicatesByQuery , deleteDataByQueryOne,deleteDataByQueryAll , deleteDataByRecordId} = require('./db-files/delete')
const deleteDb = require('./db-files/delete');
const {getPositionById , binarySearch} =require('./db-files/positions')
const updateDb = require('./db-files/update')


const model = {
    patientName: {type : 's'},
    gender : {type:'s' }, 
    disease : {type : 's' }
    
};
const data = {
    patientName: 'moaaz',
    gender:'male', 
    disease:'flue'
    
    
}


// Models actions
// const w =validator.modelValidation(model)
// const models  =storer.allModelsAdmin();
// const newModel = storer.modelize(model , "patients",5);
// const deleteModel = storer.deleteModel(1 , "second")
// const viewModelsAdmin = modelView.viewModelsAdmin(0)
// const viewModelsUser = modelView.viewModelsUser(1)

//DB actions
//Find data
// const findDataById = dbView.findDataById(1, 7);
// const findDataByQuery = dbView.findDataByQuery(1,'users' , {username : 's'});
// const viewDb = dbView.viewDbUser(2)
//Update
const updateById= updateDb.updateDataById(5 , 2 , {patientName:'Ahmed'})
//Validation
// const validateDbKeys = dbValidator.validateDataKeys(data ,4,'first')
// const validateDbValues = dbValidator.validateDataValues(data , 4 , 'first')
// const prepare = dbValidator.prepare(data ,1 , 'users')
//Enc Dec
// const encrypt = dbValidator.encrypt('aaa')
// const decrypt = dbValidator.decrypt('U2FsdGVkX19oCXXXM3uFAmHRoNSCf5u+IYDjj5Yw4+M=')
//New data
// const newData= dbStorer.saveData(data ,5, 'patients')
//Delete
// const deleteByRecordId = deleteDb.deleteDataByRecordId(1,3)
// const deleteByQueryOne = deleteDb.deleteDataByQueryOne(1 , 'users' , {username:'wesds'})
// const deleteByQueryAll = deleteDb.deleteDataByQueryAll(1 , 'users' , {username:'asdww'})
// const deleteDubs = deleteDb.deleteBublicatesByQuery(1 , 'users' , {username:'asdww'})
// const deleteData = deleteDb.getPositionByQuery(1 ,{username:"mohamed123"})
//Get positions
// const getPositionByQuery= deleteDb.getPositionByQuery(1 ,'patients',{email : 'moaaz@email.com'} )
// const modelPosition = deleteDb.getModelPosition(2 , 'books')

//Logs

// console.log(w)
// const bst = storer.binarySearch([1,2,3,4,5,6,7,8,9,10] , 7)
// console.log(deleteModel)
// console.log(newModel)
// console.log(models)
// console.log(dbValidator)
// console.log(validateDbKeys)
// console.log(validateDbValues)
// console.log(encrypt)
// console.log(decrypt)
// console.log(prepare)
// console.log(newData)
// console.log(viewDb.res);
// console.log(viewModelsUser.res)
// console.log(viewModelsAdmin)
// console.log(deleteByRecordId)
// console.log(deleteByQuery)
// console.log(deleteByQueryAll)
// console.log(deleteDubs)
// console.log(getPositionByQuery)
// console.log(modelPosition)
// console.log(deleteByQueryOne)
// console.log(getPositionById(1 , 4))
// console.log(binarySearch([1,2,3],2))
// console.log(findDataById)
// console.log(findDataByQuery)
console.log(updateById)