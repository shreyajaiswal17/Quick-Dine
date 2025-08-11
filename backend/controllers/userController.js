import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success:false, message:"User doesn't exist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.json({success:false, message:"Invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true, token})

// This sends the response back to the frontend in JSON format.
// token → gives the frontend the JWT so it can store it and send it in future requests.
// Why return the token?
// Because in stateless authentication, the backend doesn’t store login sessions. Instead, the frontend must send this token in the Authorization header every time it calls a protected API

  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
};


const createToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // checking email format and strong password
    if(!validator.isEmail(email)){
        return res.json({success: false, message: "Please enter a valid email"} )
    }

    if(password.length<8){
        return res.json({success: false, message: "Please enter a strong password"} )
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: "User registration failed" });
  }
};

export { loginUser, registerUser };
