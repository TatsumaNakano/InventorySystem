using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IOperatingSystemRepository
    {
        public ICollection<OperatingSystem> GetAllOs();
    }
}
