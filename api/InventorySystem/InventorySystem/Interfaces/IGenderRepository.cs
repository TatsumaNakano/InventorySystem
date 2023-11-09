using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IGenderRepository
    {
        public ICollection<Gender> GetAllGender();
    }
}
