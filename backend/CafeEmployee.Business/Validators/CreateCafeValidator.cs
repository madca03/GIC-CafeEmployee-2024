using CafeEmployee.Core.Commands;
using FluentValidation;

namespace CafeEmployee.Business.Validators;

public class CreateCafeValidator : AbstractValidator<CreateCafeCommand>
{
    public CreateCafeValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Cafe name is required")
            .MaximumLength(10).WithMessage("Cafe name can only have up to 10 characters")
            .MinimumLength(6).WithMessage("Cafe name must be at least 6 characters");

        RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required")
            .MaximumLength(256).WithMessage("Description can only have up to 256 characters");

        RuleFor(x => x.Location).NotEmpty().WithMessage("Location is required");
    }
}