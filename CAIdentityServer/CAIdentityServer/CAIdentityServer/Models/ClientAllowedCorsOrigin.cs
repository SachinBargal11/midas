
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace CAIdentityServer.Models
{

using System;
    using System.Collections.Generic;
    
public partial class ClientAllowedCorsOrigin
{

    public int Id { get; set; }

    public int ClientID { get; set; }

    public string URL { get; set; }



    public virtual Client Client { get; set; }

}

}
