using AutoMapper;
using InventorySystem.Dto;
using InventorySystem.Interfaces;
using InventorySystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventorySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository; 
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200,Type = typeof(IEnumerable<User>))]
        public IActionResult GetAllUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetAllUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("available")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        [ProducesResponseType(400)]
        public IActionResult GetAvailableUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetAvailableUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(users);
        }

        [HttpGet("id/{id}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int id)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUser(id));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("userId/{userId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(string userId)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUser(userId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }


        [HttpGet("phone/{phoneNumber}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUserByPhoneNumber(string phoneNumber)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUserByPhoneNumber(phoneNumber));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("email/{email}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUserByEmail(string email)
        {
            var user = _mapper.Map<UserDto>(_userRepository.GetUserByEmail(email));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("position/{positionId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUsersByPosition(int positionId)
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.GetUsersByPosition(positionId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }


        [HttpGet("dept/{departmentId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUsersByDepartment(int departmentId)
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.GetUsersByDepartment(departmentId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }


        [HttpGet("admin")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetActiveUsers()
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.GetActiveUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }


        [HttpGet("nonadmin")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetDeactivatedUsers()
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.GetDeactivatedUsers());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }


        [HttpGet("registDate/{from}&{to}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUsersByRegisteredDates(DateTime? from = null, DateTime? to = null)
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.GetUsersByRegisteredDates(from, to));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpGet("search/{searchString}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult SearchUsers(string searchString)
        {
            var user = _mapper.Map<List<UserDto>>(_userRepository.SearchUsers(searchString));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] UserEditDto user)
        {

            if (user == null) return BadRequest(ModelState);

            if (_userRepository.UserExist(user.UserId))
            {
                ModelState.AddModelError("", "この社員番号を使ったユーザーはすでに存在します。");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var mappedUser = _mapper.Map<User>(user);

            if (!_userRepository.AddUser(mappedUser))
            {
                ModelState.AddModelError("","予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }

            return Ok("ユーザー作成完了");
        }

        [HttpPut("edit/{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser(string userId,[FromBody] UserEditDto updatedUser)
        {
            if (updatedUser == null) return BadRequest(ModelState);

            if (!_userRepository.UserExist(userId))
            {
                ModelState.AddModelError("", "ユーザ「"+ userId + "」は見つかりません。");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var mappedUser = _mapper.Map<User>(updatedUser);

            if (!_userRepository.UpdateUser(mappedUser))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }

            return Ok("ユーザー編集完了。");
        }

        [HttpPut("deactivate/{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeactivateUser(string userId, [FromBody] UserEditDto updatedUser)
        {
            if (updatedUser == null) return BadRequest(ModelState);

            if (!_userRepository.UserExist(userId))
            {
                ModelState.AddModelError("", "ユーザ「" + userId + "」は見つかりません。");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var mappedUser = _mapper.Map<User>(updatedUser);

            if (!_userRepository.DeactivateUser(mappedUser))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }

            return Ok("ユーザー削除完了。");
        }

        [HttpPut("activate/{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult ActivateUser(string userId, [FromBody] UserEditDto updatedUser)
        {
            if (updatedUser == null) return BadRequest(ModelState);

            if (!_userRepository.UserExist(userId))
            {
                ModelState.AddModelError("", "ユーザ「" + userId + "」は見つかりません。");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var mappedUser = _mapper.Map<User>(updatedUser);

            if (!_userRepository.ActivateUser(mappedUser))
            {
                ModelState.AddModelError("", "予期せぬエラーが起こりました。");
                return StatusCode(500, ModelState);
            }

            return Ok("ユーザー削除完了。");
        }

    }
}
