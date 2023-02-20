const {readFileSync, writeFileSync} =require('fs');
const {getPositionById , getPositionByQuery} =require('./positions');
const {validator} = require('./validation')
const dbFileName = 'dbs.json';
const dbsDir = `./files/${dbFileName}`;
const dbsFolderDir = './files';

function updateDataById(userId , recordId , query){
    const key = Object.keys(query)[0];
    if(key == 'recordId')
    return {message : 'NON-UPDATABLE PROPERTY: this property can not be modified'}
    var db =readFileSync(dbsDir ,'utf-8');
    var allDb = JSON.parse(db);
    db =JSON.parse(db);
    if(!db[userId])
    return {message:'WRONG USER ID: no data for this user' , status:400}
    db=db[userId].data;
    const position = getPositionById(userId , recordId);
    if(position.status == 400)
    return position;
    // return position
    const modelName = db[position].modelName;
    const data= db[position];
    Object.assign(data, query)
   delete data.recordId
//    return q;
// return q
//    return {data ,s: db[position]}
    const validData = validator(data , userId , modelName);
    // return validData
    if(validData.status ==400)
    return validData;
    data.recordId = recordId;
    // db[position] =data
     allDb[userId].data[position] = data;
    //  return allDb[userId]
    allDb = JSON.stringify(allDb)
    writeFileSync(dbsDir , allDb , 'utf-8');
    return {message : 'SUCCESS UPDATING: data has been updated successfully ' , status:200}
    return db
    return validData
    // const modelName = db[position].modelName;
    // return position
    // const validData = validator(query , userId , modelName);
    return validData;
    return db[position]
}

module.exports = {
    updateDataById
}