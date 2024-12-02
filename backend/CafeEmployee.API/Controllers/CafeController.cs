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
    private const long MaxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    
    
    public CafeController(IMediator mediator,
        IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpPost("/api/cafe")]
    public async Task<IActionResult> CreateCafe([FromForm] CreateOrUpdateCafeRequestModel req)
    {
        long fileLength = req.Logo?.Length ?? 0;
        if (fileLength > MaxFileSize) throw new Exception("File size should be at most 2MB");

        using var memoryStream = new MemoryStream();
        
        CreateCafeCommand command = _mapper.Map<CreateCafeCommand>(req);

        if (fileLength > 0)
        {
            await req.Logo.CopyToAsync(memoryStream);
            command.LogoFileData = memoryStream.ToArray();
            command.LogoFileName = req.Logo.FileName;
        }
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

    [HttpPut("/api/cafe/{id}")]
    public async Task<IActionResult> UpdateCafe([FromRoute] string id, [FromForm] CreateOrUpdateCafeRequestModel req)
    {
        long fileLength = req.Logo?.Length ?? 0;
        if (fileLength > MaxFileSize) throw new Exception("File size should be at most 2MB");

        using var memoryStream = new MemoryStream();
        
        UpdateCafeCommand command = _mapper.Map<UpdateCafeCommand>(req);
        command.Id = id;
        
        if (fileLength > 0)
        {
            await req.Logo.CopyToAsync(memoryStream);
            command.LogoFileData = memoryStream.ToArray();
            command.LogoFileName = req.Logo.FileName;
        }
        Cafe updatedCafe = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(updatedCafe));
    }

    [HttpDelete("/api/cafe/{id}")]
    public async Task<IActionResult> DeleteCafe([FromRoute] string id)
    {
        DeleteCafeCommand command = new DeleteCafeCommand { Id = id };
        bool success = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(success));
    }
}