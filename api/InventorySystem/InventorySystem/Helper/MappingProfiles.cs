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
            CreateMap<Lending, LendingEditDto>();
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

            //Reverses
            CreateMap<UserDto, User>();
            CreateMap<DepartmentDto, Department>();
            CreateMap<GenderDto, Gender>();
            CreateMap<PositionDto, Position>();
            CreateMap<SexDto, Sex>();
            CreateMap<UserLendingDto, Lending>();
            CreateMap<UserEditDto, User>();

            CreateMap<DeviceEditDto, Device>();
            CreateMap<Lending, LendingDto>();
            CreateMap<LendingDto, Lending>();
            CreateMap<LendingEditDto, Lending>();

        }
    }
}
