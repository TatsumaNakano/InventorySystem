using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IDeviceTypeRepository
    {
        public ICollection<DeviceType> GetAllDeviceType();

        public string GetNextDeviceId(int deviceTypeId);

        public int GetNextVersion(int deviceTypeId);

        public string GetDevicePrefix(int deviceTypeId);

        public bool IncrementVersion(int deviceTypeId);

        public bool Save();
    }
}
