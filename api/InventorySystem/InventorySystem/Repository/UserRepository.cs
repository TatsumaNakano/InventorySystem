using InventorySystem.Interfaces;
using InventorySystem.Models;
using InventorySystem.Utility;
using System.Text.RegularExpressions;

namespace InventorySystem.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly InventorySystemContext _context;
        public UserRepository(InventorySystemContext context)
        {
            _context = context;
        }

        public ICollection<User> GetAllUsers()
        {
            return _context.Users.OrderBy(x => x.Id).ToList();
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(e => e.Id == id).FirstOrDefault();
        }

        public User GetUser(string userId)
        {
            return _context.Users.Where(e => e.UserId == userId).FirstOrDefault();
        }

        public User GetUserByPhoneNumber(string tel)
        {
            var telNumber = Regex.Replace(tel, "[^0-9]", "");//数字以外を消す
            return _context.Users.Where(e => e.TelNumber == telNumber).FirstOrDefault();
        }

        public User GetUserByEmail(string email)
        {
            //クライアント側でフォーマットの確認をする
            return _context.Users.Where(e => e.Email.ToLower() == email.ToLower()).FirstOrDefault();
        }

        public ICollection<User> GetUsersByPosition(int positionId)
        {
            return _context.Users.Where(e => e.PositionId == positionId).ToList();
        }

        public ICollection<User> GetUsersByDepartment(int departmentId)
        {
            return _context.Users.Where(e => e.DepartmentId == departmentId).ToList();
        }

        public ICollection<User> GetAdminUsers()
        {
            return _context.Users.Where(e => e.IsAdmin == 1).ToList();
        }

        public ICollection<User> GetNonAdminUsers()
        {
            return _context.Users.Where(e => e.IsAdmin == 0).ToList();
        }

        public ICollection<User> GetActiveUsers()
        {
            return _context.Users.Where(e => e.Deactivated == 0).ToList();
        }

        public ICollection<User> GetDeactivatedUsers()
        {
            return _context.Users.Where(e => e.Deactivated == 1).ToList();
        }

        public ICollection<User> GetUsersByRegisteredDates(DateTime? from = null, DateTime? to = null)
        {
            //FromもToも指定があればその間を返す
            //Fromに指定がなくToに指定ありの場合はToよりも前をすべて返す
            //Fromの指定ありでToに指定なしの場合はFromより後をすべて返す
            bool InRange(User e)
            {
                return
                    from != null ? e.RegistrationDate >= from : true &&
                    to != null ? e.RegistrationDate <= to : true;

            }
            return _context.Users.Where(InRange).ToList();
        }

        public ICollection<User> SearchUsers(string searchString)
        {
            bool Search(User e) {
                return
                e.FirstName.Contains(searchString) ||
                e.LastName.Contains(searchString) ||
                e.KanaFirstName.Contains(searchString) ||
                e.KanaLastName.Contains(searchString) ||
                e.Email.Contains(searchString) ||
                e.TelNumber.Contains(searchString) ||
                e.UserId.Contains(searchString) ||
                Tool.KatakanaToAlphabet(e.KanaFirstName).Contains(searchString) ||
                Tool.KatakanaToAlphabet(e.KanaLastName).Contains(searchString);

            }

            return _context.Users.Where(Search).ToList();
        }
    }
}
