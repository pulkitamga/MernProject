const User = require('../../models/user');
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
                message: 'Admin Alreday resgistered'
            });
              const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role: 'admin'
            });
            _user.save().then((data) => {
                res.status(200).send({ message: "Admin resgister successfully.", data })
            }).catch((error) => {
                res.status(400).send(error.message)
            });
        });


}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            if (user.authenticate(req.body.password) && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { firstName, lastName, email, role, fullName } = user;
                res.cookie('token',token,{expiresIn:'1h'});
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

    }).catch((error) => {
        return res.status(400).json(error.message);
    })


}
exports.signout=(req,res)=>{
    console.log('Hii Logout');
   res.clearCookie('token',{path:'/'});
   res.status(200).send('User Logout');
}
