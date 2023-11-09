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
                .Where(e => e.DeleteFlag == 0)
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


        public bool AddLending(Lending lending)
        {
            _context.Add(lending);
            return Save();
        }

        public bool UpdateLending(Lending lending)
        {
            _context.Update(lending);
            return Save();
        }

        public bool DeleteLending(Lending lending)
        {
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
