const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    
    const {
        firstName,
        lastName,
        email,
        password

    } = req.body;
    //console.log(req.body);
    User.findOne({ email: email })
        .then((user) => {
            if (user) return res.status(400).json({
                message: 'User Alreday resgister'
            });


            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            _user.save().then((data) => {
                res.status(200).send({ message: "User resgister successfully.", data })
            }).catch((error) => {
                res.status(400).send(error.message)
            });
        });


}
// exports.signin = (req, res) => {
//     User.findOne({ email: req.body.email }).then((user) => {
//         if (user) {
//             if (user.authenticate(req.body.password)) {
//                 const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//                 const { firstName, lastName, email, role, fullName } = user;
//                 res.status(200).json({
//                     token,
//                     user: {
//                         firstName, lastName, fullName, email, role
//                     }
//                 });
//             }
//             else {
//                 return res.status(400).json({
//                     message: 'Inavalid password'
//                 });
//             }
//         }
//     }).catch((error) => {
//         return res.status(400).json(error.message);
//     }
//     )
// }
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
          if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, fullName, email, role
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Inavalid password'
                    });
                }
            }
          
        }).catch((error)=>{
            return res.status(400).json(error.message);
        })
}
