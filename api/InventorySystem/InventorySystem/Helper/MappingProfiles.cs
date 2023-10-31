using AutoMapper;
using InventorySystem.Dto;
using InventorySystem.Models;

namespace InventorySystem.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Lending, LendingDto>();
            CreateMap<Device, DeviceDto>();
            CreateMap<User, UserDto>();
        }
    }
}
