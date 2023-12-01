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

        public bool AddMaker(string newMakerName)
        {
            DeviceMaker deviceMaker= new DeviceMaker() { Name = newMakerName };
            _context.DeviceMakers.Add(deviceMaker);

            return Save();
        }

        public bool DeleteMaker(int makerId)
        {
            DeviceMaker deviceMaker= _context.DeviceMakers.Where(m => m.Id == makerId).FirstOrDefault();
            _context.DeviceMakers.Remove(deviceMaker);

            return Save();
        }

        public ICollection<DeviceMaker> GetAllDeviceMakers()
        {
            return _context.DeviceMakers.OrderBy(dm => dm.Id).ToList();
        }

        public bool HasAnyDeviceOnThisMaker(int makerId)
        {
            return _context.Devices.Any(d => d.MakerId == makerId);
        }

        public bool MakerExists(int makerId)
        {
            return _context.DeviceMakers.Any(m => m.Id == makerId);
        }

        public bool NameAlreadyExists(string name)
        {
            return _context.DeviceMakers.Any(dt => dt.Name == name);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

    }
}
