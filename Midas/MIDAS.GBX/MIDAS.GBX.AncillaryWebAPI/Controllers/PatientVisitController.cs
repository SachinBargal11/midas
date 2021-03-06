﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using MIDAS.GBX.BusinessObjects;
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
    [RoutePrefix("midasancillaryapi/patientVisit")]
    public class PatientVisitController : ApiController
    {
        private IRequestHandler<PatientVisit> requestHandler;

        public PatientVisitController()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit>();
        }

       

        [HttpPost]
        [Route("Save")]
        public HttpResponseMessage Post([FromBody]PatientVisit data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        [HttpGet]
        [Route("getByAncillaryId/{AncillaryId}")]
        public HttpResponseMessage GetByAncillaryId(int AncillaryId)
        {
            return requestHandler.GetByAncillaryId(Request, AncillaryId);
        }

        
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
