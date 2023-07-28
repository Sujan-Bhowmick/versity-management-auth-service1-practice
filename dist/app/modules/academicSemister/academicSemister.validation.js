"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemisterValidation = void 0;
const zod_1 = require("zod");
const academicSemister_constant_1 = require("./academicSemister.constant");
const createAcademicSemisterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemister_constant_1.academicSemisterTitle], {
            required_error: 'Title is required',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required',
        }),
        code: zod_1.z.enum([...academicSemister_constant_1.academicSemisterCode], {
            required_error: 'Code is required',
        }),
        startMonth: zod_1.z.enum([...academicSemister_constant_1.academicSemisterMonth], {
            required_error: 'Start Month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemister_constant_1.academicSemisterMonth], {
            required_error: 'End Month is required',
        }),
    }),
    // ensure 1: Route Level : Update --> title: code: Give me title and code both, neither
});
const updateAcademicSemisterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemister_constant_1.academicSemisterTitle], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemister_constant_1.academicSemisterCode], {
            required_error: 'Code is required',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemister_constant_1.academicSemisterMonth], {
            required_error: 'Start Month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemister_constant_1.academicSemisterMonth], {
            required_error: 'End Month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided or neither',
});
exports.AcademicSemisterValidation = {
    createAcademicSemisterZodSchema,
    updateAcademicSemisterZodSchema,
};
