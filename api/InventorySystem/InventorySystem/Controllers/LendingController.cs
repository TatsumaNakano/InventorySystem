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

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Lending))]
        [ProducesResponseType(400)]
        public IActionResult GetLending(int id)
        {
            var lending = _mapper.Map<LendingDto>(_lendingRepository.GetLending(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lending);
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
    }
}
