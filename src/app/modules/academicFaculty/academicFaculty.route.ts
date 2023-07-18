import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post('/create-faculty', AcademicFacultyController.createFaculty);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch('/:id', AcademicFacultyController.updateFaculty);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
