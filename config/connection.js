const mongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=function(done){  // this line is for to require connection file in any one of the file. so to connect with db we want url and dbname
    const url='mongodb://127.0.0.1:27017'
    const dbname='icecream'
    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })
   

}
module.exports.get=function(){
    return state.db
}