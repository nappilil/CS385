//import express, express router as shown in lecture code
import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../data/users.js';
import { checkName, checkPassword, checkConfirmPassword, checkFavoriteQuote, checkThemePreference, checkRole, checkUsername } from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  res.json({ error: 'YOU SHOULD NOT BE HERE!' });
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    res.render('register', {
      pageTitle: "Register"})
  })
  .post(async (req, res) => {
    //code here for POST
    const registerData = req.body;
    let firstName = registerData.firstName;
    let lastName = registerData.lastName;
    let username = registerData.username;
    let password = registerData.password;
    let confirmPassword = registerData.confirmPassword;
    let favoriteQuote = registerData.favoriteQuote;
    let themePreference = registerData.themePreference;
    let role = registerData.role;
    let errors = [];
    // Error checking
    try {
      firstName = checkName(firstName, "First Name");
    } catch (e) {
      errors.push(e)
    }
    try {
      lastName = checkName(lastName, "Last Name");
    } catch (e) {
      errors.push(e)
    }
    try {
      username = checkUsername(username, "Username");
    } catch (e) {
      errors.push(e)
    }
    try {
      password = checkPassword(password, "Password");
    } catch (e) {
      errors.push(e)
    }
    try {
      favoriteQuote = checkFavoriteQuote(favoriteQuote, "Favorite Quote");
    } catch (e) {
      errors.push(e)
    }
    try {
      themePreference = checkThemePreference(themePreference, "Theme Preference");
    } catch (e) {
      errors.push(e);
    }
    try {
      role = checkRole(role, "Role");
    } catch (error) {
      errors.push(e);
    }
    try {
      confirmPassword = checkConfirmPassword(confirmPassword, password, "Confirm Password");
    } catch (e) {
      errors.push(e);
    }
    if (errors.length > 0) {
      res.status(400).render("register", {
        pageTitle: "Register",
        errors: errors,
        hasErrors: true,
        user: registerData
      });
      return;
    }
    try {
      errors = [];
      const user = await registerUser(firstName, lastName, username, password, favoriteQuote, themePreference, role);
      if (user.signUpCompleted === true) {
        return res.redirect('/login');
      } else {
        res.status(500).render("error", {pageTitle: "Error", error: "Internal Server Error", authenticated: false});
        return;
      }
    } catch (e) {
      errors.push(e);
    }
    if (errors.length > 0) {
      res.status(400).render("register", {
        pageTitle: "Register",
        errors: errors,
        hasErrors: true,
        user: registerData
      });
      return;
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    res.render('login', {
      pageTitle: "Log In"})
  })
  .post(async (req, res) => {
    //code here for POST
    const loginData = req.body;
    let username = loginData.username;
    let password = loginData.password;
    let errors = [];

    // Error checking
    try {
      username = checkUsername(username, "Username");
    } catch (e) {
      errors.push(e)
    }
    try {
      password = checkPassword(password, "Password");
    } catch (e) {
      errors.push(e)
    }
    if (errors.length > 0) {
      res.status(400).render("login", {
        pageTitle: "Login",
        errors: errors,
        hasErrors: true,
        user: loginData
      });
      return;
    }
    try {
      const user = await loginUser(username, password)
      req.session.user = {firstName: user.firstName, lastName: user.lastName, username: user.username, favoriteQuote: user.favoriteQuote, themePreference: user.themePreference, role: user.role};
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        return res.redirect('/user');
      }
    } catch (e) {
      let errors = [];
      errors.push(e);
      res.status(400).render("login", {
        pageTitle: "Login",
        errors: errors,
        hasErrors: true,
        user: loginData
       });
      return;
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  let admin;
  if (req.session.user.role === 'admin') {
    admin = true;
  } else {
    admin = false;
  }
  res.render('user', {
    pageTitle: "User", 
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date().toUTCString(),
    favoriteQuote: req.session.user.favoriteQuote,
    role: req.session.user.role,
    admin: admin,
    themePreference: req.session.user.themePreference
  });
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  res.render('admin', {
    pageTitle: "Admin", 
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date().toUTCString(),
    favoriteQuote: req.session.user.favoriteQuote, 
    role: req.session.user.role,
    themePreference: req.session.user.themePreference
  });
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  res.render('logout', {
    pageTitle: 'Logout', 
    firstName: req.session.user.firstName, 
    lastName: req.session.user.lastName,
    themePreference: req.session.user.themePreference
  });
  req.session.destroy();
});

export default router;