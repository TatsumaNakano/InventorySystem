using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class OperationSystemRepository : IOperationSystemRepository
    {
        private readonly InventorySystemContext _context;
        public OperationSystemRepository(InventorySystemContext context)
        {
            _context = context;
        }

        public bool AddOs(string newOsName)
        {
            OperationSystem os = new OperationSystem() { Name = newOsName };
            _context.OperationSystems.Add(os);

            return Save();
        }

        public bool DeleteOs(int osId)
        {
            OperationSystem os = _context.OperationSystems.Where(os => os.Id == osId).FirstOrDefault();
            _context.OperationSystems.Remove(os);

            return Save();
        }

        public ICollection<OperationSystem> GetAllOs()
        {
            return _context.OperationSystems.OrderBy(os => os.Id).ToList();
        }

        public bool HasAnyDeviceOnThisOs(int osId)
        {
            return _context.Devices.Any(d => d.OsId == osId);
        }

        public bool NameAlreadyExists(string newOsName)
        {
            return _context.OperationSystems.Any(os => os.Name == newOsName);
        }

        public bool OsExists(int osId)
        {
            return _context.OperationSystems.Any(os => os.Id == osId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }


    }
}
