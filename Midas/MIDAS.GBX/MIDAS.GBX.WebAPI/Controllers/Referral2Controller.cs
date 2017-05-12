using MIDAS.GBX.BusinessObjects;
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
    [RoutePrefix("midasapi/Referral2")]

    public class Referral2Controller : ApiController
    {
        private IRequestHandler<Referral2> requestHandler;

        public Referral2Controller()
        {
            requestHandler = new GbApiRequestHandler<Referral2>();
        }

        [HttpPost]
        [Route("save")]
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]Referral2 data)
        {
            return requestHandler.CreateGbObject(Request, data);
        }

        [HttpGet]
        [Route("Get/{id}")]
        public HttpResponseMessage Get(int id)
        {
            return requestHandler.GetObject(Request, id);
        }

        [HttpGet]
        [Route("getByFromCompanyId/{companyId}")]
        public HttpResponseMessage GetByFromCompanyId(int companyId)
        {
            return requestHandler.GetByFromCompanyId(Request, companyId);
        }

        [HttpGet]
        [Route("getByToCompanyId/{companyId}")]
        public HttpResponseMessage GetByToCompanyId(int companyId)
        {
            return requestHandler.GetByToCompanyId(Request, companyId);
        }

        [HttpGet]
        [Route("getByFromLocationId/{locationId}")]
        public HttpResponseMessage GetByFromLocationId(int locationId)
        {
            return requestHandler.GetByFromLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByToLocationId/{locationId}")]
        public HttpResponseMessage GetByToLocationId(int locationId)
        {
            return requestHandler.GetByToLocationId(Request, locationId);
        }

        [HttpGet]
        [Route("getByFromDoctorAndCompanyId/{doctorId}/{companyId}")]
        public HttpResponseMessage GetByFromDoctorAndCompanyId(int doctorId, int companyId)
        {
            return requestHandler.GetByFromDoctorAndCompanyId(Request, doctorId, companyId);
        }

        [HttpGet]
        [Route("getByToDoctorAndCompanyId/{doctorId}/{companyId}")]
        public HttpResponseMessage GetByToDoctorAndCompanyId(int doctorId, int companyId)
        {
            return requestHandler.GetByToDoctorAndCompanyId(Request, doctorId, companyId);
        }

        [HttpGet]
        [Route("getByForRoom/{roomId}")]
        public HttpResponseMessage GetByForRoomId(int roomId)
        {
            return requestHandler.GetByForRoomId(Request, roomId);
        }

        [HttpGet]
        [Route("getByToRoom/{roomId}")]
        public HttpResponseMessage GetByToRoomId(int roomId)
        {
            return requestHandler.GetByToRoomId(Request, roomId);
        }

        [HttpGet]
        [Route("getByForSpecialty/{specialtyId}")]
        public HttpResponseMessage GetByForSpecialtyId(int specialtyId)
        {
            return requestHandler.GetByForSpecialtyId(Request, specialtyId);
        }

        [HttpGet]
        [Route("getByForRoomTestId/{roomTestId}")]
        public HttpResponseMessage GetByForRoomTestId(int roomTestId)
        {
            return requestHandler.GetByForRoomTestId(Request, roomTestId);
        }

        [HttpGet]
        [Route("getReferralByFromCompanyId/{companyId}")]
        public HttpResponseMessage GetReferralByFromCompanyId(int companyId)
        {
            return requestHandler.GetReferralByFromCompanyId(Request, companyId);
        }

        [HttpGet]
        [Route("getReferralByToCompanyId/{companyId}")]
        public HttpResponseMessage GetReferralByToCompanyId(int companyId)
        {
            return requestHandler.GetReferralByToCompanyId(Request, companyId);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }

    }


}
