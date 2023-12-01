using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class StoragePlaceRepository : IStoragePlaceRepository
    {
        private readonly InventorySystemContext _context;
        public StoragePlaceRepository(InventorySystemContext context)
        {
            _context = context;
        }

        public bool AddStoragePlace(string newName)
        {
            StoragePlace place = new StoragePlace() { Name = newName };
            _context.StoragePlaces.Add(place);

            return Save();
        }

        public bool DeleteStoragePlace(int placeId)
        {
            StoragePlace place = _context.StoragePlaces.Where(p => p.Id == placeId).FirstOrDefault();
            _context.StoragePlaces.Remove(place);

            return Save();
        }

        public ICollection<StoragePlace> GetAllStoragePlaces()
        {
            return _context.StoragePlaces.OrderBy(place => place.Id).ToList();
        }

        public bool HasAnyDeviceOnThisStoragePlace(int placeId)
        {
            return _context.Devices.Any(d => d.PlaceId == placeId);
        }

        public bool NameAlreadyExists(string newName)
        {
            return _context.StoragePlaces.Any(p => p.Name == newName);
        }

        public bool StoragePlaceExists(int placeId)
        {
            return _context.StoragePlaces.Any(p => p.Id == placeId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }


    }
}
