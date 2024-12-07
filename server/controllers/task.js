import Task from '../models/task.js';
import createHttpError from 'http-errors';
import User from '../models/user.js'

export const createTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { title, description, tags } = req.body;
  try {
    if (!title || description) {
      return next(
        createHttpError(400, 'Title and description fields are required')
      );
    }
    const task = await Task.create({
      userId,
      title,
      description,
      tags,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
export const getUserTasks = async(req, res, next)=>{
    const {id: userId} = req.user
    try {
        const user = await User.findById(userId)
        if(!user){
            return next (createHttpError(404, "User not found"))
        }
        const task = await Task.find({userId:userId}).sort({_id: -1})
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const deleteTasks = async(req, res, next)=> {
    const {id:userId}=req.user
    const {taskId}
}