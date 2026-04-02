using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ToDo.Models
{
    public partial class ToDoDbContext : DbContext
    {
        public ToDoDbContext()
        {
        }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activity { get; set; } = null!;
        public virtual DbSet<User> User { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=1234;database=todo", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.6.3-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_thai_520_w2")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.ToTable("activity");

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.Id).HasColumnType("int(10) unsigned");

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.Property(e => e.UserId).HasColumnType("int(10) unsigned");

                entity.Property(e => e.When).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Activity)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnType("int(10) unsigned");

                entity.Property(e => e.HashPassword)
                    .HasMaxLength(44)
                    .IsFixedLength()
                    .UseCollation("utf8mb4_thai_520_w2")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.Salt)
                    .HasMaxLength(24)
                    .IsFixedLength()
                    .UseCollation("utf8mb4_thai_520_w2")
                    .HasCharSet("utf8mb4");

                entity.Property(e => e.UserName)
                    .HasMaxLength(16)
                    .UseCollation("utf8mb4_thai_520_w2")
                    .HasCharSet("utf8mb4");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
