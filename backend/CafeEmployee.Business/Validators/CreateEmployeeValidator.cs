using CafeEmployee.Core.Commands;
using FluentValidation;

namespace CafeEmployee.Business.Validators;

public class CreateEmployeeValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required")
            .MaximumLength(10).WithMessage("Name can only have up to 10 characters")
            .MinimumLength(6).WithMessage("Name must be at least 6 characters");

        RuleFor(x => x.EmailAddress).NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Should be a valid email address");

        RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required")
            .Length(8).WithMessage("Phone number should have 8 digits")
            .Matches("^[89]").WithMessage("Phone number should start with 8 or 9");

        RuleFor(x => x.Gender).NotEmpty().WithMessage("Gender is required");

        RuleFor(x => x.CafeId).NotEmpty().WithMessage("Cafe Id is required.");
    }
}