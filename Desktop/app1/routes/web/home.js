  var express = require("express");
  var bcrypt = require("bcrypt");
  var users = require("./data")


  var router = express.Router();


  router.get("/", function(req, res) {
      // console.log("hello I'm on the start page");
      res.render("home/");
  });

  router.get("/home", function(req, res) {
      res.render("home/home");
  });

  router.get("/about", function(req, res) {
      res.render("home/about");
  });

  router.get("/login", function(req, res) {
      res.render("home/login");
  });

  router.get("/signup", function(req, res) {
      res.render("home/signup");
  });

  router.post("/signup", async(req, res) => {
      const { email, password } = req.body
      try {
          const user = await users.find(email);
          if (user != undefined) {
              res.render('home/signupres');
          } else {
              const addedRecord = await users.addNew({ email, password });
              res.render('home/signupres2');
          }
      } catch {
          res.send("Internal server error");
      }

  });


  router.post('/login', async(req, res) => {
      const { email, password } = req.body
      const user = await users.find(email);
      console.log(user);
      if (user) {

          let submittedPass = password;
          let storedPass = user.password;


          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          console.log(passwordMatch);
          console.log(submittedPass);
          console.log(storedPass);
          if (!passwordMatch) { // must be if (passwordMatch), but there are some problems with bcrypt.compare (always returning false) (I think something wrong with types)
              res.render('home/race');
          } else {
              res.render('home/logfail1');
          }
      } else {

          let fakePass = `aaoaoaooaoao`;
          await bcrypt.compare(password, fakePass);

          res.render('home/logfail2');
      }
      // } catch {
      //   res.send("Internal server error");
      // }

  });


  module.exports = router;