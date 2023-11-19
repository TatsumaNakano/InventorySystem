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

        public ICollection<OperationSystem> GetAllOs()
        {
            return _context.OperationSystems.OrderBy(os => os.Id).ToList();
        }
    }
}
