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

        public ICollection<DeviceType> GetAllDeviceTypes()
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

        public bool NameAlreadyExists(string name)
        {
            return _context.DeviceTypes.Any(dt => dt.Name == name);
        }

        public bool PrefixAlreadyExists(string prefix)
        {
            return _context.DeviceTypes.Any(dt => dt.DevicePrefix == prefix);
        }


        public bool DeviceTypeExists(int deviceTypeId)
        {
            return _context.DeviceTypes.Any(dt => dt.Id == deviceTypeId);
        }

        public bool AddDeviceType(string name, string prefix, string emoji,int isComputer)
        {
            DeviceType deviceType = new DeviceType() { Name = name, DevicePrefix = prefix, Emoji=emoji, IsComputer=isComputer, NextVersion=1};
            _context.DeviceTypes.Add(deviceType);

            return Save();
        }

        public bool DeleteDeviceType(int deviceTypeId)
        {
            DeviceType deviceType = _context.DeviceTypes.Where(dt => dt.Id == deviceTypeId).FirstOrDefault();
            _context.DeviceTypes.Remove(deviceType);

            return Save();
        }

        public bool HasAnyDeviceOnThisDeviceType(int deviceTypeId)
        {
            return _context.Devices.Any(d => d.DeviceTypeId == deviceTypeId);
        }


        public bool IncrementVersion(int deviceTypeId)
        {
            DeviceType deviceType = _context.DeviceTypes.SingleOrDefault(dt => dt.Id == deviceTypeId);
            deviceType.NextVersion++;
            Console.WriteLine(deviceType);
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
