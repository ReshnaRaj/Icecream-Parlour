var db = require("../config/connection");
var collection = require("../config/collection");
var objectId = require("objectid");
const { response } = require("express");
const bcrypt = require('bcrypt');

module.exports = {
    adminLogin: (adminData) => {
        console.log(adminData);
        let loginStatus = false;
        let response = {};
        return new Promise(async (resolve, reject) => {
            let admin = await db
                .get()
                .collection(collection.ADMIN_COLLECTION)
                .findOne({ email: adminData.email });//storing admin datas into database

            if (admin) {
                db.get()
                    .collection(collection.ADMIN_COLLECTION)
                    .findOne({ psw: adminData.password })
                    .then((status) => {
                        if (status) {
                            console.log("success");
                            response.admin = admin;
                            response.status = true;
                            resolve(response);
                        } else {
                            console.log("failed");
                            resolve({ status: false });
                        }
                    });
            } else {
                console.log("failed");
                resolve({ status: false });
            }
        });///checking admin data is valid or not
    },
    getUserData: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .find()
                .toArray();
            console.log(users);
            resolve(users);
        });
    },///to display the userdatas
    geteditData: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userData = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .findOne({ _id: objectId(userId) });
            resolve(userData);
        });
    },
    editData: (userId, userData) => {
        //console.log(userdata.name);

        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.USER_COLLECTION)
                .updateOne(
                    { _id: objectId(userId) },
                    {
                        $set: {
                            name: userData.name,
                            phone: userData.phone,
                            email: userData.email,
                            password: userData.password,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    resolve(response);
                });
        });
    },
    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.USER_COLLECTION)
                .deleteOne({ _id: objectId(userId) })
                .then((response) => {
                    resolve(response);
                });
        });
    },
    createUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password= await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
        })
    }
};
