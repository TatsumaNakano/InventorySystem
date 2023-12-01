using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IOperationSystemRepository
    {
        ICollection<OperationSystem> GetAllOs();

        public bool NameAlreadyExists(string newOsName);
        public bool AddOs(string newOsName);

        public bool DeleteOs(int osId);

        public bool OsExists(int osId);

        public bool HasAnyDeviceOnThisOs(int osId);

        public bool Save();


    }
}
