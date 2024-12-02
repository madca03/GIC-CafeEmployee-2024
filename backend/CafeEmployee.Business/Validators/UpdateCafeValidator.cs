using CafeEmployee.Core.Commands;
using FluentValidation;

namespace CafeEmployee.Business.Validators;

public class UpdateCafeValidator : AbstractValidator<UpdateCafeCommand>
{
    public UpdateCafeValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Cafe Id is required.");
        
        RuleFor(x => x.Name).NotEmpty().WithMessage("Cafe name is required")
            .MaximumLength(10).WithMessage("Cafe name can only have up to 10 characters")
            .MinimumLength(6).WithMessage("Cafe name must be at least 6 characters");

        RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required")
            .MaximumLength(256).WithMessage("Description can only have up to 256 characters");

        RuleFor(x => x.Location).NotEmpty().WithMessage("Location is required");
    }
}