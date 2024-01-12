import UserTable from '../models/usermodel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const createUser = async (req, res, next) => {
    const {sfsuid, firstname,lastname,password,major} = req.body; 

    const oldUser = await UserTable.findOne({ sfsuid });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

   const token = jwt.sign(
        { user_id: sfsuid, firstname },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
    const newData = new UserTable({
        sfsuid: sfsuid, 
        firstname: firstname,
        lastname: lastname,
        password: encryptedPassword,
        major: major,
        token: token
    });

    try{
        newData.save();
        res.status(202).json(newData);
    }

    catch(err){
        res.status(409).json({message: "data create failed"});
    }
}
export const getUser = async (req, res, next) => {
     try{
        const users = await UserTable.find({'sfsuid' : req.params.sfsuid});
        res.json(users);
    }

    catch(err){
        res.status(409).json({message: "data not found"});
    }
}
export const UserLogin = async (req, res) => {

    try {

      const { sfsuid, password } = req.body;
  
      if (!(sfsuid && password)) {
        res.status(400).send("All input is required");
        return;
      }

      const user = await UserTable.findOne({'sfsuid': sfsuid });
      if (user && (await bcrypt.compare(password, user.password))) {
        const firstname = user.firstname;

   const token = jwt.sign(
        { user_id: sfsuid, firstname },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
  
        user.token = token;
  
       res.json(user);
      }
      else{
      res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  export const usertry = (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  };