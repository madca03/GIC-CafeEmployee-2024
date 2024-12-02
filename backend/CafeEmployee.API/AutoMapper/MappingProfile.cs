using AutoMapper;
using CafeEmployee.API.Models.Cafe.RequestModels;
using CafeEmployee.API.Models.Employees;
using CafeEmployee.Core.Commands;
using CafeEmployee.Core.Queries;

namespace CafeEmployee.API.AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateOrUpdateCafeRequestModel, CreateCafeCommand>().ReverseMap();
        CreateMap<GetCafeRequestModel, GetCafeQuery>().ReverseMap();
        CreateMap<CreateOrUpdateCafeRequestModel, UpdateCafeCommand>().ReverseMap();
        CreateMap<GetEmployeeRequestModel, GetEmployeeQuery>()
            .ForMember(dest => dest.CafeId, opt => opt.MapFrom(src => src.Cafe))
            .ReverseMap();
        CreateMap<CreateOrUpdateEmployeeRequestModel, CreateEmployeeCommand>().ReverseMap();
        CreateMap<CreateOrUpdateEmployeeRequestModel, UpdateEmployeeCommand>().ReverseMap();
        CreateMap<GetEmployeeRequestModel, GetEmployeeDBQuery>().ReverseMap();
    }
}