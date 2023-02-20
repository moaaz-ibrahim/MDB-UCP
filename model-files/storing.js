const {readFileSync
     , readdirSync,
    writeFileSync , 
createReadStream} = require('fs');
const {modelValidation} = require('./validation');
//tabnine
//Directory should start from file that import this file (app.js) (idk why actually but it worked)
const modelFileName = 'models.json';

const modelsDir = `./files/${modelFileName}`;
const modelsFolderDir = './files';
function viewAllModels() {
    const fileExist = modelFileExist();
    if(!fileExist){
        createModelsFile()
        return {message : 'File created'}
    }
    else {
        var models = readFileSync(modelsDir , 'utf-8')
        const  parsedModel = JSON.parse(models)
        // console.log(parsedModel)
        return parsedModel
        // console.log(file.length , file)
    }
}
function createModelsFile(){
    writeFileSync(modelsDir , '[{}]' , 'utf-8')
    return {message : "file Created successfully"}
}
function modelFileExist(){
    const folderDir = readdirSync(modelsFolderDir );
    for(i=0;i<folderDir.length ; i++ )
    if(folderDir[i]== modelFileName)
    return true ;
    return false

}
function modelNameExist (models , modelName){
    // modelName = String(modelName)
    // console.log(modelName)
//   return  models[0].modelName == modelName
    
    for(i=0;i<models.length ;i++)
    {
        if(models[i].modelName == modelName)
        return {exist : true , position : i}
    }
     return false
}

function newModel(model , userId , modelName){
    var models= readFileSync(modelsDir , 'utf-8');
    models = JSON.parse(models)
   
    // models[userId].userId = userId ;

    if(!userIdExist(userId))
    {
        model.modelName = modelName;
        model={
            userId: userId,
            models:[model]
        }
        // model = JSON.parse(model)
        models[userId] = model ;
        models = JSON.stringify(models)
        const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
        return {message : 'ADDING MODEL: success adding new model' , status : 200}
    }
    else {
        var userModels = models[userId].models;
        // return modelNameExist(userModels , modelName)
        const modelExist = modelNameExist(userModels , modelName);
        // return modelExist
        if(modelExist.exist)
       return updateModel(model , modelName , userId , modelExist.position)
        model.modelName = modelName ;
        userModels.push(model);
        userModels = {
            userId : userId ,
            models : userModels
        }
        models[userId] = userModels;
        models = JSON.stringify(models)
        const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
        return {message : 'ADDING MODEL: success adding new model' , status : 200}

        
    }
    // model.userId = userId;
  
    // return updatedFile;
    
}
function updateModel(model , modelName , userId , position ){
    // const userId = model.userId
    model.modelName = modelName;
    var models = readFileSync(modelsDir , 'utf-8');
    models =JSON.parse(models);
models[userId].models[position] = model
   
    // models[userId] = model;
    // models[userId].userId = userId;
    models = JSON.stringify(models)
    
    const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
    return {message : `MODEL UPDATED : successfully updating model for userId: ${userId}` , status : 200}
}

function addModel(model , modelName , userId ){
    if (!model || !userId || !modelName)
    return {message : 'MISSING ARGUMENT' , status : 400}
    else {
const u = userIdExist(userId);
// console.log(u)
const result = modelValidation(model)
if(result.status ==200){
    var createModel = newModel(model , userId , modelName) ;
    // createModel = JSON.parse(createModel.result);
    return createModel
}
else return result;
        if(!userIdExist(userId))
        {
           
           
        }
        else
        {
            const result = modelValidation(model)
            
            if(result.status ==200)
          return updateModel(model , userId)
          else return result;
        //   newModel(models, userId , true) 
        }
        // return {message : `DUBLICATE USER ID : user id ${userId} has already assigned a model `}
        
        
    }
}
function userIdExist(userId) {
    const models = readFileSync(modelsDir , 'utf-8');
    var exist ;
    const jsonModels = JSON.parse(models)
    const model = jsonModels[userId];
    if(model == null || model == undefined)
    return 0
    else return 1
    // jsonModels.forEach(jModel=>{
    //     if(jModel.userId == null || jModel.userId== undefined)
    //     return exist
    //     const modelUserId = jModel.userId;
    //     if(modelUserId)
    //     if(modelUserId == userId)
    //     exist = true;
    // })
    return exist;
}
function deleteModel (userId, modelName){
    var models = readFileSync(modelsDir , 'utf-8');
    models = JSON.parse(models);
   if(models[userId] == null ){
       models.splice(userId , 1);
       
       models = JSON.stringify(models)
    //    const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
       
       return {message : 'No model has assigned for this userId' , status : 400};
} 
const userModels = models[userId].models;
// return userModels
    const position = modelNameExist(userModels , modelName).position;
    if(position == null || position==undefined)return {message : 'WRONG MODEL NAME: the specified model name doesnot exist' , status : 400}

    if(!models[position]) return {message : 'No model has assigned for this userId' , status : 400};
    // if(!models[position])
    else {
        models[userId].models.splice(position , 1);
        
        models = JSON.stringify(models)
        const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
        return {message : 'DELETING MODEL: success deleting model for userId: '+userId , status:200};
       
    }
}

function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
      
         if (sortedArray[middle] == key) {
            // found the key
            return middle;
        } else if (sortedArray[middle] < key) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
	// key wasn't found
    return -1;
}

// console.log(view())
// console.log(readFileSync('./model.json' , 'utf-8'))
module.exports =  {
    allModelsAdmin : viewAllModels,
    modelize : addModel,
    deleteModel,
    
}