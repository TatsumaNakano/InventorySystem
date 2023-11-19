using AutoMapper;
using InventorySystem.Interfaces;
using InventorySystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Controllers
{
    [Route("api/Misc")]
    [ApiController]
    public class MiscController:Controller
    {
        private readonly IGenderRepository _genderRepository;

        private readonly IDepartmentRepository _departmentRepository;
        private readonly IPositionRepository _positionRepository;
        private readonly ISexRepository _sexRepository;

        private readonly IStoragePlaceRepository _storagePlaceRepository;
        private readonly IOperationSystemRepository _operationSystemRepository;
        private readonly IDeviceMakerRepository _deviceMakerRepository;
        private readonly IDeviceTypeRepository _deviceTypeRepository;
        
        private readonly IMapper _mapper;
        public MiscController(
            IGenderRepository genderRepository, 
            IDepartmentRepository departmentRepository,
            IPositionRepository positionRepository,
            ISexRepository sexRepository,
            IStoragePlaceRepository storagePlaceRepository,
            IOperationSystemRepository operationSystemRepository,
            IDeviceMakerRepository deviceMakerRepository,
            IDeviceTypeRepository deviceTypeRepository,
            IMapper mapper)
        {
            _genderRepository = genderRepository;
            _departmentRepository = departmentRepository;
            _positionRepository = positionRepository;
            _sexRepository = sexRepository;
            _storagePlaceRepository = storagePlaceRepository;
            _operationSystemRepository = operationSystemRepository;
            _deviceMakerRepository = deviceMakerRepository;
            _deviceTypeRepository = deviceTypeRepository;
            _mapper = mapper;
        }

        [HttpGet("gender")]
        [ProducesResponseType(200, Type = typeof(Gender))]
        [ProducesResponseType(400)]
        public IActionResult GetAllGenders() {

            if(!ModelState.IsValid) return BadRequest(ModelState);
            var allGenders = _genderRepository.GetAllGender();
            var allGendersMapped = _mapper.Map<List<GenderDto>>(allGenders);
            return Ok(allGendersMapped);
        }

        [HttpGet("sex")]
        [ProducesResponseType(200, Type = typeof(Sex))]
        [ProducesResponseType(400)]
        public IActionResult GetAllSexes()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allSexes= _sexRepository.GetAllSex();
            var allSexesMapped= _mapper.Map<List<SexDto>>(allSexes);
            return Ok(allSexesMapped);
        }


        [HttpGet("position")]
        [ProducesResponseType(200, Type = typeof(Position))]
        [ProducesResponseType(400)]
        public IActionResult GetAllPositions()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allPosition = _positionRepository.GetAllPositions();
            var allPositionMapped = _mapper.Map<List<PositionDto>>(allPosition);
            return Ok(allPositionMapped);
        }


        [HttpGet("department")]
        [ProducesResponseType(200, Type = typeof(Department))]
        [ProducesResponseType(400)]
        public IActionResult GetAllDepartments()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allDepts = _departmentRepository.GetAllDepartments();
            var allDeptsMapped = _mapper.Map<List<DepartmentDto>>(allDepts);
            return Ok(allDeptsMapped);
        }

        [HttpGet("deviceMaker")]
        [ProducesResponseType(200, Type = typeof(DeviceMaker))]
        [ProducesResponseType(400)]
        public IActionResult GetAllDeviceMakers()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allDeviceMakers = _deviceMakerRepository.GetAllDeviceMakers();
            var allDeviceMakersMapped = _mapper.Map<List<DeviceMakerDto>>(allDeviceMakers);
            return Ok(allDeviceMakersMapped);
        }

        [HttpGet("deviceType")]
        [ProducesResponseType(200, Type = typeof(DeviceType))]
        [ProducesResponseType(400)]
        public IActionResult GetAllDeviceTypes()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allDeviceTypes = _deviceTypeRepository.GetAllDeviceTypes();
            var allDeviceTypesMapped = _mapper.Map<List<DeviceTypeDto>>(allDeviceTypes);
            return Ok(allDeviceTypesMapped);
        }


        [HttpGet("os")]
        [ProducesResponseType(200, Type = typeof(DeviceType))]
        [ProducesResponseType(400)]
        public IActionResult GetAllOs()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allOs = _operationSystemRepository.GetAllOs();
            var allOsMapped = _mapper.Map<List<OperationSystemDto>>(allOs);
            return Ok(allOsMapped);
        }


        [HttpGet("storagePlace")]
        [ProducesResponseType(200, Type = typeof(DeviceType))]
        [ProducesResponseType(400)]
        public IActionResult GetAllStoragePlace()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var allStoragePlaces = _storagePlaceRepository.GetAllStoragePlaces();
            var allStoragePlacesMapped = _mapper.Map<List<StoragePlaceDto>>(allStoragePlaces);
            return Ok(allStoragePlacesMapped);
        }
    }
}
