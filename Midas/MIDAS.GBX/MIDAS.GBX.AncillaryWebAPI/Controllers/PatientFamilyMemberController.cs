﻿using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AncillaryWebAPI.Controllers
{
    [RoutePrefix("midasancillaryapi/PatientFamilyMember")]
    public class PatientFamilyMemberController : ApiController
    {
        private IRequestHandler<PatientFamilyMember> requestHandler;

        public PatientFamilyMemberController()
        {
            requestHandler = new GbApiRequestHandler<PatientFamilyMember>();
        }

        [HttpGet]
        [Route("get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }

        [HttpPost]
        [Route("save")]
        public HttpResponseMessage Post([FromBody]PatientFamilyMember data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}