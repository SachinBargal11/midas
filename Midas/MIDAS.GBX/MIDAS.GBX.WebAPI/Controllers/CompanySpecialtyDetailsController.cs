﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/CompanySpecialtyDetails")]
    
    public class CompanySpecialtyDetailsController : ApiController
    {

        private IRequestHandler<CompanySpecialtyDetails> requestHandler;
        public CompanySpecialtyDetailsController()
        {
            requestHandler = new GbApiRequestHandler<CompanySpecialtyDetails>();
        }

        [HttpPost]
        [Route("GetAll")]
        
        public HttpResponseMessage Get([FromBody]CompanySpecialtyDetails data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]CompanySpecialtyDetails data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("getBySpecialtyAndCompanyId/{specialtyId}/{companyId}")]
        public HttpResponseMessage GetBySpecialtyAndCompanyId(int specialtyId, int companyId)
        {
            return requestHandler.GetBySpecialtyAndCompanyId(Request, specialtyId, companyId);
        }

        // PUT: api/Organizations/5
        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Put([FromBody]CompanySpecialtyDetails User)
        {
            return requestHandler.UpdateGbObject(Request, User);
        }

        // DELETE: api/Organizations/id={organizationId}
        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage Delete([FromBody]CompanySpecialtyDetails User)
        {
            return requestHandler.DeleteGbObject(Request, User);
        }


        // Unique Name Validation
        [HttpGet]
        [Route("IsUnique")]
        public HttpResponseMessage IsUnique([FromBody]CompanySpecialtyDetails User)
        {
            return requestHandler.ValidateUniqueName(Request, User);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
