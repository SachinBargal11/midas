﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.PatientWebAPI.RequestHandler;

namespace MIDAS.GBX.PatientWebAPI.Controllers
{
    [RoutePrefix("midaspatientapi/IMEVisit")]
    public class IMEVisitController : ApiController
    {
        private IRequestHandler<IMEVisit> requestHandler;

        public IMEVisitController()
        {
            requestHandler = new GbApiRequestHandler<IMEVisit>();
        }

        [HttpGet]
        [Route("getByPatientId/{PatientId}")]
        public HttpResponseMessage GetByPatientId(int PatientId)
        {
            return requestHandler.GetByPatientId(Request, PatientId);
        }
    }
}
