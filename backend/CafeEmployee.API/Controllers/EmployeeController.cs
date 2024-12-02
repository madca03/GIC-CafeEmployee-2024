using AutoMapper;
using CafeEmployee.API.Models.Employees;
using CafeEmployee.API.Models.Shared.ResponseModels;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Models.DatabaseModels;
using CafeEmployee.Core.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeEmployee.API.Controllers;

public class EmployeeController : BaseController
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public EmployeeController(IMediator mediator,
        IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    [HttpGet("/api/employees")]
    public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeeRequestModel req)
    {
        GetEmployeeQuery query = _mapper.Map<GetEmployeeQuery>(req);
        var employees = await _mediator.Send(query);
        return GenericSuccess(new BaseDataAPIResponseModel(employees));
    }

    [HttpGet("/api/employee")]
    public async Task<IActionResult> GetEmployee([FromQuery] GetEmployeeRequestModel req)
    {
        GetEmployeeDBQuery query = _mapper.Map<GetEmployeeDBQuery>(req);
        var employee = await _mediator.Send(query);
        return GenericSuccess(new BaseDataAPIResponseModel(employee));
    }

    [HttpPost("/api/employee")]
    public async Task<IActionResult> CreateEmployee([FromBody] CreateOrUpdateEmployeeRequestModel req)
    {
        CreateEmployeeCommand command = _mapper.Map<CreateEmployeeCommand>(req);
        Employee employee = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(employee));
    }

    [HttpPut("/api/employee/{id}")]
    public async Task<IActionResult> UpdateEmployee([FromRoute] string id, [FromBody] CreateOrUpdateEmployeeRequestModel req)
    {
        UpdateEmployeeCommand command = _mapper.Map<UpdateEmployeeCommand>(req);
        command.Id = id;
        Employee employee = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(employee));
    }

    [HttpDelete("/api/employee/{id}")]
    public async Task<IActionResult> DeleteEmployee([FromRoute] string id)
    {
        DeleteEmployeeCommand command = new DeleteEmployeeCommand { Id = id };
        var success = await _mediator.Send(command);
        return GenericSuccess(new BaseDataAPIResponseModel(success));
    }
}