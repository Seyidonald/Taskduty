//CONTROLLER LOGIC ON HOW TO CREATE A USER
import createHttpErrors from 'http-errors';
import bcrypt from 'bcrypt';
import generateToken from '../config/generateToken.js';
import User from "../models/user.js"


export const registerUser = async (req, res, next) => {
  //d nxt is sayin if  d if conditn doesnt wrk,
  // here we usin d async 2 mk API request & it takes in req & res
  // dz r wat we request frm d fronend & its in d user/model folder cald eactly its arrng. den we use req.body 2 req frm frontend
  const { username, email, password } = req.body;
  console.log(req.body);
  
  if (!username || !email || !password) {
    return next(createHttpErrors(400, 'Form fields must be filled')); //400 is status code error 2 shw error if 4rm client side
  }
  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next(createHttpErrors(400, 'username already exist'));
    }
    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
      return next(createHttpErrors(400, 'email already exist'));
    }
    const salt = await bcrypt.genSalt(10); // hw deep d encryption shld go.. gotten frm bcrypt npm then we hash d password
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const accessToken = generateToken(user._id);
    res.status(201).json({ accessToken, msg: 'user registration successful' }); // doc newly created while 200 is a succesful api fetched
  } catch (error) {
    next(error);
  }
};
//so we writin for nhow we gonna login
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(createHttpErrors(400, 'username or password is required'));
  }
  try {
    const user = await User.findOne({username}).select("+password");
    if (!user) {
      return next(createHttpErrors(404, 'user not found'));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return createHttpErrors(401, 'Invalid credentials');
    }
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken, msg: 'login successful' });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpErrors(400, 'user not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
/*line 12... we throw an error using npm package http-errors dt can b //used to send error to our frontend*/
//THINGS WE DID ABOVE
//WE REGISTER USER
//LOGIN USER
//AUTHENTICATE USER
