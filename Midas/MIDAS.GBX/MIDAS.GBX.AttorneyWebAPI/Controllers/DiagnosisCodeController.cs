﻿using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/DiagnosisCode")]

    public class DiagnosisCodeController : ApiController
    {
        private IRequestHandler<DiagnosisCode> requestHandler;

        public DiagnosisCodeController()
        {
            requestHandler = new GbApiRequestHandler<DiagnosisCode>();
        }

        [HttpGet]
        [Route("getByDiagnosisTypeId/{id}")]
        //[AllowAnonymous]
        public HttpResponseMessage GetDiagnosisType(int id)
        {
            return requestHandler.GetDiagnosisType(Request, id);
        }

       protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}