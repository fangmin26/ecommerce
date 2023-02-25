// import { Test, TestingModule } from '@nestjs/testing';
// import { User } from './entities/user.entity';
// import { UserController } from "./user.controller";
// import { UserService } from "./user.service";

import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service"

// describe('UserController', () => {
//   let userController: UserController;
//   let userService: UserService

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();
//     userService = module.get<UserService>(UserService)
//     userController = module.get<UserController>(UserController);
//   });

// //   describe('all', ()=>{
// //     it('should return all ',async () => {
// //         const result = [User]
// //         jest.spyOn(userService, 'all').mockImplementation(()=>result)
// //         //jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
// //         expect(await userController.getUsers()).toBe(result)
// //   })

//     describe('all', () => {
//         it('should return an array of cats', async () => {
//         const result = [User];
//         jest.spyOn(userService, 'all').mockImplementation(() => result);

//         expect(await userController.getUsers()).toBe(result);
//         });
//     });
// });

// describe('the user service', ()=>{
//     let userService: UserService;
//     let findOne: jest.Mock;
//     beforeEach(async()=>{
//         findOne = jest.fn();
//         const module = await Test.createTestingModule({
//             providers:[
//                 UserService,{
//                     provide: getRepositoryToken(User),
//                     useValue:{
//                         findOne
//                     }
//                 }
//             ]
//         }).compile();
//         userService = await module.get(UserService);
//     })
//     describe('when getting a user by email',()=>{
//         describe('and user mathed',()=>{

//         })
//         describe('')
//     })
// })