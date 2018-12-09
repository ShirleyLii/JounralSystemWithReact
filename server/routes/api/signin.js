const User = require('../../models/User');
const bcrypt = require('bcrypt');
const UserSession = require('../../models/UserSession');

// const bcrypt = require('bcrypt');
module.exports = (app) => {

    /*
    * Sign In
    */

    app.post('/api/account/signin', (request, response, next) => {
        const { body } = request; 
        const {
            password
        } = body;

        let {
            email
        } = body; 

        if (!email) {
            return response.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        if (!password) {
            return response.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();

        // find the user, then valid the user with password

        User.find({
            email: email
        }, (error,users) => {
            if(error){
                return response.send({
                    success: false,
                    message: 'Error: server error'
                }); 
            }

            const user = users[0];

            if (!user.validPassword(password)){
                return response.send({
                    success: false,
                    message: 'Error: Invalid password'
                }); 
            }

            // after validating the user, use usersession
            userSession = new UserSession()
            userSession.userId = user._id; //user document id
            userSession.save((error,doc) =>{
                if (error){
                    return response.send({
                        success:false,
                        message: "Error, server error"
                    });
                }

                return response.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id //save to local browser, verify if the user successfuly login ,and the doc._id point back to user id 
                })
            })
        })
    });

}