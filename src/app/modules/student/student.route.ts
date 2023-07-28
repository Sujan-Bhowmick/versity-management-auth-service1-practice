import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

router.get('/', StudentController.getAllStudents);

// router.delete('/:id' , StudentController.deleteStudent);

// router.patch(
//   '/create-student',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createStudent
// );

export const StudentRoutes = router;
