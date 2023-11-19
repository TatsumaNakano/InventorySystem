using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface ISexRepository
    {
        ICollection<Sex> GetAllSex();
    }
}
