"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
                MiddleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is required',
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood Group is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact No is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact No is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present Address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent Address is required',
            }),
            academicSemister: zod_1.z.string({
                required_error: 'Academic Semister is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic Department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic Faculty is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father Name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father Occupation is required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact no is required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother Name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother Occupation is required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact no is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: ' Name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local Guardian Occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local Guardian Contact no is required',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
                MiddleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'First Name is required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is required',
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood Group is required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact No is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact No is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present Address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent Address is required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is Required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic Department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic Faculty is required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
};
