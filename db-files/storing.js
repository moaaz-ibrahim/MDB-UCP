const {readFileSync , writeFileSync,
readdirSync
} = require('fs');
const {prepare} = require('./validation');

const dbFileName = 'dbs.json';
const dbsDir = `./files/${dbFileName}`;
const dbsFolderDir = './files';


function viewDbAdmin() {
    const fileExist = modelFileExist();
    if(!fileExist){
        createDbFile()
        return {message : 'File created'}
    }
    else {
        var db = readFileSync(dbsDir , 'utf-8')
        const  parsedModel = JSON.parse(db)
        // console.log(parsedModel)
        return parsedModel
        // console.log(file.length , file)
    }
}
function createDbFile(){
    writeFileSync(dbsDir , '[{}]' , 'utf-8')
    return {message : "file Created successfully"}
}
function modelFileExist(){
    const folderDir = readdirSync(dbsFolderDir );
    for(i=0;i<folderDir.length ; i++ )
    if(folderDir[i]== dbFileName)
    return true ;
    return false

}

function saveData(data , userId , modelName){
    if(!data || !userId || !modelName)
    return {message : 'MISSING ARGUMENT' , status:400}
    
    const finalData = prepare(data , userId , modelName);
    if(finalData.status ==400)
    return finalData;
    else {
        // return finalData.model
        
        return newDataForUserId(finalData.model , userId , modelName)
    }
    }
    function lastRecordId(userId){
        
        var db = readFileSync(dbsDir , 'utf-8');
        db= JSON.parse(db);
        // const dat = db[userId].data;
     
        if(!db[userId])
        return 1;
        db = db[userId].data;
        var gId =0;
        // return db[0]
        for(i =0;i<db.length ;i++){
            if(db[i].recordId > gId)
            gId = db[i].recordId;
        }
        const newId = gId+1
        return newId
    }
function newDataForUserId(data , userId, modelName){
    var userDb = JSON.parse(readFileSync(dbsDir , 'utf-8'));
    var db = userDb;
    // data.modelName = modelName;
    // return userDb[userId]
  if(userDb[userId] == undefined || userDb[userId]==null)
   db[userId] ={userId , data : []}
   
   userDb = userDb[userId].data;
   const dataLength = userDb.length ;
   const recordId = lastRecordId(userId);
//    return recordId
   data.recordId = recordId;
    userDb.push(data);
    // userDb.push(modelName);
    // userDb.push(recordId);
    // const w = db;
    db=JSON.stringify(db)
    writeFileSync(dbsDir, db , 'utf-8')
    return {message : 'SUCCESS INSERTION: data saved in the DB successfully' ,data, status : 200}
}


module.exports = {
    saveData,
}