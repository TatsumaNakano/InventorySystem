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

        [HttpGet("test")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult Test()
        {
            return Ok("Succeed!");
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

        //--------------------------------------------------
        // DeviceType --------------------------------------
        //--------------------------------------------------

        [HttpPost("addDeviceType/{newDeviceTypeName}&{newDeviceTypePrefix}&{newDeviceTypeEmoji}&{isComputer}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult AddDeviceType(string newDeviceTypeName, string newDeviceTypePrefix, string newDeviceTypeEmoji, int isComputer)
        {
            bool nameAlreadyExists = _deviceTypeRepository.NameAlreadyExists(newDeviceTypeName);
            bool prefixAlreadyExists = _deviceTypeRepository.PrefixAlreadyExists(newDeviceTypeName);

            if (!ModelState.IsValid || nameAlreadyExists || prefixAlreadyExists) return BadRequest(ModelState);

            _deviceTypeRepository.AddDeviceType(newDeviceTypeName,newDeviceTypePrefix, newDeviceTypeEmoji, isComputer);

            return Ok();
        }

        [HttpDelete("deleteDeviceType/{deviceTypeId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteDeviceType(int deviceTypeId)
        {
            bool deviceTypeExist = _deviceTypeRepository.DeviceTypeExists(deviceTypeId);

            if (!ModelState.IsValid ) return BadRequest(ModelState);

            if(!deviceTypeExist) return NotFound();

            _deviceTypeRepository.DeleteDeviceType(deviceTypeId);

            return Ok();
        }

        [HttpGet("hasAnyDeviceOnThisDeviceType/{deviceTypeId}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400)]
        public IActionResult HasAnyDeviceOnThisDeviceType(int deviceTypeId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool anydevice = _deviceTypeRepository.HasAnyDeviceOnThisDeviceType(deviceTypeId);

            return Ok(anydevice);
        }

        //--------------------------------------------------
        // Maker -------------------------------------------
        //--------------------------------------------------

        [HttpPost("addMaker/{newMakerName}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult AddMaker(string newMakerName)
        {
            bool nameAlreadyExists = _deviceMakerRepository.NameAlreadyExists(newMakerName);

            if (!ModelState.IsValid || nameAlreadyExists) return BadRequest(ModelState);

            _deviceMakerRepository.AddMaker(newMakerName);

            return Ok();
        }

        [HttpDelete("deleteMaker/{makerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteMaker(int makerId)
        {
            bool deviceMakerExist = _deviceMakerRepository.MakerExists(makerId);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!deviceMakerExist) return NotFound();

            _deviceMakerRepository.DeleteMaker(makerId);

            return Ok();
        }

        [HttpGet("hasAnyDeviceOnThisMaker/{makerId}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400)]
        public IActionResult HasAnyDeviceOnThisMaker(int makerId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool hasAnyDevice = _deviceMakerRepository.HasAnyDeviceOnThisMaker(makerId);

            return Ok(hasAnyDevice);
        }

        //--------------------------------------------------
        // OS ----------------------------------------------
        //--------------------------------------------------

        [HttpPost("addOs/{newOsName}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult AddOs(string newOsName)
        {
            bool nameAlreadyExists = _operationSystemRepository.NameAlreadyExists(newOsName);

            if (!ModelState.IsValid || nameAlreadyExists) return BadRequest(ModelState);

            _operationSystemRepository.AddOs(newOsName);

            return Ok();
        }

        [HttpDelete("deleteOs/{osId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteOs(int osId)
        {
            bool osExist = _operationSystemRepository.OsExists(osId);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!osExist) return NotFound();

            _operationSystemRepository.DeleteOs(osId);

            return Ok();
        }

        [HttpGet("hasAnyDeviceOnThisOs/{osId}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400)]
        public IActionResult HasAnyDeviceOnThisOs(int osId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!_operationSystemRepository.OsExists(osId))
            {
                return Ok(false);
            }
            bool hasAnyDevice = _operationSystemRepository.HasAnyDeviceOnThisOs(osId);

            return Ok(hasAnyDevice);
        }


        //--------------------------------------------------
        // StoragePlace ------------------------------------
        //--------------------------------------------------

        [HttpPost("addStoragePlace/{newPlaceName}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult AddStoragePlace(string newPlaceName)
        {
            bool nameAlreadyExists = _storagePlaceRepository.NameAlreadyExists(newPlaceName);

            if (!ModelState.IsValid || nameAlreadyExists) return BadRequest(ModelState);

            _storagePlaceRepository.AddStoragePlace(newPlaceName);

            return Ok();
        }

        [HttpDelete("deleteStoragePlace/{placeId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteStoragePlace(int placeId)
        {
            bool osExist = _storagePlaceRepository.StoragePlaceExists(placeId);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!osExist) return NotFound();

            _storagePlaceRepository.DeleteStoragePlace(placeId);

            return Ok();
        }

        [HttpGet("hasAnyDeviceOnThisStoragePlace/{placeId}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(400)]
        public IActionResult HasAnyDeviceOnThisStoragePlace(int placeId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            bool hasAnyDevice = _storagePlaceRepository.HasAnyDeviceOnThisStoragePlace(placeId);

            return Ok(hasAnyDevice);
        }

    }
}
