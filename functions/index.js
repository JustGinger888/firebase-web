const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // Check Request Is from admin
    if (context.auth.token.admin !== true) {
        return { error: 'Only Admins Can Add Admins'}
    }

    // Get user and add custom clain (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} is now an admin`
        }
    }).catch(err => {
        return err;
    });
});