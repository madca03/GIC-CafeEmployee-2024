using CafeEmployee.API.Models.Shared.ResponseModels;
using Microsoft.AspNetCore.Mvc;

namespace CafeEmployee.API.Controllers;

public abstract class BaseController : Controller
{
    protected virtual IActionResult GenericSuccess(object payload = null)
    {
        if (payload == null) payload = new BaseAPIResponseModel();
        return new ObjectResult(payload) { Value = payload, StatusCode = StatusCodes.Status200OK };
    }

    protected virtual IActionResult GenericError(object payload,
        int statusCode = StatusCodes.Status500InternalServerError)
    {
        return new ObjectResult(payload) { StatusCode = statusCode };
    }
}