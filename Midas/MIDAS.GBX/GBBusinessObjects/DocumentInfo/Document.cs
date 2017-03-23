﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Document : GbObject
    {
        [JsonProperty("documentId")]
        public int DocumentId { get; set; }

        [JsonProperty("id")]
        public int id { get; set; }      

        [JsonProperty("documentPath")]
        public string DocumentPath { get; set; }

        public virtual List<BusinessValidation> Validate(int id, string type, List<HttpContent> streamContent)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            //Check for allowed file extensions [per file]
            if (!streamContent.ToList().TrueForAll(x => Enum.IsDefined(typeof(GBEnums.FileTypes), x.Headers.ContentDisposition.FileName.Split('.')[1].Replace("\"", string.Empty))))
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Invalid File extension" });
            //Check for allowed file size <= 1MB [per file]
            if (!streamContent.ToList().TrueForAll(x => (Convert.ToDecimal(x.Headers.ContentLength / (1024.0m * 1024.0m)) > 0 && Convert.ToDecimal(x.Headers.ContentLength / (1024.0m * 1024.0m)) <= 1)))
                validations.Add(new BusinessValidation { ValidationResult = BusinessValidationResult.Failure, ValidationMessage = "Filesize exceeded the limit 1MB" });

            return validations;
        }
    }        
}
