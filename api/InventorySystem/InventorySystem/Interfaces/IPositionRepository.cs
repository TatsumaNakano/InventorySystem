using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IPositionRepository
    {
        public ICollection<Position> GetAllPositions();
    }
}
