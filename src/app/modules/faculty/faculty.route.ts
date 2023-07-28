import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from './facutly.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

router.get('/', FacultyController.getAllFaculties);

// router.delete('/:id' , StudentController.deleteStudent);

export const FacultyRoutes = router;
