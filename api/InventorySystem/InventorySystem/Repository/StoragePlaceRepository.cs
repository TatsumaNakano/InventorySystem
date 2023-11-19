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
        public ICollection<StoragePlace> GetAllStoragePlaces()
        {
            return _context.StoragePlaces.OrderBy(place => place.Id).ToList();
        }
    }
}
