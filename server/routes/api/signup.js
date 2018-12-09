const User = require('../../models/User');
const bcrypt = require('bcrypt');
const UserSession = require('../../models/UserSession');

// const bcrypt = require('bcrypt');
module.exports = (app) => {

    /*
    * Sign up
    */
    app.post('/api/account/signup', (request, response, next) => {
        const { body } = request; 
        const {
            firstName,
            lastName,
            password
        } = body;
        
        let {
                email
            } = body;
        

        if (!firstName) {
            return response.send({
                success: false,
                message: 'Error: First Name is necessary'
            });
        }

        if (!lastName) {
            return response.send({
                success: false,
                message: 'Error: Last Name is necessary'
            });
        }

        if (!email) {
            return response.send({
                success: false,
                message: 'Error: Email is required.'
            });
        }

        if (!password) {
            return response.send({
                success: false,
                message: 'Error: Password is required.'
            });
        }

        console.log('here')

        email = email.toLowerCase();

        // Verify email doesnt exist 

        User.find({
            email : email
        },(error,previousUsers) =>{
            if (error){
                return response.send({ 
                    success: false,
                    message: 'Error : Server error'
                });
            }
            else if( previousUsers.length > 0 ){
                return response.send({
                    success: false,
                    message: 'Error : Account exisit'
                });
            }
            
            // new user here 

            // new user obj
            const newUser = new User();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((error, user) =>{
                if(error){
                    return response.send({
                        success: false,
                        message: 'Error, server error'
                    });
                }

                return response.send({
                    success:true,
                    message: 'Success! Signed up.'
                })
            })
        })
    }); 



}