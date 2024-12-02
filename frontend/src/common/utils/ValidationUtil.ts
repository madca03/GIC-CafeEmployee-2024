import v8n from "v8n";
import CafeFormModel from "@/features/forms/CafeForm/models/CafeFormModel";
import EmployeeFormModel from "@/features/forms/EmployeeForm/models/EmployeeFormModel";

export default {
    isValidCafe(cafe: CafeFormModel) {
        const validations = [
            {
                field: 'name',
                validation: v8n().schema({name: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Name is required"
            },
            {
                field: 'name',
                validation: v8n().schema({name: v8n()
                        .string()
                        .minLength(6)
                        .maxLength(10)}),
                errorMessage: "Name should be 6 to 10 characters long"
            },
            {
                field: 'description',
                validation: v8n().schema({description: v8n()
                        .string()
                        .maxLength(256)}),
                errorMessage: "Description should be at most 256 characters"
            },
            {
                field: 'description',
                validation: v8n().schema({description: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Description is required"
            },
            {
                field: 'location',
                validation: v8n().schema({location: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Location is required"
            }
        ];

        const failedValidations = validations
            .filter(({ field, validation }) => !validation.test(cafe));

        const errorMessages: Record<string, string> = {};

        for (const failedValidation of failedValidations) {
            if (Object.hasOwn(errorMessages, failedValidation.field)) continue;

            errorMessages[failedValidation.field] = failedValidation.errorMessage;
        }

        return [Object.keys(errorMessages).length === 0, errorMessages];
    },

    isValidEmployee(employee: EmployeeFormModel) {
        const validations = [
            {
                field: 'name',
                validation: v8n().schema({name: v8n()
                        .string()
                        .minLength(6)
                        .maxLength(10)}),
                errorMessage: "Name should be 6 to 10 characters long"
            },
            {
                field: 'emailAddress',
                validation: v8n().schema({emailAddress: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Email Address is required"
            },
            {
                field: 'emailAddress',
                validation: v8n().schema({emailAddress: v8n()
                        .string()
                        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)}),
                errorMessage: "Should be a valid email address."
            },
            {
                field: 'phoneNumber',
                validation: v8n().schema({phoneNumber: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Phone number is required."
            },
            {
                field: 'phoneNumber',
                validation: v8n().schema({phoneNumber: v8n()
                        .string()
                        .pattern(/^\d+$/)}),
                errorMessage: "Phone number should only contain digits."
            },
            {
                field: 'phoneNumber',
                validation: v8n().schema({phoneNumber: v8n()
                        .string()
                        .length(8)}),
                errorMessage: "Phone number should have 8 digits"
            },
            {
                field: 'phoneNumber',
                validation: v8n().schema({phoneNumber: v8n()
                        .string()
                        .pattern(/^[89]/)}),
                errorMessage: "Phone number should start with either 8 or 9"
            },
            {
                field: 'gender',
                validation: v8n().schema({gender: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Gender is required."
            },
            {
                field: 'cafeId',
                validation: v8n().schema({cafeId: v8n()
                        .string()
                        .not.null()
                        .not.empty()}),
                errorMessage: "Cafe is required."
            }
        ]

        const failedValidations = validations
            .filter(({ field, validation }) => !validation.test(employee));

        const errorMessages: Record<string, string> = {};

        for (const failedValidation of failedValidations) {
            if (Object.hasOwn(errorMessages, failedValidation.field)) continue;

            errorMessages[failedValidation.field] = failedValidation.errorMessage;
        }

        return [Object.keys(errorMessages).length === 0, errorMessages];
    }
}