using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IDeviceTypeRepository
    {
        public ICollection<DeviceType> GetAllDeviceTypes();

        public string GetNextDeviceId(int deviceTypeId);

        public int GetNextVersion(int deviceTypeId);

        public string GetDevicePrefix(int deviceTypeId);

        public bool IncrementVersion(int deviceTypeId);

        public bool NameAlreadyExists(string name);

        public bool PrefixAlreadyExists(string prefix);

        public bool DeviceTypeExists(int deviceTypeId);

        public bool AddDeviceType(string name, string prefix, string emoji,int isComputer);

        public bool DeleteDeviceType(int deviceTypeId);

        public bool HasAnyDeviceOnThisDeviceType(int deviceTypeId);

        public bool Save();
    }
}
