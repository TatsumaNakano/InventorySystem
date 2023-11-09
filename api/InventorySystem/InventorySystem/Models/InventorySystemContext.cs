using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace InventorySystem.Models;

public partial class InventorySystemContext : DbContext
{
    public InventorySystemContext()
    {
    }

    public InventorySystemContext(DbContextOptions<InventorySystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<DeviceMaker> DeviceMakers { get; set; }

    public virtual DbSet<DeviceType> DeviceTypes { get; set; }

    public virtual DbSet<Gender> Genders { get; set; }

    public virtual DbSet<Lending> Lendings { get; set; }

    public virtual DbSet<OperationSystem> OperationSystems { get; set; }

    public virtual DbSet<Position> Positions { get; set; }

    public virtual DbSet<Sex> Sexes { get; set; }

    public virtual DbSet<StoragePlace> StoragePlaces { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=Tatsuma\\SQLEXPRESS;Initial Catalog=InventorySystem;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Departme__3213E83FFCFB4022");

            entity.HasIndex(e => e.Id, "UQ__Departme__3213E83E68BB840F").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Devices__3213E83FED26F478");

            entity.HasIndex(e => new { e.Id, e.DeviceId }, "UQ__Devices__91A36DE65A1CAA47").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BrokenFlag).HasColumnName("broken_flag");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CurrentUserId).HasColumnName("current_user_id");
            entity.Property(e => e.DeleteFlag).HasColumnName("delete_flag");
            entity.Property(e => e.DeviceId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("device_id");
            entity.Property(e => e.DeviceTypeId).HasColumnName("device_type_id");
            entity.Property(e => e.HasGpu).HasColumnName("has_gpu");
            entity.Property(e => e.InventoryDate)
                .HasColumnType("date")
                .HasColumnName("inventory_date");
            entity.Property(e => e.LeaseEndDate)
                .HasColumnType("date")
                .HasColumnName("lease_end_date");
            entity.Property(e => e.LeaseStartDate)
                .HasColumnType("date")
                .HasColumnName("lease_start_date");
            entity.Property(e => e.MakerId).HasColumnName("maker_id");
            entity.Property(e => e.Memory).HasColumnName("memory");
            entity.Property(e => e.OldName)
                .HasMaxLength(10)
                .HasColumnName("old_name");
            entity.Property(e => e.OsId).HasColumnName("os_id");
            entity.Property(e => e.PlaceId).HasColumnName("place_id");
            entity.Property(e => e.RegistrationDate)
                .HasColumnType("datetime")
                .HasColumnName("registration_date");
            entity.Property(e => e.Remarks)
                .HasColumnType("ntext")
                .HasColumnName("remarks");
            entity.Property(e => e.UpdateDate)
                .HasColumnType("datetime")
                .HasColumnName("update_date");

            entity.HasOne(d => d.CurrentUser).WithMany(p => p.Devices)
                .HasForeignKey(d => d.CurrentUserId)
                .HasConstraintName("FK_User");

            entity.HasOne(d => d.DeviceType).WithMany(p => p.Devices)
                .HasForeignKey(d => d.DeviceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Device_Type");

            entity.HasOne(d => d.Maker).WithMany(p => p.Devices)
                .HasForeignKey(d => d.MakerId)
                .HasConstraintName("FK_Device_Maker");

            entity.HasOne(d => d.Os).WithMany(p => p.Devices)
                .HasForeignKey(d => d.OsId)
                .HasConstraintName("FK_Device_Os");

            entity.HasOne(d => d.Place).WithMany(p => p.Devices)
                .HasForeignKey(d => d.PlaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Device_StoragePlace");
        });

        modelBuilder.Entity<DeviceMaker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeviceMa__3213E83FB3651FAA");

            entity.HasIndex(e => e.Id, "UQ__DeviceMa__3213E83E9B3343A8").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<DeviceType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DeviceTy__3213E83F6E525154");

            entity.HasIndex(e => new { e.Id, e.DevicePrefix, e.NextVersion }, "UQ__DeviceTy__9BC79922166F51BE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DevicePrefix)
                .HasMaxLength(2)
                .IsUnicode(false)
                .HasColumnName("device_prefix");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
            entity.Property(e => e.NextVersion).HasColumnName("next_version");
        });

        modelBuilder.Entity<Gender>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Genders__3213E83F8D991A43");

            entity.HasIndex(e => e.Id, "UQ__Genders__3213E83E0BFFE9C2").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("ntext")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Lending>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Lendings__3213E83F8393A519");

            entity.HasIndex(e => e.Id, "UQ__Lendings__3213E83EB00ADD6D").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeleteFlag).HasColumnName("delete_flag");
            entity.Property(e => e.DeviceId).HasColumnName("device_id");
            entity.Property(e => e.Remarks).HasColumnName("remarks");
            entity.Property(e => e.RentalEnd)
                .HasColumnType("datetime")
                .HasColumnName("rental_end");
            entity.Property(e => e.RentalStart)
                .HasColumnType("datetime")
                .HasColumnName("rental_start");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Device).WithMany(p => p.Lendings)
                .HasForeignKey(d => d.DeviceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Device_Lending");

            entity.HasOne(d => d.User).WithMany(p => p.Lendings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_Lending");
        });

        modelBuilder.Entity<OperationSystem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Operatio__3213E83FC5A88121");

            entity.HasIndex(e => e.Id, "UQ__Operatio__3213E83E9CBCEC7A").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Position>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Position__3213E83F771EAA3B");

            entity.HasIndex(e => e.Id, "UQ__Position__3213E83E83517626").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Sex>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Sex__3213E83F7CDB9475");

            entity.ToTable("Sex");

            entity.HasIndex(e => e.Id, "UQ__Sex__3213E83EECE22DC7").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
        });

        modelBuilder.Entity<StoragePlace>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StorageP__3213E83F58AC7062");

            entity.HasIndex(e => e.Id, "UQ__StorageP__3213E83EB070DD41").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F7F25AF7D");

            entity.HasIndex(e => new { e.Id, e.UserId }, "UQ__Users__D9880B4E32FAB85F").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AgeDeprecated).HasColumnName("age_deprecated");
            entity.Property(e => e.Birthday)
                .HasColumnType("date")
                .HasColumnName("birthday");
            entity.Property(e => e.Deactivated).HasColumnName("deactivated");
            entity.Property(e => e.DepartmentId).HasColumnName("department_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .HasColumnName("first_name");
            entity.Property(e => e.GenderId).HasColumnName("gender_id");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.KanaFirstName)
                .HasMaxLength(20)
                .HasColumnName("kana_first_name");
            entity.Property(e => e.KanaLastName)
                .HasMaxLength(20)
                .HasColumnName("kana_last_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .HasColumnName("last_name");
            entity.Property(e => e.LeftDate)
                .HasColumnType("datetime")
                .HasColumnName("left_date");
            entity.Property(e => e.PositionId).HasColumnName("position_id");
            entity.Property(e => e.RegistrationDate)
                .HasColumnType("datetime")
                .HasColumnName("registration_date");
            entity.Property(e => e.Remarks)
                .HasColumnType("text")
                .HasColumnName("remarks");
            entity.Property(e => e.SexId).HasColumnName("sex_id");
            entity.Property(e => e.TelNumber)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("tel_number");
            entity.Property(e => e.UpdateDate)
                .HasColumnType("datetime")
                .HasColumnName("update_date");
            entity.Property(e => e.UserId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("user_id");

            entity.HasOne(d => d.Department).WithMany(p => p.Users)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Department");

            entity.HasOne(d => d.Gender).WithMany(p => p.Users)
                .HasForeignKey(d => d.GenderId)
                .HasConstraintName("FK_User_Gender");

            entity.HasOne(d => d.Position).WithMany(p => p.Users)
                .HasForeignKey(d => d.PositionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Position");

            entity.HasOne(d => d.Sex).WithMany(p => p.Users)
                .HasForeignKey(d => d.SexId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Sex");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
