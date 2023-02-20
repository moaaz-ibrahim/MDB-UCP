
function validateModel(model){

// validator(model)
const modelValues = Object.values(model);
const modelName = model.modelName ;
// const mnv = modelNameValidation(modelName);


const vk = validKeyWords(modelValues);
const vv= validValues(model);

// console.log(vk);
if(vk.status == 200 && vv.status==200)
return {message : 'ACCEPTED MODEL' , status : 200}
else {
    if(vk.error)
    return vk
    else return vv ;
}
// console.log(vv)

}

function modelNameValidation(modelName){
    if(!modelName)
    return {message : 'MISSING MODEL NAME: model name must be specified' , status : 400};
    if(modelName== null || modelName==undefined)
    return {message : 'MISSING MODEL NAME: model name must be specified' , status : 400};
    if(typeof modelName == "number")
    return {message : 'WRONG MODEL NAME: non-accepted model name' , status : 400};
    
    return {message : 'SUCCESS' , status:200}
}

function validTypeValue (type){
    const availableTypes=['s' , 'n'];
    var successState ;
    var failedState ;
    for(i=0 ; i<availableTypes.length ; i++){
        if(type == availableTypes[i])successState= true;
        else failedState = true;
    }
    if (successState == failedState)
    return true;
    else return false
}
function validEncValue (type){
    const availableTypes=[0 , 1 , true , false];
    var successState ;
    var failedState ;
    for(i=0 ; i<availableTypes.length ; i++){
        if(type == availableTypes[i])successState= true;
        else failedState = true;
    }
    if (successState == failedState)
    return true;
    else return false
}
function validValues (passedModel) {
    const types = Object.values(passedModel);
    
    // console.log(types)
    var status ={};
    const length = types.length
    // console.log(length)
   types.forEach(type=>{
    if(!validTypeValue(type.type)){
        if(!type.type)
        status.error = `WRONG FORMAT : non-acceptable type has been passed`
        else status.error = `WRONG FORMAT : non-acceptable type has been passed at (type: ${type.type})`
        status.status=400;
    }
   })
   types.forEach(type=>{
    if(type.enc){
        if(!validEncValue(type.enc)){
            // if(!type.enc)
            // status.error = `WRONG FORMAT : non-acceptable enc has been passed`
             status.error = `WRONG FORMAT : non-acceptable enc has been passed at (enc: ${type.enc})`
            status.status=400;
        }

    }
   })
   const statusLength = Object.values(status).length; 
   if(statusLength == 0){
       status.success = `ACCEPTED VALUES`;
       status.status = 200;
   }
//    console.log(status)
   return status
}
function validKeyWords (modelValues){
    const status = {};
    // console.log(modelValues)
    var keys = [];
    modelValues.forEach(value=>{
        const modelKeys = Object.keys(value);
        // console.log(modelKeys)
        keys.push(modelKeys)
        
    })
    
    keys.forEach(key=>{
        // console.log(key)
        if(key.length > 1 ){
            
            key.forEach(k=>{
            
                const result = typeCheck(k);
                status.success = result.success;
                if(result.error)status.error = result.error;
                
                
            });
        }
        else{
            const result = typeCheck(key);
            if(result.error)status.error = result.error;
            status.success = result.success;
            
        }
        
        
        
    })
    const availableKeys = ['type' , 'enc'];
    if (status.error)
    return { error : `WRONG KWYWORDS : an invalid parameter has been passed, Allowed params are only (${availableKeys}) `, status:400};
    else return {success : 'ACCEPTED KEYWORDS' , status:200}

}
function typeCheck(type) {
    // console.log(type)
    const status = {}
    const availableKeys = [' ' ,'type' , 'enc'];
    for(i=0;i<availableKeys.length; i++){
        // console.log(availableKeys.top())
        if(type == availableKeys.top())
         status.success = true;
         availableKeys.pop();
    }
     if(!status.success)
     status.error =true;
     return status;
}

Array.prototype.top = function(){
    return this[this.length-1];
}
module.exports = {
    modelValidation : validateModel
}
