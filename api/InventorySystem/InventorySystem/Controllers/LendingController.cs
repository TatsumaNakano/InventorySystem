using AutoMapper;
using InventorySystem.Dto;
using InventorySystem.Interfaces;
using InventorySystem.Models;
using InventorySystem.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LendingController : Controller
    {
        private readonly ILendingRepository _lendingRepository;
        private readonly IMapper _mapper;

        public LendingController(ILendingRepository lendingRepository,IMapper mapper)
        {
            _lendingRepository = lendingRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Lending>))]
        public IActionResult GetCurrentLendings()
        {
            var lendings = _mapper.Map<List<LendingDto>>(_lendingRepository.GetCurrentLendings());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lendings);
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(Lending))]
        [ProducesResponseType(400)]
        public IActionResult GetLending(int id)
        {
            var lending = _mapper.Map<LendingDto>(_lendingRepository.GetLending(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lending);
        }

        [HttpGet("tempIdToLendingId/{tempId}")]
        [ProducesResponseType(200, Type = typeof(Lending))]
        [ProducesResponseType(400)]
        public IActionResult GetLendingIdByTempId(string tempId)
        {
            int id = _lendingRepository.GetLendingIdByTempId(tempId);
            bool lendingExist = _lendingRepository.LendingExist(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!lendingExist)
                return NotFound();

            return Ok(id);
        }


        [HttpGet("due")]
        [ProducesResponseType(200, Type = typeof(Lending))]
        [ProducesResponseType(400)]
        public IActionResult GetDueLendings()
        {
            var lendings = _mapper.Map<List<LendingDto>>(_lendingRepository.GetDueLendings());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lendings);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateLending(LendingEditDto lending)
        {
            if(lending == null || !ModelState.IsValid) 
                return BadRequest(ModelState);

            var lendingMapped = _mapper.Map<Lending>(lending);
            _lendingRepository.AddLending(lendingMapped);

            return Ok("デバイスの貸し出し手続き完了");
        }

        [HttpPut("edit")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult EditLending([FromBody]LendingEditDto lending)
        {
            if (!_lendingRepository.LendingExist(lending.Id) || !ModelState.IsValid)
                return BadRequest(ModelState);

            var lendingMapped = _mapper.Map<Lending>(lending);
            lendingMapped.TempId = null;
            _lendingRepository.UpdateLending(lendingMapped);
            return Ok("デバイスの返却手続き完了");
        }


        [HttpPut("delete/{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult ReturnDeviceLending(int id)
        {
            if (!_lendingRepository.LendingExist(id) || !ModelState.IsValid) 
                return BadRequest(ModelState);
            _lendingRepository.DeleteLending(id);
            return Ok("デバイスの返却手続き完了");
        }

    }
}
