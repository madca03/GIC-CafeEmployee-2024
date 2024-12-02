using System.Transactions;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Repository.Context;
using FluentValidation;
using MediatR;

namespace CafeEmployee.Business.CommandHandlers;

public class EmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, Employee>,
    IRequestHandler<UpdateEmployeeCommand, Employee>,
    IRequestHandler<DeleteEmployeeCommand, bool>
{
    private readonly AppMasterDBContext _context;
    private readonly IValidator<CreateEmployeeCommand> _createEmployeeValidator;
    private readonly IValidator<UpdateEmployeeCommand> _updateEmployeeValidator;
    private readonly IValidator<DeleteEmployeeCommand> _deleteEmployeeValidator;
    
    public EmployeeCommandHandler(AppMasterDBContext context,
        IValidator<CreateEmployeeCommand> createEmployeeValidator,
        IValidator<UpdateEmployeeCommand> updateEmployeeValidator,
        IValidator<DeleteEmployeeCommand> deleteEmployeeValidator)
    {
        _context = context;
        _createEmployeeValidator = createEmployeeValidator;
        _updateEmployeeValidator = updateEmployeeValidator;
        _deleteEmployeeValidator = deleteEmployeeValidator;
    }
    
    private readonly string Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private string GenerateUniqueId()
    {
        var random = new Random();
        var result = "UI"; // Prefix 'UI'
        
        for (int i = 0; i < 6; i++)
        {
            result += Characters[random.Next(Characters.Length)];
        }

        return result;
    }
    
    public async Task<Employee> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _createEmployeeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        using (var scope = new TransactionScope())
        {
            Employee newEmployee = new Employee
            {
                EmployeeStringId = GenerateUniqueId(),
                Name = request.Name,
                EmailAddress = request.EmailAddress,
                PhoneNumber = request.PhoneNumber,
                Gender = request.Gender.ToLower() == "male" ? false : true,
            };

            _context.Employee.Add(newEmployee);
            _context.SaveChanges();

            var cafe = _context.Cafe.FirstOrDefault(x => x.CafeStringId == request.CafeId);
            if (cafe == null) throw new Exception($"Cafe not found for id: {request.CafeId}");
        
            Core.Models.DatabaseModels.CafeEmployee newCafeEmployee = new Core.Models.DatabaseModels.CafeEmployee
            {
                EmployeeId = newEmployee.Id,
                CafeId = cafe.Id,
                IsActive = true,
                EmployeeStartDate = DateTime.Now
            };

            _context.CafeEmployee.Add(newCafeEmployee);
            _context.SaveChanges();
            
            scope.Complete();
            return newEmployee;
        }
    }

    public async Task<Employee> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _updateEmployeeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        using (var scope = new TransactionScope())
        {
            Employee employeeToUpdate = _context.Employee.FirstOrDefault(x => x.EmployeeStringId == request.Id);
            if (employeeToUpdate == null) throw new Exception($"Employee with id {request.Id} not found");

            employeeToUpdate.Name = request.Name;
            employeeToUpdate.EmailAddress = request.EmailAddress;
            employeeToUpdate.Gender = request.Gender == "male" ? false : true;
            employeeToUpdate.PhoneNumber = request.PhoneNumber;

            Cafe cafe = _context.Cafe.FirstOrDefault(x => x.CafeStringId == request.CafeId);
            if (cafe == null) throw new Exception($"Cafe not found for id: {request.CafeId}");
            
            Core.Models.DatabaseModels.CafeEmployee cafeEmployeeToUpdate = _context.CafeEmployee.FirstOrDefault(x => x.EmployeeId == employeeToUpdate.Id);
            if (cafeEmployeeToUpdate == null)
            {
                var newRecord = new Core.Models.DatabaseModels.CafeEmployee
                {
                    EmployeeId = employeeToUpdate.Id,
                    CafeId = cafe.Id,
                    EmployeeStartDate = DateTime.Now,
                    IsActive = true
                };
                _context.CafeEmployee.Add(newRecord);
            }
            else
            {
                cafeEmployeeToUpdate.CafeId = cafe.Id;
            }
            
            _context.SaveChanges();
            scope.Complete();
            return employeeToUpdate;
        }
    }

    public async Task<bool> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _deleteEmployeeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        using (var scope = new TransactionScope())
        {
            Employee employeeToDelete = _context.Employee.FirstOrDefault(x => x.EmployeeStringId == request.Id);
            if (employeeToDelete == null) throw new Exception($"Employee with id {request.Id} not found");
        
            Core.Models.DatabaseModels.CafeEmployee cafeEmployeeToDelete = _context.CafeEmployee.FirstOrDefault(x => x.EmployeeId == employeeToDelete.Id);
            if (cafeEmployeeToDelete != null)
            {
                _context.CafeEmployee.Remove(cafeEmployeeToDelete);
                _context.SaveChanges();
            }

            _context.Employee.Remove(employeeToDelete);
            _context.SaveChanges();
            scope.Complete();
            return true;
        }
    }
}