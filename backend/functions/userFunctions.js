import User from '../models/userModel.js'
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
    }
    else{
      return {
        status:false,
        message:"User not found or the password doesn't match"
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

      const newUser = await User.create({ 
        username, 
        email, 
        password 
      });

      const verifiedUser = await verifyUser(email, password);
      if (!verifiedUser.status) {
        return res.status(400).json({
          status: 'Failed',
          message: verifiedUser.message,
        });
      }

      const { username: verifiedUsername, email: verifiedEmail } = verifiedUser.user;

      res.status(201).json({
        status: 'Success',
        message: 'User created and verified successfully',
        user: {
          name: verifiedUsername,
          email: verifiedEmail,
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
  



const loginUser = async(req,res)=>{
    const { email, password } = req.body

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
          status: 'Failed',
          message: verifiedUser.message,
        });
      }

      const { username: verifiedUsername, email: verifiedEmail } = verifiedUser.user;

      res.status(200).json({
        status: 'Success',
        message: 'User logged in successfully',
        user: {
          name: verifiedUsername,
          email: verifiedEmail,
        },
      });

    } catch (error) {
      res.send(400).json({
        status:'Failed',
        message:'Error logging in user',
        error:error.response
      })
    }
}

export {registerUser, loginUser}