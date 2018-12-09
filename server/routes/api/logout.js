const User = require('../../models/User');
const bcrypt = require('bcrypt');
const UserSession = require('../../models/UserSession');

// const bcrypt = require('bcrypt');
module.exports = (app) => {


    app.get('/api/account/logout', (request, response, next) => {
        const { query } = request;
        const { token } = query;
        // verify the token is one of a kind 

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false 
        }, {
            $set:{isDeleted:true} 
        }, null,(error, sessions) => {
            if (error) {
                return response.send({
                   success: false,
                   messgage: 'Error: Server Error' 
                });
            }
        {
                return response.send({
                    success: true,
                    message: "Logout Successfully"
                })
            }
        }) 
    });

}