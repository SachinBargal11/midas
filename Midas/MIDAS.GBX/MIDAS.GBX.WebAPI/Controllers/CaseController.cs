﻿using MIDAS.GBX.BusinessObjects;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MIDAS.GBX.WebAPI.Controllers
{
    [RoutePrefix("midasapi/Case")]

    public class CaseController : ApiController
    {
        private IRequestHandler<Case> requestHandler;

        public CaseController()
        {
            requestHandler = new GbApiRequestHandler<Case>();
        }

        // GET: api/Organizations/5
        [HttpGet]
        [Route("Get/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }


        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllPatient([FromBody]Case data)
        {
            return requestHandler.GetGbObjects(Request, data);
        }

        [HttpPost]
        [Route("Save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Case data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }
}