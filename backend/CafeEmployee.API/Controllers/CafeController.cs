using AutoMapper;
using CafeEmployee.API.Models.Cafe.RequestModels;
using CafeEmployee.API.Models.Shared.ResponseModels;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Core.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeEmployee.API.Controllers;

public class CafeController : BaseController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    
    public CafeController(IMediator mediator,
        IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpPost("/api/cafe")]
    public async Task<IActionResult> CreateCafe([FromBody] CreateOrUpdateCafeRequestModel req)
    {
        CreateCafeCommand command = _mapper.Map<CreateCafeCommand>(req);
        Cafe createdCafe = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(createdCafe));
    }

    [HttpGet("/api/cafes")]
    public async Task<IActionResult> GetCafes([FromQuery] GetCafeRequestModel req)
    {
        GetCafeQuery query = _mapper.Map<GetCafeQuery>(req);
        var cafes = await _mediator.Send(query);
        return GenericSuccess(new BaseDataAPIResponseModel(cafes));
    }

    [HttpPut("/api/cafe/{id:int}")]
    public async Task<IActionResult> UpdateCafe([FromRoute] int id, [FromBody] CreateOrUpdateCafeRequestModel req)
    {
        UpdateCafeCommand command = _mapper.Map<UpdateCafeCommand>(req);
        command.Id = id;
        Cafe updatedCafe = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(updatedCafe));
    }

    [HttpDelete("/api/cafe/{id:int}")]
    public async Task<IActionResult> DeleteCafe([FromRoute] int id)
    {
        DeleteCafeCommand command = new DeleteCafeCommand { Id = id };
        bool success = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(success));
    }
}