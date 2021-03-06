﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class InsuranceMaster : GbObject
    {
        [JsonProperty("companyCode")]
        public string CompanyCode { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? ContactInfoId { get; set; }

        [JsonProperty("addressInfo")]
        public AddressInfo AddressInfo { get; set; }

        [JsonProperty("contactInfo")]
        public ContactInfo ContactInfo { get; set; }

        [JsonProperty("adjusterMasters")]
        public AdjusterMaster AdjusterMasters { get; set; }

        [JsonProperty("ZeusID")]
        public string ZeusID { get; set; }

        [JsonProperty("priorityBilling")]
        public int? PriorityBilling { get; set; }

        [JsonProperty("Only1500Form")]
        public int? Only1500Form { get; set; }

        [JsonProperty("paperAuthorization")]
        public int? PaperAuthorization { get; set; }

        [JsonProperty("createdByCompanyId")]
        public int? CreatedByCompanyId { get; set; }

    }

    public class mInsuranceMaster : GbObject
    {
        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("addressInfoId")]
        public int? AddressInfoId { get; set; }

        [JsonProperty("contactInfoId")]
        public int? ContactInfoId { get; set; }

        [JsonProperty("mAddressInfo")]
        public mAddressInfo mAddressInfo { get; set; }

        [JsonProperty("mContactInfo")]
        public mContactInfo mContactInfo { get; set; }

        [JsonProperty("mAdjusterMasters")]
        public mAdjusterMaster mAdjusterMasters { get; set; }

        [JsonProperty("ZeusID")]
        public string ZeusID { get; set; }

        [JsonProperty("priorityBilling")]
        public int? PriorityBilling { get; set; }

        [JsonProperty("1500Form")]
        public int? Only1500Form { get; set; }

        [JsonProperty("paperAuthorization")]
        public int? PaperAuthorization { get; set; }

    }
}
