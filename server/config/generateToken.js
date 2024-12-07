import jwt from "jsonwebtoken"
//then we creata functn fo it 
const generateToken = (id)=>{
     
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
};

export default generateToken