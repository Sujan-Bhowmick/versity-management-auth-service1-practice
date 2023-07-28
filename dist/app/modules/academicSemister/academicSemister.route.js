"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemisterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemister_validation_1 = require("./academicSemister.validation");
const academicSemister_controller_1 = require("./academicSemister.controller");
const router = express_1.default.Router();
router.post('/create-semister', (0, validateRequest_1.default)(academicSemister_validation_1.AcademicSemisterValidation.createAcademicSemisterZodSchema), academicSemister_controller_1.AcademicSemisterController.createSemister);
router.get('/:id', academicSemister_controller_1.AcademicSemisterController.getSingleSemister);
router.patch('/:id', (0, validateRequest_1.default)(academicSemister_validation_1.AcademicSemisterValidation.updateAcademicSemisterZodSchema), academicSemister_controller_1.AcademicSemisterController.updateSemister);
router.delete('/:id', academicSemister_controller_1.AcademicSemisterController.deleteSemister);
router.get('/', academicSemister_controller_1.AcademicSemisterController.getAllSemister);
exports.AcademicSemisterRoutes = router;
