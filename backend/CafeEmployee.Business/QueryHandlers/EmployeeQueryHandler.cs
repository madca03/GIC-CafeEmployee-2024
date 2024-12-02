using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Core.Models.ResultModels;
using CafeEmployee.Core.Queries;
using CafeEmployee.Repository.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CafeEmployee.Business.QueryHandlers;

public class EmployeeQueryHandler : IRequestHandler<GetEmployeeQuery, IReadOnlyList<CafeEmployeeResultModel>>,
    IRequestHandler<GetEmployeeDBQuery, EmployeeFormDetailResultModel>
{
    private readonly AppSlaveDBContext _context;
    
    public EmployeeQueryHandler(AppSlaveDBContext context)
    {
        _context = context;
    }
    
    public async Task<IReadOnlyList<CafeEmployeeResultModel>> Handle(GetEmployeeQuery request, CancellationToken cancellationToken)
    {
        var query = from e in _context.Employee
            join ce in _context.CafeEmployee on e.Id equals ce.EmployeeId into gce
            from ce in gce.DefaultIfEmpty()
            join c in _context.Cafe on ce.CafeId equals c.Id into gc
            from c in gc.DefaultIfEmpty()
            select new
            {
                Employee = e,
                Cafe = c,
                EmployeeStartDate = ce.EmployeeStartDate
            };

        if (!string.IsNullOrEmpty(request.CafeId))
            query = query.Where(c => c.Cafe != null && c.Cafe.CafeStringId == request.CafeId);

        if (!string.IsNullOrEmpty(request.EmployeeStringId))
            query = query.Where(c => c.Employee.EmployeeStringId == request.EmployeeStringId);

        var res = query.Select(x => new CafeEmployeeResultModel
        {
            EmployeeStringId = x.Employee.EmployeeStringId,
            Name = x.Employee.Name,
            EmailAddress = x.Employee.EmailAddress,
            PhoneNumber = x.Employee.PhoneNumber,
            DaysWorked = x.Cafe == null ? 0 : (DateTime.Now - x.EmployeeStartDate).Days,
            Cafe = x.Cafe == null ? null : x.Cafe.Name
        });

        return await res.ToListAsync(cancellationToken);
    }

    public async Task<EmployeeFormDetailResultModel> Handle(GetEmployeeDBQuery request, CancellationToken cancellationToken)
    {
        var query = from e in _context.Employee
            join ce in _context.CafeEmployee on e.Id equals ce.EmployeeId into gce
            from ce in gce.DefaultIfEmpty()
            join c in _context.Cafe on ce.CafeId equals c.Id into gc
            from c in gc.DefaultIfEmpty()
            select new
            {
                Employee = e,
                Cafe = c,
                EmployeeStartDate = ce.EmployeeStartDate
            };
        
        if (!string.IsNullOrEmpty(request.EmployeeStringId))
            query = query.Where(c => c.Employee.EmployeeStringId == request.EmployeeStringId);

        var res = query.Select(x => new EmployeeFormDetailResultModel
        {
            Name = x.Employee.Name,
            EmailAddress = x.Employee.EmailAddress,
            PhoneNumber = x.Employee.PhoneNumber,
            Gender = x.Employee.Gender == false ? "male" : "female",
            CafeId = x.Cafe != null ? x.Cafe.CafeStringId : null
        });

        return await res.FirstAsync(cancellationToken);
    }
}