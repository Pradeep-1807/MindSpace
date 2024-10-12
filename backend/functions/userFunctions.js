import User from '../models/userModel.js'

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Username, email, and password are required.',
      });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Email is already registered.',
        });
      }
  
      // Create a new user
      const newUser = await User.create({ 
        username, 
        email, 
        password });
  
      // Send response
      res.status(201).json({
        status: 'Success',
        message: 'User created successfully',
        user: newUser,
      });
      
      console.log('User inserted :: ', newUser);
  
    } catch (error) {
      console.error('Error creating user:', error); // Log error to see the issue
      res.status(500).json({
        status: 'Error',
        message: 'Error creating user',
        error: error.message,
      });
    }
  };
  

const verifyUser = async(req,res)=>{
    
}

export {registerUser, verifyUser}