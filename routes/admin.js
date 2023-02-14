var express = require("express");
const { Db } = require("mongodb");
var router = express.Router();
var adminHelpers = require("../helpers/admin-helpers");

const verifyLogin = (req, res, next) => {
  if (req.session.adminlog) {
    next()
  } else{
    res.redirect('/admin')//adminlogin render

  }


}
/* GET home page. */
router.get("/", (req, res) => {
  if(req.session.adminlog){
    res.redirect('/admin/adminHome')
  }else{
    req.session.err=false
    res.render("admin/adminLogin",{logginErr:req.session.err});
  }
 
});
router.get('/adminHome',verifyLogin,(req,res)=>{
    let admin=req.session.admin
    adminHelpers.getUserData().then((users)=>{
     res.render('admin/adminHome',{users,admin})
    })
})

router.post("/adminLogin", (req, res) => {
  //let adminData=req.body.email;
  //console.log(adminData);
  adminHelpers.adminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.adminlog = true;
      req.session.admin = response.admin;
      res.redirect("/admin/adminHome");
    } else {
      req.session.err = false;
      res.redirect("/admin");
    }
  });
});
router.get('/adminlogout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})

router.get('/edit-user/:id',async(req,res)=>{
    let userdata=await adminHelpers.geteditData(req.params.id)
    res.render('admin/edit-user',{userdata})
})
router.post('/edituser/:id',(req,res)=>{
    console.log('Name: '+req.body.name);
    adminHelpers.editData(req.params.id,req.body)
    res.redirect('/admin/adminHome')
})
router.get('/delete-user/:id',(req,res)=>{
    console.log(req.params.id,"232345678");
    adminHelpers.deleteUser(req.params.id)
        res.redirect('/admin/adminHome')
    
       
    
})
router.get('/create-user',(req,res)=>{
  res.render('admin/create-user')
})
router.post('/createuser',(req,res)=>{
  adminHelpers.createUser(req.body).then((data)=>{
    res.redirect('/admin/adminHome')
  })
})

module.exports = router;
