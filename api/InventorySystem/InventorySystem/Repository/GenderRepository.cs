using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class GenderRepository : IGenderRepository
    {
        private readonly InventorySystemContext _context;
        public GenderRepository(InventorySystemContext context)
        {
            _context = context;
        }
        public ICollection<Gender> GetAllGender()
        {
            return _context.Genders.OrderBy(g => g.Id).ToList();
        }
    }
}
