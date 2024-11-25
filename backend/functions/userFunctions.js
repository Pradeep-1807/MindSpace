import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const verifyUser = async(email,password)=>{
  if (!email || !password){
    return {
      status:false,
      message:"Email and Password required"
    }
  }

  try {
    const fetchedUser = await User.findOne({email})
    if (fetchedUser && await bcrypt.compare(password,fetchedUser.password)){
      return {
        status:true,
        user: fetchedUser
      }
    } else if (!fetchedUser){
      return {
        status:false,
        message:"User not found"
      }
    }
    else{
      return {
        status:false,
        message:"Password doesn't match. Try againc"
      }
    }
  } catch (error) {
    return { status: false, message: error.message }
  }
}


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        message: 'Username, email, and password are required.',
      });
    }
   

    try {
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: 'Email is already registered.',
        });
      }

      const userWithSameUsername = await User.findOne({ username })
      if (userWithSameUsername){
        return res.status(400).json({
          status:false,
          message: 'Username is already taken'
        })
      }
      
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({ 
        username, 
        email, 
        password: hashedPassword 
      });

      // const verifiedUser = await verifyUser(email, password);
      // if (!verifiedUser.status) {
      //   return res.status(400).json({
      //     status: 'Failed',
      //     message: verifiedUser.message,
      //   });
      // }


      res.status(201).json({
        status: true,
        message: 'User created & verified successfully',
        user: {
          name: newUser.username,
          email: newUser.email,
        },
      });
      
      
  
    } catch (error) {
      console.error('Error creating user:', error); 
      res.status(500).json({
        status: 'Failed',
        message: 'Error creating user',
        error: error.message,
      });
    }
    
  };
  



  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email and Password are required.',
      });
    }
  
    try {
      const verifiedUser = await verifyUser(email, password);
      if (!verifiedUser.status) {
        return res.status(400).json({
          status: false,
          title: 'Failed',
          message: verifiedUser.message,
        });
      }
  
      const { _id, username: verifiedUsername, email: verifiedEmail } = verifiedUser.user;
  
      
      const token = jwt.sign(
        { id: _id, username: verifiedUsername, email: verifiedEmail }, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '15d' }
      );
  
      // Set the token in a HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,  // Cookie is only accessible by the server, not via JS
        secure: process.env.NODE_ENV === 'production',  // Set to true in production
        sameSite: 'Strict',  // Helps prevent CSRF attacks
        maxAge: 1000 * 60 * 60 * 24 * 15  // Optional: cookie expiry (15 days in ms)
      });

      const verifiedUserFromToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Send a successful response with user data and token
      res.status(200).json({
        status: true,
        title:'Success',
        message: 'User logged in successfully',
        user: verifiedUserFromToken
      });
  
    } catch (error) {
      res.status(500).json({
        status: 'Failed',
        message: 'Error logging in user',
        error: error.message
      });
    }
  };
  
const logoutUser = async(req, res)=>{
  try {
    await res.clearCookie('authToken', {
      httpOnly: true,        // Ensure the same settings as when the cookie was set
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.status(200).json({
      status:true,
      message:'User logged out Successfully'
    })
    
  } catch (error) {
    console.error(error)
  }
}


export {registerUser, loginUser, logoutUser}