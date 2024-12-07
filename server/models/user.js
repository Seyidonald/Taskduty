import { Schema, model } from 'mongoose';
const userSchema = new Schema( //creating a new instance schema
  //what values/ datatypes are we using.. here we need string.. &also if compulsory set required to tru also ensure datas are unique to users. so set unique to true.
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, //dz is set 2 false cos we dnt want it 2 get 2 d frontend. d pwrd isa sensitive info
    },
  },
  {
    timestamps: true,
  }
);
const User = model('User', userSchema);

export default User;
