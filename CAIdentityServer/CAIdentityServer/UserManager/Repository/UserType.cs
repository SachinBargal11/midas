
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace UserManager.Repository
{

using System;
    using System.Collections.Generic;
    
public partial class UserType
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public UserType()
    {

        this.Users = new HashSet<User>();

    }


    public byte id { get; set; }

    public string Name { get; set; }

    public Nullable<bool> IsDeleted { get; set; }

    public int CreateByUserID { get; set; }

    public System.DateTime CreateDate { get; set; }

    public Nullable<int> UpdateByUserID { get; set; }

    public Nullable<System.DateTime> UpdateDate { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<User> Users { get; set; }

}

}
