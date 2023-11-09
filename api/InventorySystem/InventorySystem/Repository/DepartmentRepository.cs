using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly InventorySystemContext _context;
        public DepartmentRepository(InventorySystemContext context)
        {
            _context = context;
        }

        public ICollection<Department> GetAllDepartments()
        {
            return _context.Departments.OrderBy(d => d.Id).ToList();
        }

        public bool CreateDepartment()
        {
            throw new NotImplementedException();
        }

        public bool DeleteDepartment()
        {
            throw new NotImplementedException();
        }

    }
}
