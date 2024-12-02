using System.Transactions;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Repository.Context;
using FluentValidation;
using MediatR;

namespace CafeEmployee.Business.CommandHandlers;

public class CafeCommandHandler : IRequestHandler<CreateCafeCommand, Cafe>,
    IRequestHandler<UpdateCafeCommand, Cafe>,
    IRequestHandler<DeleteCafeCommand, bool>
{
    private readonly AppMasterDBContext _context;
    private readonly IValidator<CreateCafeCommand> _createCafeValidator;
    private readonly IValidator<UpdateCafeCommand> _updateCafeValidator;
    private readonly IValidator<DeleteCafeCommand> _deleteCafeValidator;
    
    public CafeCommandHandler(AppMasterDBContext context,
        IValidator<CreateCafeCommand> createCafeValidator,
        IValidator<UpdateCafeCommand> updateCafeValidator,
        IValidator<DeleteCafeCommand> deleteCafeValidator)
    {
        _context = context;
        _createCafeValidator = createCafeValidator;
        _updateCafeValidator = updateCafeValidator;
        _deleteCafeValidator = deleteCafeValidator;
    }
    
    public async Task<Cafe> Handle(CreateCafeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _createCafeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        Cafe newCafe = new Cafe
        {
            CafeStringId = Guid.NewGuid().ToString(),
            Name = request.Name,
            Location = request.Location,
            Description = request.Description
        };

        _context.Add(newCafe);
        _context.SaveChanges();
        return newCafe;
    }

    public async Task<Cafe> Handle(UpdateCafeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _updateCafeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        Cafe cafeToUpdate = _context.Cafe.FirstOrDefault(x => x.Id == request.Id);
        if (cafeToUpdate == null) throw new Exception($"Cafe with id {request.Id} not found.");

        cafeToUpdate.Name = request.Name;
        cafeToUpdate.Description = request.Description;
        cafeToUpdate.Location = request.Location;
        cafeToUpdate.Logo = request.Logo;

        _context.SaveChanges();
        return cafeToUpdate;
    }

    public async Task<bool> Handle(DeleteCafeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _deleteCafeValidator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            string errors = validationResult.ToString();
            throw new Exception(errors);
        }

        using (var scope = new TransactionScope())
        {
            Cafe cafeToDelete = _context.Cafe.FirstOrDefault(x => x.Id == request.Id);
            if (cafeToDelete == null) throw new Exception($"Cafe with id {request.Id} not found.");

            var employees = _context.CafeEmployee.Where(x => x.CafeId == request.Id).ToList();
        
            _context.CafeEmployee.RemoveRange(employees);
            _context.SaveChanges();
        
            _context.Cafe.Remove(cafeToDelete);
            _context.SaveChanges();
            
            scope.Complete();
            return true;
        }
    }
}