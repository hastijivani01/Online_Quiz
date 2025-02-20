const jwt = require('jsonwebtoken')
const userModel = require('../model/user')


exports.tokenSecure = async(req, res , next) => {
    try {
        const token = req.headers.authorization
        if(!token) throw new Error ('Attach Token!')
            const tokenVerify = jwt.verify(token, 'surat')
        const userVerify = await userModel.findById(tokenVerify.id)
        if(!userVerify) throw new Error('User Not Found!!')
        next()
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}