﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.AttorneyWebAPI.Controllers
{
    [RoutePrefix("midasattorneyapi/OTPCompanyMapping")]
    public class OTPCompanyMappingController : ApiController
    {
        private IRequestHandler<OTPCompanyMapping> requestHandler;

        public OTPCompanyMappingController()
        {
            requestHandler = new GbApiRequestHandler<OTPCompanyMapping>();
        }

        [HttpGet]
        [Route("generateOTPForCompany/{companyId}")]
        [AllowAnonymous]
        public HttpResponseMessage GenerateOTPForCompany(int companyId)
        {
            return requestHandler.GenerateOTPForCompany(Request, companyId);
        }


        [HttpGet]
        [Route("validateOTPForCompany/{otp}")]
        [AllowAnonymous]
        public HttpResponseMessage ValidateOTPForCompany(string otp)
        {
            return requestHandler.ValidateOTPForCompany(Request, otp);
        }

        [HttpGet]
        [Route("associatePreferredCompany/{otp}/{currentCompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage AssociatePreferredCompany(string otp, int currentCompanyId)
        {
            return requestHandler.AssociatePreferredCompany(Request, otp, currentCompanyId);
        }

        [HttpGet]
        [Route("deletePreferredCompany/{preferredCompanyId}/{currentCompanyId}")]
        [AllowAnonymous]
        public HttpResponseMessage DeletePreferredCompany(int preferredCompanyId, int currentCompanyId)
        {
            return requestHandler.DeletePreferredCompany(Request, preferredCompanyId, currentCompanyId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
