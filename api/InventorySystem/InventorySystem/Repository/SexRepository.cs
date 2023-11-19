using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class SexRepository : ISexRepository
    {
        private readonly InventorySystemContext _context;
        public SexRepository(InventorySystemContext context) {
            _context = context;
        }
        public ICollection<Sex> GetAllSex()
        {
            return _context.Sexes.ToList();
        }
    }
}
