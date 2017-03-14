﻿using MIDAS.GBX.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/patientVisit")]
    public class PatientVisit2Controller : ApiController
    {
        private IRequestHandler<PatientVisit2> requestHandler;

        public PatientVisit2Controller()
        {
            requestHandler = new GbApiRequestHandler<PatientVisit2>();
        }

        [HttpGet]
        [Route("getByLocationId/{locationId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationId(int locationId)
        {
            return requestHandler.GetByLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByLocationAndRoomId/{locationId}/{roomId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationAndRoomId(int locationId, int roomId)
        {
            return requestHandler.GetGbObjects(Request, locationId, roomId);
        }

        [HttpGet]
        [Route("getByLocationAndDoctorId/{locationId}/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByLocationAndDoctorId(int locationId, int doctorId)
        {
            return requestHandler.GetGbObjects2(Request, locationId, doctorId);
        }

        [HttpGet]
        [Route("getByDoctorId/{doctorId}")]
        [AllowAnonymous]
        public HttpResponseMessage GetByDoctorId(int doctorId)
        {
            return requestHandler.GetByDoctorId(Request, doctorId);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]PatientVisit2 data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpDelete]
        [Route("DeleteVisit/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteVisit(int id)
        {
            return requestHandler.Delete(Request, id);
        }

        [HttpDelete]
        [Route("DeleteCalendarEvent/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DeleteCalendarEvent(int id)
        {
            return requestHandler.DeleteCalendarEvent(Request, id);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
