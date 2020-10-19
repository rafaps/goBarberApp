import { Router } from 'express';
import { getRepository } from 'typeorm';


import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

 const userRouter = Router();

 userRouter.get('/', async(request, response) => {
    const userRepository = getRepository(User);

    const users =  await userRepository.find();
    return response.json(users);

 });

 userRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({name, email, password});

        delete user.password;

        return response.json(user);
    } catch (err){
        return response.status(400).json({error: err.message});
    }
 });

 export default userRouter;