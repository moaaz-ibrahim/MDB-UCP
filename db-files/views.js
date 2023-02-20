const {readFileSync} = require('fs');
const {getPositionById , getPositionByQuery} = require('./positions')

const dbFileName = 'dbs.json';
const dbsDir = `./files/${dbFileName}`;
const dbsFolderDir = './files';

function viewDbAdmin (userId){
    var db = readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db);
    if(userId == 0)
        return{ res :db , status : 200};
    if(db[userId] == null || db[userId]==undefined)
    return {res: 'No data for this userId yet' , status : 400}
    else return{ res :db[userId] , status :200}
    
}
function viewDbUser(userId){
    var db = readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db);
    // return db[1]
    if(db[userId] == null || db[userId]==undefined)
    return {res: 'No data for this userId yet' , status : 400}
    else return{ res :db[userId] , status :200}

}

function findDataById (userId , recordId){
    var db = readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db);
    db = db[userId].data;
    const position = getPositionById(userId , recordId);
    const data = db[position]
    return data;
}

function findDataByQuery(userId, modelName ,query)
{
    const position = getPositionByQuery(userId ,modelName , query );
    if(position.status ==400)
    return position;
    var db = readFileSync(dbsDir,  'utf-8');
    db= JSON.parse(db);
    db = db[userId].data;
    return db[position[0].modelPosition];
}

module.exports = {
    viewDbUser, 
    viewDbAdmin,
    findDataById,
    findDataByQuery
}