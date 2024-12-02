using System.Globalization;
using System.Text;
using CafeEmployee.API.Constants;
using CafeEmployee.API.Models.Shared.ResponseModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CafeEmployee.API.Filters;

public class GlobalExceptionFilter : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> _logger;

    public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        var messageBuilder = new StringBuilder();
        var controllerName = context.RouteData.Values["controller"].ToString();
        var actionName = context.RouteData.Values["action"].ToString();
        var httpMethod = context.HttpContext.Request.Method;
        var httpPath = context.HttpContext.Request.Path.ToString();

        var exception = context.Exception;

        messageBuilder.AppendLine();
        messageBuilder.AppendLine(CultureInfo.InvariantCulture, $"Exception message: {context.Exception.Message}");
        messageBuilder.AppendLine(CultureInfo.InvariantCulture, $"Controller Name: {controllerName}");
        messageBuilder.AppendLine(CultureInfo.InvariantCulture, $"Action Name: {actionName}");
        messageBuilder.AppendLine(CultureInfo.InvariantCulture, $"HTTP Method: {httpMethod}");
        messageBuilder.AppendLine(CultureInfo.InvariantCulture, $"HTTP Path: {httpPath}");
        
        _logger.LogError(context.Exception, messageBuilder.ToString());

        var res = new BaseAPIResponseModel
        {
            StatusCode = APIStatusCode.UNKNOWN_ERROR,
            Message = exception.Message
        };
        context.Result = new ObjectResult(res)
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };

        context.ExceptionHandled = true;
    }
}