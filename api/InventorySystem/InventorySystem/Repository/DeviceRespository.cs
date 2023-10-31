using InventorySystem.Interfaces;
using InventorySystem.Models;

namespace InventorySystem.Repository
{
    public class DeviceRespository : IDeviceRepository
    {
        private readonly InventorySystemContext _context;
        public DeviceRespository(InventorySystemContext context)
        {
            _context = context;
        }

        public ICollection<Device> GetAllDevices()
        {
            return _context.Devices.OrderBy(d => d.Id).ToList();
        }

        public ICollection<Device> GetAvailableDevices()
        {
            return _context.Devices.Where(e => e.CurrentUserId == null).ToList();
        }

        public ICollection<Device> GetBrokenDevices()
        {
            return _context.Devices.Where(e => e.BrokenFlag == 1).ToList();
        }
        public ICollection<Device> GetNotBrokenDevices()
        {
            return _context.Devices.Where(e => e.BrokenFlag == 0).ToList();
        }

        public Device GetDevice(int id)
        {
            return _context.Devices.Where(e => e.Id == id).FirstOrDefault();
        }

        public Device GetDevice(string deviceId)
        {
            return _context.Devices.Where(e => e.DeviceId == deviceId).FirstOrDefault();
        }

        public ICollection<Device> GetDevicesBySpec(int osId = -1, int memory = -1, int capacity = -1, int hasGpu = -1, int makerId = -1)
        {
            bool evaluateSpec(Device e)
            {
                //もし‐１なら指定なしとしてTrueを返す
                return
                    osId != -1 ? e.OsId == osId : true &&
                    memory != -1 ? e.Memory >= memory : true &&
                    capacity != -1 ? e.Capacity >= capacity : true &&
                    hasGpu != -1 ? e.HasGpu == hasGpu : true &&
                    makerId != -1 ? e.MakerId == makerId : true;
            }

            return _context.Devices.Where(evaluateSpec).ToList();
        }

        public ICollection<Device> GetDevicesByPlace(int placeId)
        {
            return _context.Devices.Where(e => e.PlaceId == placeId).ToList();
        }

        public ICollection<Device> GetLeaseEndingDevices()
        {
            //リース期限１か月前のデバイス
            return _context.Devices.Where(e => e.LeaseEndDate.AddDays(-30) >= (DateTime.Today)).ToList();
        }

        public ICollection<Device> GetDevicesByType(int typeId)
        {
            return _context.Devices.Where(e => e.DeviceTypeId == typeId).ToList();
        }

    }
}
