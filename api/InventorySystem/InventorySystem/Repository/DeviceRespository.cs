using InventorySystem.Interfaces;
using InventorySystem.Models;
using Microsoft.EntityFrameworkCore;

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
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .OrderBy(d => d.Id).ToList();
        }

        public ICollection<Device> GetAvailableDevices()
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.CurrentUserId == null && e.BrokenFlag == 0 && e.DeleteFlag == 0).ToList();
        }

        public ICollection<Device> GetBrokenDevices()
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.BrokenFlag == 1).ToList();
        }
        public ICollection<Device> GetNotBrokenDevices()
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.BrokenFlag == 0).ToList();
        }

        public Device GetDevice(int id)
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.Id == id).FirstOrDefault();
        }

        public Device GetDevice(string deviceId)
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.DeviceId == deviceId).FirstOrDefault();
        }

        public Device GetDeviceByTempId(string deviceId)
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.DeviceId == deviceId).FirstOrDefault();
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

            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(evaluateSpec).ToList();
        }

        public ICollection<Device> GetDevicesByPlace(int placeId)
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.PlaceId == placeId).ToList();
        }

        public ICollection<Device> GetLeaseEndingDevices()
        {
            //リース期限１か月前のデバイス
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.LeaseEndDate.AddDays(-30) >= (DateTime.Today)).ToList();
        }

        public ICollection<Device> GetDevicesByType(int typeId)
        {
            return _context.Devices
                .Include(d => d.CurrentUser)
                .Include(d => d.DeviceType)
                .Include(d => d.Maker)
                .Include(d => d.Os)
                .Include(d => d.Place)
                .Where(e => e.DeviceTypeId == typeId).ToList();
        }

        public string GetDeviceIdByTempId(string tempId)
        {
            return _context.Devices.Where(d => d.TempId == tempId).FirstOrDefault().DeviceId;
        }

        public bool DeviceExist(int id)
        {
            return _context.Devices.Any(d => d.Id == id);
        }
        public bool DeviceExist(string deviceid)
        {
            return _context.Devices.Any(d => d.DeviceId == deviceid);
        }

        public bool AddDevice(Device device)
        {
            //デバイスのIDを生成
            var deviceTypeRepository = new DeviceTypeRepository(_context);
            string devicePrefix = deviceTypeRepository.GetDevicePrefix(device.DeviceTypeId);
            int nextVersion = deviceTypeRepository.GetNextVersion(device.DeviceTypeId);
            device.DeviceId = devicePrefix + nextVersion.ToString("0000");

            _context.Add(device);
            deviceTypeRepository.IncrementVersion(device.DeviceTypeId);

            return Save();
        }

        public bool DeactivateDevice(Device targetDevice)
        {
            Device device = _context.Devices.Where(d => d.DeviceId == targetDevice.DeviceId).FirstOrDefault();
            device.DeleteFlag = targetDevice.DeleteFlag;
            device.BrokenFlag = targetDevice.BrokenFlag;
            device.Remarks = targetDevice.Remarks;
            _context.Update(device);

            return Save();
        }

        public bool ActivateDevice(Device targetDevice)
        {
            Device device = _context.Devices.Where(d => d.DeviceId == targetDevice.DeviceId).FirstOrDefault();
            device.BrokenFlag = 0;
            device.DeleteFlag = 0;
            device.Remarks = targetDevice.Remarks;
            _context.Update(device);

            return Save();
        }

        //public bool DeleteDevice(Device device)
        //{
        //    device.DeleteFlag = 1;
        //    _context.Update(device);
        //    return Save();
        //}

        public bool EditDevice(Device device)
        {
            _context.Update(device);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges(); 
            return saved > 0;
        }
    }
}
