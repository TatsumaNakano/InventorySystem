using InventorySystem.Interfaces;
using InventorySystem.Models;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Repository
{
    public class DeviceTypeRepository : IDeviceTypeRepository
    {
        private readonly InventorySystemContext _context;
        public DeviceTypeRepository(InventorySystemContext context)
        {
            _context = context;            
        }
        public ICollection<DeviceType> GetAllDeviceType()
        {
            return _context.DeviceTypes.OrderBy(dt => dt.Id).ToList();
        }

        public int GetNextVersion(int deviceTypeId)
        {
            return _context.DeviceTypes
                .First(dt => dt.Id == deviceTypeId).NextVersion;
        }

        public string GetDevicePrefix(int deviceTypeId)
        {
            return _context.DeviceTypes.
                First(dt => dt.Id == deviceTypeId).DevicePrefix;
        }

        public string GetNextDeviceId(int deviceTypeId)
        {
            return GetDevicePrefix(deviceTypeId)+GetNextVersion(deviceTypeId).ToString("0000");
        }


        public bool IncrementVersion(int deviceTypeId)
        {
            DeviceType deviceType = _context.DeviceTypes.SingleOrDefault(dt => dt.Id == deviceTypeId);
            deviceType.NextVersion++;
            _context.Update(deviceType);
            return Save();
        }


        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }


    }
}
