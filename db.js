// what is this : 
// Database build using concepts of file system in node js 
// and the concepts of json files 
const fs =require('fs');
// const file = require('fs-extra/lib/ensure/file');
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

var model = 0;

// file length -2
var rowId = 0 ;
var rows =[];
var passArr =[];
const dbDirectory = './database.json';

function addNewCustomer(username , email ,balance){
var file = readFile('./database.json' , 'utf-8');

if(file.length == 0)
console.log(0)
else if (file.length == 63)
{
 writeFile(dbDirectory ,file.replace("," , " "))
}
else {
    rowId = file[file.length-2];
    if (isNaN(file[file.length-3]))
    ;
    else {
        rowId = file[file.length-3] + file[file.length-2]
       }
   
       rowId++;
}
 rowId = ' r:'+rowId;
// console.log(rowId)
// if (file == '')
// writeFile(dbDirectory , '[]')


var write = `
{
    "${requiredFields[0]}": "${username}",
    "${requiredFields[1]}":"${email}",
    "${requiredFields[2]}":${balance}
},`;
// console.log(file[file.length-1])
if (file[(file.length)-1] == "]")
{
    // console.log(true);
file = file.replace(file[(file.length)-1] , " ");
writeFile(dbDirectory , file);
write =`,{
    "${requiredFields[0]}": "${username}",
    "${requiredFields[1]}":"${email}",
    "${requiredFields[2]}":${balance}
}
]` 
// if (file.length == 63)
// {
//  writeFile(dbDirectory ,file.replace(file[2] , " "))
// }

}
else console.log (false)

    writeFile(dbDirectory , write, {flag:'a'})
   write = write.replace(',' , ' ');
   write = write.replace(']' , ' ');
    write = JSON.parse(write)
    // console.log(write)
return {
    write
}

}

function clearDb (){
    writeFile(dbDirectory , '');
}
function findDb (user){
    var file = readFile(dbDirectory , 'utf-8');
   file = JSON.parse(file);
   for (i=0;i<file.length;i++){
       if (file[i].username == user )
       return {
        status : true , 
        message : file[i]
       };   
   }
   return {
    status : false ,
    message : 'No user found'
   }
   
}
function regAuth(username , password , mail){
    var file = readFile(dbDirectory , 'utf-8');
    if (file == ''){

        writeFile(dbDirectory , '[]')
        insert(username , password,mail)
    }
    file = JSON.parse(file);
    for (i=0;i<file.length;i++){
        if (file[i].username == username ||  file[i].email == mail)
        return true
        
    }

}

function updateDb(data) {
    writeFile(dbDirectory , data);
}



function addBalance (name , balance) {
var file = readDb();
balance = parseFloat(balance)
file = JSON.parse(file);
const checkUser = findDb(name);
// console.log(checkUser)
if (checkUser.status) {
    for(i =0 ;i<file.length ; i++){
        if (file[i].username == name)
        {
            file[i].balance+= balance;    
        }
        
    }
}
else return {
    message : 'No such a user'
}


updateDb(JSON.stringify(file));
return {
    status : 200 ,
    message : 'Balance Trasfered Succssfully'
}
}
function firstSearch (){

    var file = readFile(dbDirectory , 'utf-8');
    var checker  ;
    checker = file.slice(0,file.match('\n').index)
    file = file.replace(checker , '');
    console.log(file)
    console.log(checker)
}
function search(){
    var file = readFile(dbDirectory , 'utf-8');
    var checker  ;
    checker = file.slice(file.match('\n'),file.match('\n').index)
    file = file.replace(checker , '');
    console.log(file)
    console.log(checker)
}
function an(){
    var file = readFile(dbDirectory , 'utf-8');
//    file = JSON.parse(file)
    console.log(file[2])
}
function readDb(){
  return  readFile(dbDirectory , 'utf-8')
}
function assignModel (passedModel){
    const w = validator(passedModel)
console.log(w)
    // if (model !=0){
    //     const length = passedModel.length;
    //     model = passedModel;
    //     return {
    //         status : 200 , 
    //         data : passedModel
    //     }
    // }
// console.log(passedModel)

}


module.exports={
    newCustomer: addNewCustomer,
    addBalance : addBalance,
    allCustomer : readDb,
    dbModel : assignModel
    
}



