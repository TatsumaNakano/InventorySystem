using InventorySystem.Models;
using Microsoft.AspNetCore.Routing.Constraints;

namespace InventorySystem
{
    public class Seed
    {
        private readonly InventorySystemContext dataContext;
        public Seed(InventorySystemContext context)
        {
            this.dataContext = context;
        }

        //public void SeedDataContext()
        //{
        //    if (!this.dataContext.Lendings.Any())
        //    {
        //        var deviceGuid = Guid.NewGuid();
        //        var lendings = new List<Lending>()
        //        {
        //            new Lending()
        //            {
        //                User = new User()
        //                {
        //                    UserId = "X0000",
        //                    LastName = "中野",
        //                    FirstName = "竜磨",
        //                    KanaLastName = "ナカノ",
        //                    KanaFirstName = "タツマ",
        //                    Birthday = new DateTime(1994, 3, 26),
        //                    Gender = new Gender()
        //                    {
        //                        Name= "男"
        //                    },
        //                    TelNumber = "07091260510",
        //                    Email = "nakanotatsuma@gmail.com",
        //                    Position = new Position()
        //                    {
        //                        Name = "一般社員"
        //                    },
        //                    Department = new Department()
        //                    {
        //                        Name = "開発１課"
        //                    },
        //                    Deactivated = 0,
        //                    RegistrationDate = DateTime.Now,
        //                    UpdateDate = DateTime.Now,
        //                },
        //                Device = new Device()
        //                {
        //                    DeviceGuid = deviceGuid.ToString(),
        //                    Name = "X001",
        //                    DeviceType = new DeviceType()
        //                    {
        //                        Name = "コンピュータ"
        //                    },
        //                    BrokenFlag = 0,
        //                    DeleteFlag = 0,
        //                    RegistrationDate = DateTime.Now,
        //                    UpdateDate = DateTime.Now,
        //                    Os = new OperationSystem
        //                    {
        //                        Name = "Windows"
        //                    },
        //                    Place = new StoragePlace(){
        //                        Name = "classroom1"
        //                    },
        //                    Maker = new DeviceMaker()
        //                    {
        //                        Name = "Dell"
        //                    },
        //                    Memory = 64,
        //                    Capacity = 256,
        //                    HasGpu = 1

        //                },
        //                RentalStart = DateTime.Now,
        //                RentalEnd = new DateTime(2023, 11, 15),
        //                DeleteFlag = 0
        //            }
        //        };

        //        this.dataContext.
        //            Lendings.
        //            AddRange(lendings);
        //        this.dataContext.SaveChanges();
        //    }


        //}

        //public void SeedMoreData()
        //{

        //    var deviceGuid = Guid.NewGuid();
        //    var users = new List<User>()
        //    {
        //        new User()
        //        {
        //            LastName = "",
        //            FirstName = "",
        //            KanaLastName = "",
        //            KanaFirstName = "",
        //            DepartmentId = 1,


        //        }
        //    };

        //    this.dataContext.
        //        Users.
        //        AddRange(users);
        //    this.dataContext.SaveChanges();

        //}
    }
}
