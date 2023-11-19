using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IOperationSystemRepository
    {
        ICollection<OperationSystem> GetAllOs();
    }
}
