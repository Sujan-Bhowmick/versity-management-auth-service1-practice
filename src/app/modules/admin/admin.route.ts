import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

router.get('/', AdminController.getAllAdmins);

// router.delete('/:id' , StudentController.deleteStudent);

export const AdminRoutes = router;
