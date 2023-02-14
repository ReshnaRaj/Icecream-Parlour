var db=require('../config/connection');
var collection=require('../config/collection');
const bcrypt = require('bcrypt');

module.exports={
    doSignup:async(userData,callback)=>{
        // console.log(userData);
        userData.password= await bcrypt.hash(userData.password,10)
             db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
             callback(data);
       }) //userdata stores into database // USER_COLLECTION  means what we created the name of usercollection(look into the colllection file)
       // userData means entered the data of user.

    },
    doLogin:(loginData)=>{
        let loginStatus=false;
        let response = {}
        return new Promise(async(resolve,reject)=>{
          let user= await db.get().collection(collection.USER_COLLECTION).findOne({email:loginData.email})  
          
          if(user){
            bcrypt.compare(loginData.password,user.password).then((status)=>{//user entered pwrd  and   pwrd stored in the db are equal
                if(status){
                    console.log("success");
                    response.user = user
                    response.status = true
                    resolve(response)
                  
                }else{
                    console.log("failed");
                    resolve({status:false})
                }
             
            })
          }else{
            console.log("failed");
            resolve({status:false})
          }
        })
    }///checking with the user data is it correct data or not
}