using CafeEmployee.Core.Commands;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace CafeEmployee.Business.Validators;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<CreateCafeCommand>, CreateCafeValidator>();
        services.AddScoped<IValidator<UpdateCafeCommand>, UpdateCafeValidator>();
        services.AddScoped<IValidator<DeleteCafeCommand>, DeleteCafeValidator>();
        services.AddScoped<IValidator<CreateEmployeeCommand>, CreateEmployeeValidator>();
        services.AddScoped<IValidator<UpdateEmployeeCommand>, UpdateEmployeeValidator>();
        services.AddScoped<IValidator<DeleteEmployeeCommand>, DeleteEmployeeValidator>();
        return services;
    }
}