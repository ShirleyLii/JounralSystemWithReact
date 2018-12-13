const User = require('../../models/User');
const Entry = require('../../models/Entry');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

    app.post('/api/entry', (request, response, next) => {
        const { body } = request;
        const {
            title
        } = body;

        let {
            ebody
        } = body;

        if (!title) {
            return response.send({
                success: false,
                message: 'Error: Title cannot be blank.'
            });
        }

        if (!ebody) {
            return response.send({
                success: false,
                message: 'Error: Journal Entry body cannot be blank.'
            });
        }

        // new entry
        const newEntry = new Entry();
        newEntry.title = title;
        newEntry.ebody = ebody;

        newEntry.save((error, entry) => {
            if (error) {
                return response.send({
                    success: false,
                    message: 'Error, server error'
                });
            }

            return response.send({
                success: true,
                message: 'Success! Entry added.'
            })
        })


    });

}