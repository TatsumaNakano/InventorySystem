using InventorySystem.Models;

namespace InventorySystem.Interfaces
{
    public interface ILendingRepository
    {
        ICollection<Lending> GetCurrentLendings();
        ICollection<Lending> GetDueLendings();
        Lending GetLending(int id);

        bool LendingExist(int id);
        bool AddLending(Lending lending);
        bool UpdateLending(Lending lending);
        bool DeleteLending(Lending lending);
        bool DeleteLending(int lendingId);

        int GetLendingIdByTempId(string tempId);
        bool Save();

    }
}
