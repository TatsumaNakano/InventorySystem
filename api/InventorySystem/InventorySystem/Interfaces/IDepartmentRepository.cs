using InventorySystem.Models;
using System.Collections;

namespace InventorySystem.Interfaces
{
    public interface IDepartmentRepository
    {
        public ICollection<Department> GetAllDepartments();

        public bool CreateDepartment();

        public bool DeleteDepartment();

    }
}
