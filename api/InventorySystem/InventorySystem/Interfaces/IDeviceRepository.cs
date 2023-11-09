using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IDeviceRepository
    {
        public ICollection<Device> GetAllDevices();
        public Device GetDevice(int id);
        public Device GetDevice(string deviceId);

        public ICollection<Device> GetAvailableDevices();

        public ICollection<Device> GetBrokenDevices();
        public ICollection<Device> GetNotBrokenDevices();

        public ICollection<Device> GetLeaseEndingDevices();

        public ICollection<Device> GetDevicesByPlace(int placeId);

        public ICollection<Device> GetDevicesBySpec(int osId, int memory, int capacity, int hasGpu, int makerId);

        public ICollection<Device> GetDevicesByType(int typeId);

        public bool DeviceExist(int id);
        public bool DeviceExist(string deviceid);
        public bool AddDevice(Device device);
        public bool DeleteDevice(Device device);

        public bool EditDevice(Device device);

        public bool Save();
    }
}
