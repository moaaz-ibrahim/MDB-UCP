require('dotenv').config()
const {readFileSync} = require('fs');
const CryptoJs = require('crypto-js')
const modelsDir = `./files/models.json`;
var models= readFileSync(modelsDir , 'utf-8');
models = JSON.parse(models)

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
function validateDataKeys(data , userId, modelName){
    data.modelName = modelName
   
    if(!models[userId])
    return {message : 'WRONG USER ID', status:400}
    var model = models[userId].models;
    const modelExist = modelNameExist(model , modelName)
    if(!modelExist)
    return { message : 'WRONG MODEL NAME: model name doesnot exist' , status:400};
    const position = modelExist.position;
    model= model[position];
    // return {model , data,status:400}
// return {data , model}
    if( model === undefined || model=== null)
    return {message : 'No such a model for this user' , status : 400}
    else { 
        const modelKeys = Object.keys(model);
        // console.log('keys : ' + modelKeys)
        const dataKeys = Object.keys(data);
        if(modelKeys.length != dataKeys.length)
        return {message : `VALIDATION ERR: data doesn't equal the assigned model` , status : 400};
        else {
            for(i=0 ; i<modelKeys.length ;i++) 
            if(modelKeys[i] != dataKeys[i])
            return {message : `WRONG KEYS: data keys doesn't eqaul the assigned model at (${dataKeys[i]})` , status :400}
         return {message : 'SUCCESS VALIDATION: valid keys' , status : 200}
        }
    }
}

// var encryptionList =[];
function validateDataValues(data , userId , modelName){
    const dataValues = Object.values(data);
    const dataKeys = Object.keys(data);
    var model = models[userId].models;
    // const userModels = models[userId].models;
    const modelExist = modelNameExist(model , modelName)
    if(!modelExist)
    return { message : 'WRONG MODEL NAME: model name doesnot exits' , status:400};
    const position = modelExist.position;
    model = model[position]

    if( model === undefined || model === null)
    return {message : 'No such a model for this user' , status : 400}
    
    // return model
    const modelvalues = Object.values(model);
    

// return modelvalues
// console.log(dataValues)
const dataValuesLength = dataValues.length ;

// if(w=='string')
// return 1;
const modelValuesLength = modelvalues.length;
    for(i=0;i<dataValuesLength;i++)
    {
        // console.log(modelvalues[i].enc)
        // if(modelvalues[i].enc) {
            // const e = dataValues[i];
            // dataValues[i] = encrypt(`${e}`)
        //   console.log(dataKeys[i] , dataValues[i])
        // }
        
        const dataType = typeof dataValues[i];
        if(modelvalues[i].type =='s'){
            if(dataType!= 'string')
            return {message : `WRONG DATATYPE: wrong data type for key(${dataKeys[i]})` , status:400}
        }
        
        if(modelvalues[i].type =='n'){
            if(dataType!= 'number')
            return {message : `WRONG DATATYPE: wrong data type for key(${dataKeys[i]})` , status:400}
        }
    }
    return {message : 'SUCCESS VALIDATION : valid values' , status : 200 , data };
}
function encrypt (data ){
const encData= CryptoJs.AES.encrypt(data , process.env.ENC_KEY)
return encData.toString()
}
function decrypt (data ){
const decData= CryptoJs.AES.decrypt(data , process.env.ENC_KEY)
return decData.toString(CryptoJs.enc.Utf8)
}
function validator (data , userId,modelName){
    // const w= 'dataKeys'
    const validateKeys = validateDataKeys(data , userId ,modelName);
    if(validateKeys.status == 400)
    return validateKeys 
    const validateValues = validateDataValues(data , userId,modelName);
    if(validateValues.status ==400)
    return validateValues;
    return {message : 'SUCCESS VALIDATION: passed data is valid' ,status:200}
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
function prepare(data , userId , modelName){
    // if()

const validData = validator(data , userId ,modelName);

if(validData.status ==400)
return validData;
// suppose to return a data that will be insert into db
var model = models[userId].models;
const userModels = models[userId].models
const modelExist = modelNameExist(userModels , modelName)
if(!modelExist)
 return{message: 'WRONG MODEL NAME: no model matches the specified model name' , status:400}
 const position = modelExist.position;
//  return position;
model = model[position]
const modelValues = Object.values(model)
const dataValues = Object.values(data);
// return modelValues[0]
// return modelValues
const dataKeys = Object.keys(data)
const length = dataValues.length-1;
var encryptionList =[];
for(i=0;i<length ; i++){
    if(modelValues[i].enc)
    encryptionList.push(i)
}
for(i=0;i<encryptionList.length ; i++)
{
    dataValues[encryptionList[i]] = encrypt(dataValues[encryptionList[i]]) 
}

model = `{`;
for(i=0;i<length ; i++){
    if(i+1 >= length)
    model += `"${dataKeys[i]}" :"${dataValues[i]}"}`
else
    model += `"${dataKeys[i]}" :"${dataValues[i]}",`
    
}
try {
    model=  JSON.parse(model)
    
} catch (error) {
    return {message : 'WRONG JSON FORMAT: non-accepted format has been passed' , status : 400}
}
// model.userId = userId
model.modelName = modelName
return {message : 'SUCCESS PREPARATION: data is ready to be inserted' ,model , status : 200}
}
//record Id must be added in next phase 

module.exports = {
    validateDataKeys , 
    validateDataValues,
    encrypt, decrypt,
    validator,
    prepare
}