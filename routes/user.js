var express = require("express");
var router = express.Router();
var userHelpers = require("../helpers/user-helpers");

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else
    res.redirect('/')//if the user logged in then it will execute the next function or else if the user doesnt logged in then it will
    //redirect to the  login page


}

/* GET home page. */
router.get("/", (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/userHome')
  }else{
    
    res.render("user/userLogin",{logginErr:req.session.err});
    req.session.err=false
  }
 
});
router.get("/userHome",verifyLogin, (req, res) => {
 let User=req.session.user///to showing the user name onthe home page
//  console.log(user);
 let items = [
    {
      name: "avacado",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN3lIms2d8AIdRRbBkFtP_L8eDWc-s2O2VB5zB_zkP-zWMBvz-pLT45yXk2v1bx_-sXek&usqp=CAU",
      description:
        "Creamy, luscious avocado ice cream made with healthy ingredients. An easy homemade ice cream recipe, ...",
    },
    {
      name: "pumpkin",
      image:
        "https://www.acouplecooks.com/wp-content/uploads/2022/10/Pumpkin-Ice-Cream-008.jpg",
      description:
        "This pumpkin ice cream recipe is lusciously creamy and warm spiced! It's a showy fall dessert ..cgsdfyebvojegdessert",
    },
    {
      name: "chocolate crunch",
      image:
        "https://www.tasteofhome.com/wp-content/uploads/2018/01/Chocolate-Crunch-Ice-Cream_exps31814_CW950599D43C_RMS.jpg",
      description:
        "Making ice cream goes smoothly when you do prep work in advance. I make the custard ahead and ...",
    },
    {
      name: "Azuki red bean",
      image:
        "https://www.justonecookbook.com/wp-content/uploads/2020/12/Red-Bean-Ice-Cream-1224-I.jpg",
      description:
        "Learn to make authentic Azuki Red Bean Ice Cream just like what you’d find in Japan! It’s the ...",
    },
    {
      name: "Double chocolate",
      image:
        "https://c.ndtvimg.com/2020-07/l60ignh_ice-cream_625x300_17_July_20.jpg",
      description:
        "About Double Chocolate Ice Cream Recipe: Who would ever say no to a scoop of delectable ice cream!? ...",
    },
    {
      name: "Mixed blend",
      image:
        "https://images.indianexpress.com/2021/07/ice-cream-pixabay-1200.jpg",
      description:
        "A blend of science, art and creativity’: Into the delightfully sweet world of artisanal ice creams",
    },
    {
      name: "Corner icecream",
      image:
        "https://images.squarespace-cdn.com/content/v1/5f7c3e7d8ed5803eef772aa1/1601979150410-4X1QXXH6LX315XXFSY4Y/Death+by+chocolate.jpg?format=1000w",
      description:
        "Learn to make authentic Azuki Red Bean Ice Cream just like what you’d find in Japan! It’s the ...",
    },
  ];
  res.render("user/userHome", { items,User });// this means if the server asking for the userhome page in response it will render the home page
});
router.get("/userSignup", (req, res) => {
  res.render("user/userSignup");//if the server userSignup get cheyyuvanel userSignup page render chythu kodukkunnu..
});
router.post("/signup", (req, res) => {
  // let userData=req.body.password;
  // console.log(userData);
  userHelpers.doSignup(req.body, (data) => {
    res.redirect("/");
  });
});
router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {//used to check the usernama and pwrd are same .if it is same only redirect the home page
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      // console.log(req.session.user);storing the user
      //data in the session
     
      res.redirect("/userHome");
    } else {
      req.session.err = true;
      res.redirect("/");
    }
  });
});
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})//logout go to loginpage

module.exports = router;
