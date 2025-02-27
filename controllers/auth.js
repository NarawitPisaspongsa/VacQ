const User = require("../models/User");
// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = async (req, res, next) => {
    try {
        const {name, email, password, role} = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        // create token
        // OLD WAY
        // const token = user.getSignedJwtToken();
        // return res.status(200).json({success: true, token});
        // NEW WAY
        sendTokenResponse(user, 200, res);

    } catch (err) {
        res.status(400).json({success: false});
        console.log(err.stack);
    }
};

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = async (req, res, next) => {
    const {email, password} = await req.body;

    if(!email || !password){
        return res.status(400).json({success: false, msg: 'Enter email and passwords'})
    }

    const user = await User.findOne({email: email}).select('+password');
    
    //check user exists
    if(!user) {        
        return res.status(400).json({success: false, msg: 'No email'});
    }

    //check password
    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {  
        return res.status(400).json({success: false, msg: 'Wrong password lilbro'});
    }

    // create jwt token
    sendTokenResponse(user, 200, res);
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    });
}

// @desc get current logged in user
// @route POST /api/v1/auth/me
// @access private
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success: true, data: user});
}