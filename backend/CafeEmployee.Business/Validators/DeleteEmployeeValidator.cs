using CafeEmployee.Core.Commands;
using FluentValidation;

namespace CafeEmployee.Business.Validators;

public class DeleteEmployeeValidator : AbstractValidator<DeleteEmployeeCommand>
{
    public DeleteEmployeeValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required.");
    }
}