﻿using MIDAS.GBX.BusinessObjects;
using MIDAS.GBX.Notification.RequestHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MIDAS.GBX.Notification.Controllers
{
    [RoutePrefix("midasNotificationAPI/SendNotification")]
    public class SendNotificationController : ApiController
    {/*
        private IRequestHandler<SMS2> requestHandlerSMS;
        private IRequestHandler<MultipleSMS> requestHandlerMultipleSMS;

        public SendNotificationController()
        {
            requestHandlerSMS = new NotificationRequestHandler<SMS2>();
            requestHandlerMultipleSMS = new NotificationRequestHandler<MultipleSMS>();
        }

        [HttpPost]
        [Route("sendSMS")]
        public HttpResponseMessage SendSMS([FromBody]SMS2 smsObject)
        {
            return requestHandlerSMS.SendSMS(Request, smsObject);
        }

        [HttpPost]
        [Route("sendMultipleSMS")]
        public HttpResponseMessage SendMultipleSMS([FromBody]MultipleSMS multipleSMSObject)
        {
            return requestHandlerMultipleSMS.SendMultipleSMS(Request, multipleSMSObject);
        }*/
    }
}
