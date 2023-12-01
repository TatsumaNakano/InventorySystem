using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IStoragePlaceRepository
    {
        public ICollection<StoragePlace> GetAllStoragePlaces();

        public bool NameAlreadyExists(string newName);
        public bool AddStoragePlace(string newName);
        public bool DeleteStoragePlace(int placeId);
        public bool StoragePlaceExists(int placeId);
        public bool HasAnyDeviceOnThisStoragePlace(int placeId);
        public bool Save();
    }
}
