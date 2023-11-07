using AutoMapper;
using InventorySystem.Dto;
using InventorySystem.Models;

namespace InventorySystem.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //Main
            CreateMap<Lending, LendingDto>();
            CreateMap<Device, DeviceDto>();
            CreateMap<User, UserDto>();

            //For Lending
            CreateMap<Device, LendingDeviceDto>();
            CreateMap<User, LendingUserDto>();

            //For Device
            CreateMap<Lending, DeviceLendingDto>();
            CreateMap<User, DeviceUserDto>();
            CreateMap<DeviceMaker, DeviceMakerDto>();
            CreateMap<DeviceType, DeviceTypeDto>();
            CreateMap<OperationSystem, OperationSystemDto>();
            CreateMap<StoragePlace, StoragePlaceDto>();

            //For User
            CreateMap<Department, DepartmentDto>();
            CreateMap<Gender, GenderDto>();
            CreateMap<Position, PositionDto>();
            CreateMap<Sex,SexDto>();
            CreateMap<Lending, UserLendingDto>();

        }
    }
}
