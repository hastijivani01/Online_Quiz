const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "hastijivani01@gmail.com",
    pass: "njpeycqscfsxtudu",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'hastijivani01@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);


exports.usersign = async (req , res) => {
    try {
    
        const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) throw new Error('Email already exists');


        req.body.password = await bcrypt.hash(req.body.password , 10)
        const data = await userModel.create(req.body)
        console.log( data);
        res.status(200).json({
          status: 'Success',
          Message: 'User created successfully',
          Data: data
        })      
    } catch (error) {
      res.status(404).json({
        status: 'Fail',
        Message: error.message,
      });
    }
}


exports.userlogin = async (req, res) => {
  try {
    const loginData = await userModel.findOne({email: req.body.email})
    if(!loginData) throw new Error ('Invalid Email !!')
      const  verifypassword = await bcrypt.compare(req.body.password, loginData.password)
      if(!verifypassword) throw new Error ('Invalid Password !!')

        const token = jwt.sign({id: loginData._id}, 'surat')

        
        res.status(200).json({
            status: 'Success',
            Message: 'Login user Success',
            Data: loginData,
            token,
        });
        await main(req.body.email)
  } catch (error) {
    res.status(404).json({
      status: 'Fail',
      Message: error.message,
    });
  }
}