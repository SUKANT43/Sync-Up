const pool=require('../config/db');

const addProduct=async(req,res)=>{
    const{name,price}=req.body;
    if(!name||!price){
        return res.status(400).json({message:"all the fields are required"});
    }
    try{
        const[checkProductExist]=await pool.query("SELECT * FROM products WHERE name=?",[name]);
        if(checkProductExist>0){
            return res.status(400).json({message:"product already exist"});
        }

        const[result]=await pool.query("INSERT INTO products(name,price) VALUES(?,?)",[name,price]);

        return res.status(200).json({message:"product added successfully",userId:result.insertId});

    }
    catch(e){
        return res.status(500).json({error:e.message});
    }
}

module.exports={addProduct};