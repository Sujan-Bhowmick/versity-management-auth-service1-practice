"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = exports.facultySchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
exports.facultySchema = new mongoose_2.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        // required: true,
    },
    academicFaculty: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Faculty = (0, mongoose_1.model)('Faculty', exports.facultySchema);
