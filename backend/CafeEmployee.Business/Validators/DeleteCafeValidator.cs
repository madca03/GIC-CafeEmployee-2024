using CafeEmployee.Core.Commands;
using FluentValidation;

namespace CafeEmployee.Business.Validators;

public class DeleteCafeValidator : AbstractValidator<DeleteCafeCommand>
{
    public DeleteCafeValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Cafe Id is required.");
    }
}