using InventorySystem.Interfaces;
using InventorySystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace InventorySystem.Repository
{
    public class LendingRepository : ILendingRepository
    {
        private readonly InventorySystemContext _context;
        public LendingRepository(InventorySystemContext context)
        {
            _context = context;
        }

        public ICollection<Lending> GetCurrentLendings()
        {
            return _context.Lendings
                .Where(e => e.DeleteFlag == 0)
                .Include(l => l.User)
                .ThenInclude(u => u.Department)
                .Include(l => l.User)
                .ThenInclude(u => u.Position)
                .Include(l => l.User)
                .ThenInclude(u => u.Sex)
                .Include(l => l.Device)
                .ThenInclude(d => d.DeviceType)
                .Include(l => l.Device)
                .ThenInclude(d => d.Os)
                .OrderBy(x => x.RentalEnd)
                .ToList();
        }

        public ICollection<Lending> GetDueLendings()
        {
            return _context.Lendings
                .Include(l => l.User)
                .ThenInclude(u => u.Department)
                .Include(l => l.User)
                .ThenInclude(u => u.Position)
                .Include(l => l.User)
                .ThenInclude(u => u.Sex)
                .Include(l => l.Device)
                .ThenInclude(d => d.DeviceType)
                .Include(l => l.Device)
                .ThenInclude(d => d.Os)
                .Where(e => e.RentalEnd <= DateTime.Today)
                .OrderBy(x => x.RentalEnd)
                .ToList();
        }

        public Lending GetLending(int id)
        {
            return _context.Lendings
                .Include(l => l.User)
                .ThenInclude(u => u.Department)
                .Include(l => l.User)
                .ThenInclude(u => u.Position)
                .Include(l => l.User)
                .ThenInclude(u => u.Sex)
                .Include(l => l.Device)
                .ThenInclude(d => d.DeviceType)
                .Include(l => l.Device)
                .ThenInclude(d => d.Os)
                .Where(e => e.Id == id).FirstOrDefault();
        }

        public int GetLendingIdByTempId(string tempId)
        {
            return _context.Lendings.Where(e => e.TempId == tempId).FirstOrDefault().Id;
        }

        public bool AddLending(Lending lending)
        {
            _context.Add(lending);
            _context.Devices.Where(d => d.Id == lending.DeviceId).FirstOrDefault().CurrentUserId = lending.UserId;
            return Save();
        }

        public bool UpdateLending(Lending lending)
        {
            _context.Update(lending);
            return Save();
        }

        public bool DeleteLending(int id)
        {
            var lending = _context.Lendings.Where(l => l.Id == id).FirstOrDefault();
            DeleteLending(lending);
            return Save();
        }

        public bool DeleteLending(Lending lending)
        {
            _context.Devices.Where(d => d.Id == lending.DeviceId).FirstOrDefault().CurrentUserId = null;
            lending.DeleteFlag = 1;
            _context.Update(lending);
            return Save();
        }


        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool LendingExist(int id)
        {
            return _context.Lendings.Any(l => l.Id == id);
        }


    }
}
