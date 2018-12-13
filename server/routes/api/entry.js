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

    // Return all the entries 
    app.get('/api/entry', (request, response, next) => {
        const { body } = request;
        const {
            title
        } = body;

        let {
            ebody
        } = body;

        Entry.find({}).then(function (entries) {
            response.send(entries);
        });
        return response.send({
            success: true,
            message: 'Success! Entry added.'
        })

    });

    // Delete an entry
    app.delete('/api/entry/:id', (request, response, next) => {

        Entry.remove({
            _id: request.params.id,

        }, function(error,entries){
            if (error){
                // return console.error(error);
                return response.send({
                    success: false,
                    message: 'Error, server error'
                });
            }

            return response.send({
                success: true,
                message: 'Success! Entry deleted.'
            })
            console.log('deleted succesfully');
            response.status(200).send();
        })

    });

}