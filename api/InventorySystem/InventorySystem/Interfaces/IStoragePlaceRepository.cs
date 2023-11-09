using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IStoragePlaceRepository
    {
        public ICollection<StoragePlace> GetAllStoragePlaces();
    }
}
