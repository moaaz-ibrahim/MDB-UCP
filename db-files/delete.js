const {readFileSync , writeFileSync} = require('fs');
const {getPositionById , getPositionByQuery}= require('./positions')

const dbFileName = 'dbs.json';
const dbsDir = `./files/${dbFileName}`;
const dbsFolderDir = './files';


function deleteDataByRecordId(userId , recordId){
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    if(!db[userId])
    return{message : 'WRONG USER ID: wrong user id' , status:400}
    const position = getPositionById(userId,recordId)
    if(position .status==400)
    return {message :'WRONG RECORD ID' , status :400} 
//  return position
const deleteTarget = db[userId].data[position];
    db[userId].data.splice(position, 1)
    // db[userId].data.splice(position,1)
    const newDb =  db[userId];
    db = JSON.stringify(db)
    writeFileSync(dbsDir , db , 'utf-8')
    return {deleteTarget  , status: 200};
}
function deleteDataByQueryOne(userId , modelName,query){
    const positions=  getPositionByQuery(userId , modelName , query)
    if(positions.status ==400)
    return positions
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    const deleteTarget = db[userId].data[positions[0].modelPosition]
    db[userId].data.splice(positions[0].modelPosition , 1)
    const newDb = db[userId]
    db = JSON.stringify(db)
    writeFileSync(dbsDir , db , 'utf-8')
 return {deleteTarget , status:200}
}
function deleteBublicatesByQuery(userId , modelName,query){
    const positions=  getPositionByQuery(userId , modelName , query)
    // return positions
    if(positions.status ==400)
    return positions
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    const deleteTarget =[];
    // const deleteTarget = db[userId].data[positions[0].modelPosition]
    for(i=0;i<positions.length ; i++){
        deleteTarget.push(db[userId].data[positions[i].modelPosition])
        db[userId].data.splice(positions[i].modelPosition , 1)
    }
    const newDb = db[userId]
    db = JSON.stringify(db)
    writeFileSync(dbsDir , db , 'utf-8')
 return deleteTarget
}
function deleteDataByQueryAll(userId , modelName,query){
    const positions=  getPositionByQuery(userId , modelName , query)
    // return positions
    if(positions.status ==400)
    return positions
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    const deleteTarget =[];
    // const deleteTarget = db[userId].data[positions[0].modelPosition]
    for(i=0;i<positions.length ; i++){
        deleteTarget.push(db[userId].data[positions[i].modelPosition])
        db[userId].data.splice(positions[i].modelPosition , 1)
    }
    const newDb = db[userId]
    db = JSON.stringify(db)
    writeFileSync(dbsDir , db , 'utf-8');
 return   deleteDataByQueryOne(userId , modelName , query);
 
}


module.exports= {
    // getPositionByQuery,
    deleteDataByRecordId,
    deleteDataByQueryOne,
    deleteDataByQueryAll,
    deleteBublicatesByQuery
    
}