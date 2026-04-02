using System;
using System.Collections.Generic;

namespace ToDo.Models
{
    public partial class User
    {
        public User()
        {
            Activity = new HashSet<Activity>();
        }

        public uint Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Salt { get; set; } = null!;
        public string HashPassword { get; set; } = null!;

        public virtual ICollection<Activity> Activity { get; set; }
    }
}
