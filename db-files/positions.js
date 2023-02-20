const {readFileSync} = require('fs')

const dbFileName = 'dbs.json';
const dbsDir = `./files/${dbFileName}`;
const dbsFolderDir = './files';

function getPositionById(userId,recordId){
var recordIds =[];
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    db= db[userId].data;
    // return db.length;
    db.forEach(rec=>{
        if(rec.recordId)
        recordIds.push(rec.recordId);
    })
    const position= binarySearch(recordIds , recordId)
    if(position==-1)
    return {message : 'WRONG RECORD ID' , status:400}
    return position;

}
function getModelPosition(userId , modelName){
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db);
    db=db[userId].data
    // return db
    const positions = [];
    for(i=0 ; i<db.length ; i++)
    if(db[i].modelName == modelName)
    positions.push(i);
    if(positions.length == 0)
    return {message : 'NO MODEL FOUND' , status :400}
    return positions
}
function getPositionByQuery(userId , modelName, query){
    // return query
    const queryPositions = [];
    const positions = getModelPosition(userId , modelName);
    if(positions.status == 400)
    return positions;
    // return positions
    var db= readFileSync(dbsDir , 'utf-8');
    db = JSON.parse(db)
    if(!db[userId])
    return {message : 'WRONG USER ID' , status:400}
    db= db[userId].data;
    
    const key=Object.keys(query);
    const value = Object.values(query); 
    

    if(key.length > 1)
    return {message:'ONLY ONE QUERY ALLOWED' , status:400}

    for(i=0 ; i<positions.length ; i++){
        const Keys = Object.keys(db[positions[i]]);
        const Values = Object.values(db[positions[i]])
        for (j=0 ;j<Keys.length ; j++)
        if(Keys[j] == key[0])
        if(Values[j] == value[0]){
            queryPositions.push({modelPosition : positions[i] , position : j})
        }
    }
    if(queryPositions.length ==0)
    return {message : 'WRONG QUERY: no such a query' , status : 400}   
    return queryPositions
}
function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
      
         if (sortedArray[middle] === key) {
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

module.exports = {
    getPositionById , 
    getPositionByQuery,
    binarySearch
}