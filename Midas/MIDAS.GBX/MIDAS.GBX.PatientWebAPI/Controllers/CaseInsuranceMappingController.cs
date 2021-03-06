﻿using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/CaseInsuranceMapping")]

    public class CaseInsuranceMappingController : ApiController
    {
        private IRequestHandler<CaseInsuranceMapping> requestHandler;

        public CaseInsuranceMappingController()
        {
            requestHandler = new GbApiRequestHandler<CaseInsuranceMapping>();
        }

        [HttpGet]
        [Route("getByCaseId/{CaseId}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetByCaseId(int CaseId)
        {
            return requestHandler.GetByCaseId(Request, CaseId);
        }

        [HttpPost]
        [Route("Save")]
        //[AllowAnonymous]
        public HttpResponseMessage Post([FromBody]CaseInsuranceMapping data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}
