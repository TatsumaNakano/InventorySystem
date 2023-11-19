using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class DeviceMakerRepository : IDeviceMakerRepository
    {
        private readonly InventorySystemContext _context;
        public DeviceMakerRepository(InventorySystemContext context)
        {
            _context = context;
        }
        public ICollection<DeviceMaker> GetAllDeviceMakers()
        {
            return _context.DeviceMakers.OrderBy(dm => dm.Id).ToList();
        }
    }
}
