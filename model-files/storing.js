const {readFileSync
     , readdirSync,
    writeFileSync , 
createReadStream} = require('fs');
const {modelValidation} = require('./validation');
//tabnine
//Directory should start from file that import this file (app.js) (idk why actually but it worked)
const modelFileName = 'models.json';

const modelsDir = `./db-files/${modelFileName}`;
const modelsFolderDir = './db-files';
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
function readModels (){
    // chunk and buffers may be needed on a bigger scale 
    // const buffer = createReadStream(modelsDir , 'utf-8');
    // buffer.on('data' ,(chunk) )
    const file = readFileSync(modelsDir ,'utf-8');
    return file;
}

function newModel(model , userId){
    var models= readFileSync(modelsDir , 'utf-8');
    models = JSON.parse(models)
    model.userId = userId;
    models[userId] = model ;
    models = JSON.stringify(models)
    const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
    return {message : 'ADDING MODEL: success adding new model' , status : 200}
    // return updatedFile;
    
}
function updateModel(model , userId ){
    // const userId = model.userId
    var models = readFileSync(modelsDir , 'utf-8');
    models =JSON.parse(models);
    models[userId] = model;
    models[userId].userId = userId;
    models = JSON.stringify(models)
    
    const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
    return {message : `MODEL UPDATED : successfully updating model for userId: ${userId}` , status : 200}
}

function addModel(model , userId){
    if (!model || !userId)
    return {message : 'MISSING ARGUMENT' , status : 400}
    else {
const u = userIdExist(userId);
// console.log(u)
        if(!userIdExist(userId))
        {
            const result = modelValidation(model)
            if(result.status ==200){
                var createModel = newModel(model , userId) ;
                // createModel = JSON.parse(createModel.result);
                return createModel
            }
            else return result;
           
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
    jsonModels.forEach(jModel=>{
        const modelUserId = jModel.userId;
        if(modelUserId)
        if(modelUserId == userId)
        exist = true;
    })
    return exist;
}
function deleteModel (userId){
    var models = readFileSync(modelsDir , 'utf-8');
    models = JSON.parse(models);
   if(models[userId] === null){
       models.splice(userId , 1);
       
       models = JSON.stringify(models)
       const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
       
       return {message : 'No model has assigned for this userId' , status : 400};
} 
    const position = userId
    if(!models[position]) return {message : 'No model has assigned for this userId' , status : 400};
    // if(!models[position])
    else {
        models.splice(position , 1);
        
        models = JSON.stringify(models)
        const updatedFile= writeFileSync(modelsDir  ,models , 'utf-8');
        return {message : 'DELETING MODEL: success deleting form for userId: '+userId , status:200};
       
    }
}

function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
      
         if (sortedArray[middle].userId === key) {
            // found the key
            return middle;
        } else if (sortedArray[middle].userId < key) {
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