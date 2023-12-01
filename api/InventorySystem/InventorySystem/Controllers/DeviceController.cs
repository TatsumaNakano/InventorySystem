using AutoMapper;
using InventorySystem.Dto;
using InventorySystem.Interfaces;
using InventorySystem.Models;
using InventorySystem.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : Controller
    {

        private readonly IDeviceRepository _deviceRepository;
        private readonly IMapper _mapper;

        public DeviceController(
            IDeviceRepository deviceRepository,
            IMapper mapper)
        {
            _deviceRepository = deviceRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200,Type = typeof(IEnumerable<Device>))]
        public IActionResult GetAllDevices()
        {
            var d = _deviceRepository.GetAllDevices();
            //Console.Writeline(d);
            var devices = _mapper.Map<List<DeviceDto>>(d);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(devices);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Device))]
        [ProducesResponseType(400)]
        public IActionResult GetDevice(int id)
        {
            var device = _mapper.Map<DeviceDto>(_deviceRepository.GetDevice(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(device);
        }


        [HttpGet("deviceId/{deviceId}")]
        [ProducesResponseType(200, Type = typeof(Device))]
        [ProducesResponseType(400)]
        public IActionResult GetDevice(string deviceId)
        {
            var device = _mapper.Map<DeviceDto>(_deviceRepository.GetDevice(deviceId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(device);
        }

        [HttpGet("tempIdToDeviceId/{tempId}")]
        [ProducesResponseType(200, Type = typeof(Device))]
        [ProducesResponseType(400)]
        public IActionResult GetDeviceIdByTempId(string tempId)
        {
            var deviceId = _deviceRepository.GetDeviceIdByTempId(tempId);
            bool deviceExist = _deviceRepository.DeviceExist(deviceId);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if(!deviceExist) return NotFound();

            return Ok(deviceId);
        }



        [HttpGet("available")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetAvailableDevices()
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetAvailableDevices());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }

        [HttpGet("broken")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetBrokenDevices()
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetBrokenDevices());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }

        [HttpGet("notbroken")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetNotBrokenDevices()
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetNotBrokenDevices());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }

        [HttpGet("leaseEnding")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetLeaseEndingDevices()
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetLeaseEndingDevices());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }

        [HttpGet("place/{placeId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetDevicesByPlace(int placeId)
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetDevicesByPlace(placeId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }


        [HttpGet("spec/{osId}&{memory}&{capacity}&{hasGpu}&{makerId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetDevicesBySpec(int osId = -1, int memory = -1, int capacity = -1, int hasGpu = -1, int makerId = -1)
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetDevicesBySpec(osId,memory,capacity,hasGpu,makerId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }


        [HttpGet("type/{typeId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Device>))]
        [ProducesResponseType(400)]
        public IActionResult GetDevicesByType(int typeId)
        {
            var devices = _mapper.Map<List<DeviceDto>>(_deviceRepository.GetDevicesByType(typeId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(devices);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateDevice(DeviceEditDto device)
        {
            if (device == null) return BadRequest(ModelState);

            if (!ModelState.IsValid) return BadRequest(ModelState);

            Device deviceMapped = _mapper.Map<Device>(device);

            _deviceRepository.AddDevice(deviceMapped);

            return Ok("デバイス" + deviceMapped + "作成完了");

        }

        [HttpPut("deactivate")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeactivateDevice([FromBody] DeviceEditDto targetDevice)
        {
            var deviceExists = _deviceRepository.DeviceExist(targetDevice.DeviceId);
            if(!deviceExists || !ModelState.IsValid) return BadRequest(ModelState);

            Device deviceMapped = _mapper.Map<Device>(targetDevice);

            if (!_deviceRepository.DeactivateDevice(deviceMapped))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }
            return Ok("機器の無効化が完了しました。");
        }


        [HttpPut("activate")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult ActivateDevice([FromBody] DeviceEditDto targetDevice)
        {
            var deviceExists = _deviceRepository.DeviceExist(targetDevice.DeviceId);
            if (!deviceExists || !ModelState.IsValid) BadRequest(ModelState);

            Device deviceMapped = _mapper.Map<Device>(targetDevice);

            if (!_deviceRepository.ActivateDevice(deviceMapped))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }
            return Ok("機器の有効化が完了しました。");
        }


        [HttpPut("edit")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult EditDevice([FromBody] DeviceEditDto targetDevice)
        {
            var deviceExists = _deviceRepository.DeviceExist(targetDevice.DeviceId);
            if (!deviceExists || !ModelState.IsValid) BadRequest(ModelState);

            Device deviceMapped = _mapper.Map<Device>(targetDevice);

            if (!_deviceRepository.ActivateDevice(deviceMapped))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }
            return Ok("機器の有効化が完了しました。");
        }

    }
}
