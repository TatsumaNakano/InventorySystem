using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetAllUsers();

        User GetUser(int id);
        User GetUser(string userId);
        User GetUserByPhoneNumber(string tel);
        User GetUserByEmail(string email);

        ICollection<User> GetUsersByPosition(int positionId);
        ICollection<User> GetUsersByDepartment(int departmentId);
        ICollection<User> GetAdminUsers();
        ICollection<User> GetNonAdminUsers();
        ICollection<User> GetActiveUsers();
        ICollection<User> GetDeactivatedUsers();
        ICollection<User> GetUsersByRegisteredDates(DateTime? from, DateTime? to);
        ICollection<User> SearchUsers(string searchString);

        public bool UserExist(int id);
        public bool UserExist(string userId);
        public bool AddUser(User user);
        public bool DeleteUser(User user);
        public bool EditUser(User user);

        public bool Save();
    }
}
