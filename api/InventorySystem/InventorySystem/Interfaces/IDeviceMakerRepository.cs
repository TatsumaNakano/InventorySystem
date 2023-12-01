using InventorySystem.Models;
using System.Diagnostics.Contracts;

namespace InventorySystem.Interfaces
{
    public interface IDeviceMakerRepository
    {
        public ICollection<DeviceMaker> GetAllDeviceMakers();

        public bool NameAlreadyExists(string name);

        public bool AddMaker(string newMakerName);

        public bool DeleteMaker(int makerId);

        public bool MakerExists(int makerId);

        public bool HasAnyDeviceOnThisMaker(int makerId);

        public bool Save();
    }
}
