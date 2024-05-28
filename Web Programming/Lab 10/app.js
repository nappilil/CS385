// Setup server, session and middleware here.
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';

app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthenticationState',
    secret: "some secret string!",
    saveUninitialized: false,
    resave: false
  })
);
/*
You will have the following middleware functions:

1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following: 

A. This middleware will log to your console for every request made to the server, with the following information:

Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

An example would be:

[Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:19 GMT]: GET /user (Authenticated User)
[Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)
*/
app.use('/', async (req, res, next) => {
  let authenticated = ""
  if (req.session.user) {
    authenticated = "(Authenticated User)";
  } else {
    authenticated = "(Non-Authenticated User)";
  }
  console.log(
    '[ ' + new Date().toUTCString() + ']: ' +  // [Sun, 14 Apr 2019 23:56:06 GMT]:
    req.method + ' ' +  // GET
    req.originalUrl + " " + // /login
    authenticated
  );
  /*
  B. After you log the request info in step A,  if the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will redirect them to the GET /login route. 
  */
  if (req.path === '/') {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      }
      else if (req.session.user.role === 'user') {
        return res.redirect('/user');
      }
    } else {
      return res.redirect('/login');
    }
  } else {
    next();
  }
});
/*
2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.
*/
app.use('/login', async (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      return res.redirect('/admin');
    }
    else if (req.session.user.role === 'user') {
      return res.redirect('/user');
    }
  } else {
    next();
  }
});

/*
3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.
*/
app.use('/register', async (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      return res.redirect('/admin');
    }
    else if (req.session.user.role === 'user') {
      return res.redirect('/user');
    }
  } else {
    next();
  }
});
/*
4. This middleware will only be used for the GET /user route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
Users with both roles admin or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.
*/
app.use('/user', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  } else if (req.session.user && req.path === '/user/admin') {
    return res.redirect('/user');
  } else {
    next();
  }
});
/*
5. This middleware will only be used for the GET /admin route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!
*/
app.use('/admin', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    if (req.session.user.role !== 'admin') {
      return res.status(403).render("error", { pageTitle: "Error", error: "User does not have permission to view the page", authenticated: true, themePreference: req.session.user.themePreference});
    }
    next();
  }
});
/* I don't know why but doing user/admin would give them access no matter what I did so I put this here to stop users being able to access admin when they weren't supposed to */
app.use('/user/admin', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    if (req.session.user.role !== 'admin') {
      return res.status(403).render("error", { pageTitle: "Error", error: "User does not have permission to view the page", authenticated: true, themePreference: req.session.user.themePreference});
    }
    next();
  }
});
/*
6. This middleware will only be used for the GET /logout route and will do one of the following:

1. If a user is not logged in, you will redirect to the GET /login route.

2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

*/
app.use('/logout', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});