//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CANotificationService.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class ApplicationGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ApplicationGroup()
        {
            this.EventGroups = new HashSet<EventGroup>();
        }
    
        public int ID { get; set; }
        public string Name { get; set; }
        public int ApplicationID { get; set; }
    
        public virtual Application Application { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EventGroup> EventGroups { get; set; }
    }
}
