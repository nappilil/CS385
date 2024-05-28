/** In this file, you must perform all client-side validation 
 * for every single form input (and the role dropdown) on your pages. 
 * The constraints for those fields are the same as they are for the data functions and routes. 
 * Using client-side JS, you will intercept the form's submit event when the form is submitted 
 * and If there is an error in the user's input or they are missing fields, 
 * you will not allow the form to submit to the server 
 * and will display an error on the page to the user informing them of what was incorrect or missing.  
 * You must do this for ALL fields for the register form as well as the login form. 
 * If the form being submitted has all valid data, then you will allow it to submit to the server for processing. 
 * Don't forget to check that password and confirm password match on the registration form! */
(function () {
    const helperMethods = {
        checkName(strVal, varName) {
            /** 
             * valid string (no strings with just spaces, 
             * should not contain numbers) 
             * and should be at least 2 characters long with a max of 25 characters. 
             */
            if (!strVal) throw `Error: You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
                throw `Error: ${varName} cannot just be spaces`;
            if (strVal.length < 2 || strVal.length > 25) {
                throw `Error: ${varName} must be between 2-25 chars`
            }
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (let i = 0; i <= strVal.length - 1; i++) {
                if (numbers.includes(strVal[i])) {
                    throw `Error: ${varName} cannot contain numbers`
                }
            }
            return strVal;
        },
        checkUsername(strVal, varName) {
            /** 
             *  should be a valid string (no strings with just spaces, should not contain numbers)
             *  and should be at least 5 characters long with a max of 10 characters.
             *  should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username. 
             */
            if (!strVal) throw `Error: You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
                throw `Error: ${varName} cannot just be spaces`;
            if (strVal.length < 5 || strVal.length > 10) {
                throw `Error: ${varName} must be between 5-10 chars`
            }
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (let i = 0; i <= strVal.length - 1; i++) {
                if (numbers.includes(strVal[i])) {
                    throw `Error: ${varName} cannot contain numbers`
                }
            }
            strVal = strVal.toLowerCase();
            return strVal;
        },
        // async checkSameUsername(strVal, varName) {
        //     const userCollection = await users();
        //     const existingUser = await userCollection.find({ username: username }).toArray();
        //     if (existingUser.length !== 0) throw `Error: Username is already in use`;
        //     return strVal;
        // },
        checkPassword(password, varName) {
            /**
             * must be a valid string (no strings with just spaces and no spaces
             * and should be a minimum of 8 characters long.
             * There needs to be at least one uppercase character
             * there has to be at least one number 
             * there has to be at least one special character
             */
            if (!password) throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;
            if (typeof password !== 'string') throw `Error: ${varName} must be a string!`;
            password = password.trim();
            if (password.length === 0) throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
            let regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!password.match(regEx)) throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;
            return password;
        },
        checkConfirmPassword(confirmPassword, password, varName) {
            /**
             * Must be a valid string (no strings with just spaces and no spaces
             * Must match password
             */
            if (!password) throw `Error: You must supply a ${varName}!`;
            if (typeof password !== 'string') throw `Error: ${varName} must be a string!`;
            password = password.trim();
            if (password.length === 0) throw `Error: ${varName} cannot just be spaces`;
            if (password !== confirmPassword) throw `Error: Confirm password does match password`;
            return confirmPassword;
        },
        checkFavoriteQuote(strVal, varName) {
            /**
             * should be a valid string (no strings with just spaces, should not contain numbers) 
             * should be at least 20 characters long with a max of 255 characters.
             */
            if (!strVal) throw `Error: You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
                throw `Error: ${varName} cannot just be spaces`;
            if (strVal.length < 20 || strVal.length > 255) {
                throw `Error: ${varName} must be between 20-255 chars`;
            }
            const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (let i = 0; i <= strVal.length - 1; i++) {
                if (numbers.includes(strVal[i])) {
                    throw `Error: ${varName} cannot contain numbers`;
                }
            }
            return strVal;
        },
        checkThemePreference(strVal, varName) {
            /**
             * the ONLY two valid values are "light" or "dark"
             * should be stored as lowercase in the DB
             */
            if (!strVal) throw `Error: You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
                throw `Error: ${varName} cannot just be spaces`;
            strVal = strVal.toLowerCase();
            if (strVal !== 'light') if (strVal !== 'dark') throw `Error: ${varName} must be 'light' or 'dark'`
            return strVal;
        },
        checkRole(strVal, varName) {
            /**
             * the ONLY two valid values are "admin" or "user". 
             * should be stored as lowercase in the DB
             */
            if (!strVal) throw `Error: You must supply a ${varName}!`;
            if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
            strVal = strVal.trim();
            if (strVal.length === 0)
                throw `Error: ${varName} cannot just be spaces`;
            strVal = strVal.toLowerCase();
            if (strVal !== 'admin') if (strVal !== 'user') throw `Error: ${varName} must be 'admin' or 'user'`
            return strVal;
        }
    };
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const errorTextElement = document.getElementById('error_output');

    if (signinForm) {
        signinForm.addEventListener('submit', event => {
            event.preventDefault();
            // get elements
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            errorTextElement.innerHTML = ""; // clear contents before new submission
            const ulElement = document.createElement('ul'); // create list of errors
            let errors = [];
            // error checking
            try {
                username = helperMethods.checkUsername(username, "Username");
            } catch (e) {
                errors.push(e);
            }
            try {
                password = helperMethods.checkPassword(password, "Password");
            } catch (e) {
                errors.push(e);
            }
            if (errors.length > 0) {
                errors.forEach((e) => {
                    const liElement = document.createElement('li');
                    liElement.textContent = e;
                    ulElement.appendChild(liElement);
                });
                errorTextElement.appendChild(ulElement);
            } else {
                signinForm.submit();
            }
        });
    }
    if (signupForm) {
        signupForm.addEventListener('submit', event => {
            event.preventDefault();

            // get all elements
            let firstName = document.getElementById("firstName").value;
            let lastName = document.getElementById("lastName").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPassword").value;
            let favoriteQuote = document.getElementById("favoriteQuote").value;
            let themePreference = document.getElementById("themePreference").value;
            let role = document.getElementById("role").value;

            errorTextElement.innerHTML = ""; // clear contents before new submission
            const ulElement = document.createElement('ul'); // create list of errors
            let errors = [];

            try {
                firstName = helperMethods.checkName(firstName, "First Name");
            } catch (e) {
                errors.push(e);
            }
            try {
                lastName = helperMethods.checkName(lastName, "Last Name");
            } catch (e) {
                errors.push(e);
            }
            try {
                username = helperMethods.checkUsername(username, "Username");
            } catch (e) {
                errors.push(e);
            }
            try {
                password = helperMethods.checkPassword(password, "Password");
            } catch (e) {
                errors.push(e);
            }
            try {
                confirmPassword = helperMethods.checkConfirmPassword(confirmPassword, password, "Confirm Password");
            } catch (e) {
                errors.push(e);
            }
            try {
                favoriteQuote = helperMethods.checkFavoriteQuote(favoriteQuote, "Favorite Quote");
            } catch (e) {
                errors.push(e);
            }
            try {
                themePreference = helperMethods.checkThemePreference(themePreference, "Theme Preference");
            } catch (e) {
                errors.push(e);
            }
            try {
                role = helperMethods.checkRole(role, "Role");
            } catch (e) {
                errors.push(e);
            }
            if (errors.length > 0) {
                errors.forEach((e) => {
                    const liElement = document.createElement('li');
                    liElement.textContent = e;
                    ulElement.appendChild(liElement);
                });
                errorTextElement.appendChild(ulElement);
            } else {
                signupForm.submit();
            }
        });
    }
})();

