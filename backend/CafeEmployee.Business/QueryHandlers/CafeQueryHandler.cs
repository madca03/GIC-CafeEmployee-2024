using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Core.Queries;
using CafeEmployee.Repository.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CafeEmployee.Business.QueryHandlers;

public class CafeQueryHandler: IRequestHandler<GetCafeQuery, IReadOnlyList<Cafe>>
{
    private readonly AppSlaveDBContext _context;
    
    public CafeQueryHandler(AppSlaveDBContext context)
    {
        _context = context;
    }
    
    public async Task<IReadOnlyList<Cafe>> Handle(GetCafeQuery request, CancellationToken cancellationToken)
    {
        var query = from c in _context.Cafe
            select c;

        if (!string.IsNullOrEmpty(request.Location))
            query = query.Where(c => c.Location.ToLower().Contains(request.Location.ToLower()));

        if (request.Id.HasValue)
            query = query.Where(c => c.Id == request.Id);
        
        return await query.ToListAsync(cancellationToken: cancellationToken);
    }
}