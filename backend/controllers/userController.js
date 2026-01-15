const pool=require('../config/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}


const createUser = async (req, res) => {
  const {name,email,password,confirmPassword}=req.body;
  if(!email||!name||!password||!confirmPassword){
    return res.status(400).json({message:"All fields required."});
  }

  if(!isValidEmail(email)){
      return res.status(400).json({ message: "Invalid email format." });
  }

  if(password!=confirmPassword){
    return res.status(400).json({message:"Confirm password dosen't match password"});
  }

  try {

    const[checkEmail]=await pool.query("SELECT email FROM USERS WHERE email=?",[email]);
    if(checkEmail.length>0){
      return res.status(409).json({message:"Email already exist try with new email"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const[result]=await pool.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]);

    return res.status(200).json({message:"User created successfully.",userId:result.insertId});

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};


const loginUser=async(req,res)=>{
  const{email,password}=req.body;
   if(!email||!password){
    return res.status(400).json({message:"All fields required."});
  }
  try{
   const[result]=await pool.query("SELECT * FROM users WHERE email=?",[email]);
      if (result.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token=jwt.sign({email:user.email,id:user.id},process.env.JWT_SECRET,{expiresIn:"1d"});

    return res.status(200).json({message:token});


  }
  catch(e){
    return res.status(500).json({error:e.message});
  }
};

module.exports = { createUser,loginUser };
