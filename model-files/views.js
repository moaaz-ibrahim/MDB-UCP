const {readFileSync} = require('fs');

const modelsFileName = 'models.json';
const modelsDir = `./files/${modelsFileName}`;
const modelsFolderDir = './files';

function viewModelsAdmin (userId){
    var db = readFileSync(modelsDir , 'utf-8');
    db = JSON.parse(db);
    if(userId == 0)
        return{ res :db , status : 200};
        return {message:'WRONG ADMIN ID: wrong admin id' , status:400}
    
}
function viewModelsUser(userId){
    var db = readFileSync(modelsDir , 'utf-8');
    db = JSON.parse(db);
    // return db[1]
    if(db[userId] == null || db[userId]==undefined)
    return {res: 'No Model has assigned for this userId yet' , status : 400}
    else return{ res :db[userId] , status :200}

}

module.exports = {
    viewModelsUser, 
    viewModelsAdmin
}