using CafeEmployee.Business.CommandHandlers;
using CafeEmployee.Business.Validators;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Configurations;
using CafeEmployee.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace CafeEmployee.Business.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        var businessAssembly = typeof(CafeCommandHandler).Assembly;
        var coreAssembly = typeof(CreateCafeCommand).Assembly;

        services.Configure<ConnectionsConfig>(configuration.GetSection(nameof(ConnectionsConfig)));

        services.AddDbContext<AppMasterDBContext>((servicesProvider, options) =>
        {
            var connections = servicesProvider.GetRequiredService<IOptions<ConnectionsConfig>>();
            options.UseSqlServer(connections.Value.MasterDbConnection);
        });

        services.AddDbContext<AppSlaveDBContext>((servicesProvider, options) =>
        {
            var connections = servicesProvider.GetRequiredService<IOptions<ConnectionsConfig>>();
            options.UseSqlServer(connections.Value.SlaveDbConnection);
        });
        
        services.AddValidators();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(businessAssembly, coreAssembly));
        return services;
    } 
}