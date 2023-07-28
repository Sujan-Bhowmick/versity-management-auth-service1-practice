"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            MiddleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...student_constant_1.gender]).optional(),
        bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
        email: zod_1.z.string().email().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(),
        academicFaculty: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.facultyValidation = {
    updateFacultyZodSchema,
};
