
const { admin, users } = require('./db'); 


    async function adminmiddleware(req, res, next){
        try {
            const { username, password } = req.body;
            const adminUser = await admin.findOne({
                name: username, 
                password 
            });

            if (adminUser) {
                next(); 
            } else {
                res.status(401).json({
                    msg: "Admin not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Authentication error"
            });
        }
    }

  
     async function usersmiddleware(req, res, next){
        try {
            const { username, password } = req.body;
            const user = await users.findOne({
                name: username, 
                password 
            });
            if (user) {
                next(); 
            } else {
                res.status(401).json({
                    msg: "User not found"
                }); }
        } catch (error) {
            res.status(500).json({
                msg: "Authentication error"
            });
        }
    }

    module.exports = {
        adminmiddleware,
        usersmiddleware
    };