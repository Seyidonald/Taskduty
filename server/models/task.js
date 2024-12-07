import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    userId: {//dz iz 2 knw whos creaatin d id
      type: Schema.Types.ObjectId, //schema type // look into schema n track d id of d doc. & look in2 d schema n get d id
      ref: 'user',
      required: true,
    },
    title: {
      type: 'String',
      required: true,
      max: 50, //i.e the numbers ocf characters
    },
    description: {
      type: 'String',
      required: true,
    },
    tags: {
      // adding the urgent and important in the tag figma design.i.e sendin anytin frm d fe dt is not imp wl be rejected
      type: 'String',
      required: true,
      enum: ['urgent', 'Important'], // predefault expected frm fe any obj dt isnt imp or urgent wl thro in an error
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);// these are d 2 models needded for our project