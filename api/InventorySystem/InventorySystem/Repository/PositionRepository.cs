using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class PositionRepository:IPositionRepository
    {
        private readonly InventorySystemContext _context;
        public PositionRepository(InventorySystemContext context) {
            _context = context;
        }

        public ICollection<Position> GetAllPositions()
        {
            return _context.Positions.ToList();
        }
    }
}
