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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({success:true, message:"Logged in successfully"})



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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({success:true, message:"Account created successfully"})

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: "User registration failed" });
  }
};

// verify user (check if token is valid)
const verifyUser = async (req, res) => {
  try {
    // If this function is called, it means authMiddleware verified the token
    res.json({success:true, token: req.cookies.token})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.json({success:true, message:"Logged out successfully"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
};

const verifyAdmin = async (req,res)=>{

    try{

        const user=await userModel.findById(req.body.userId);

        if(!user){

            return res.status(401).json({
                success:false
            });

        }

        if(user.role!=="admin"){

            return res.status(403).json({
                success:false
            });

        }

        res.json({
            success:true
        });

    }catch(error){

        res.status(500).json({
            success:false
        });

    }

}

export { loginUser, registerUser, verifyUser, logoutUser, verifyAdmin };
