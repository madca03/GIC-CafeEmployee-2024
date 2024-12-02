using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Core.Models.ResultModels;
using CafeEmployee.Core.Queries;
using CafeEmployee.Repository.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CafeEmployee.Business.QueryHandlers;

public class CafeQueryHandler: IRequestHandler<GetCafeQuery, IReadOnlyList<CafeResultModel>>
{
    private readonly AppSlaveDBContext _context;
    
    public CafeQueryHandler(AppSlaveDBContext context)
    {
        _context = context;
    }
    
    public async Task<IReadOnlyList<CafeResultModel>> Handle(GetCafeQuery request, CancellationToken cancellationToken)
    {
        var query = 
            from c in _context.Cafe
                let employeeCount = (from ce in _context.CafeEmployee
                                        where ce.CafeId == c.Id
                                        select ce).Count()
            select new
            {
                Cafe = c,
                Employees = employeeCount
            };

        if (!string.IsNullOrEmpty(request.Location))
            query = query.Where(c => c.Cafe.Location.ToLower().Contains(request.Location.ToLower()));

        if (!string.IsNullOrEmpty(request.Id))
            query = query.Where(c => c.Cafe.CafeStringId == request.Id);

        var res = query.Select(x => new CafeResultModel
        {
            Id = x.Cafe.CafeStringId,
            Name = x.Cafe.Name,
            Description = x.Cafe.Description,
            Employees = x.Employees,
            Logo = x.Cafe.LogoFileData,
            Location = x.Cafe.Location
        });

        return await res.ToListAsync();
    }
}