using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface IDeviceMakerRepository
    {
        public ICollection<DeviceMaker> GetAllDeviceMaker();
    }
}
