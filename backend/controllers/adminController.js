import customerModel from "../models/Customer.js";
import adminModel from "../models/Admin.js";
import JWT from "jsonwebtoken";

import { hashPassword, comparePassword } from "../helpers/authHelper.js";

//controller for admin registration
export const adminRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone_number } = req.body;
    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }

    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }

    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }

    if (!phone_number) {
      return res.status(400).send({ message: "phone number is required" });
    }

    //check existing admin
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }

    //password hashed
    const hashedPassword = await hashPassword(password);

    //create new admin
    const admin = new adminModel({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

    //save the new admin to the database
    await admin.save();

    // Respond with success message and customer data
    res.status(201).send({
      success: true,
      message: "admin register succeessfully",
      admin,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while admin registration",
      error: error.message,
    });
  }
};





//Admin Login controller
export const adminLoginController =async (req , res)=>{
    try {
        const {email , password} = req.body;

        //validate email and password
        if(!email) {
            return res.status(404).send({
                success:false,
                message:"Enter Email Address"
            })
        }
        if(!password){
            return res.status(404).send({
                success:false,
                message:"Enter Password"
            })
        }

    // Find the admin in the database by email
        const admin = await adminModel.findOne({email})

        if(!admin){
            return res.status(200).send({
                success:false,
                message:"Email is not Register"
            })
        }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password , admin.password)

    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }

    // Generate a JWT token with the user's ID as the payload, set to expire in 7 days
    const token = await JWT.sign({_id:admin._id} ,process.env.JWT_SECRET ,{
        expiresIn:"1h",
    })

    // Respond with user details and the generated token
    res.status(200).send({
        success:true,
        message:"Login Successfully",
        admin:{
            _id:admin._id,
            name:admin.name
        },
        token
    })
} catch (error) {
        res.status(500).send({
            success:false,
            message:"Error In Login",
            error ,
        })
    }
}