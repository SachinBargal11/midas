﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CANotificationService.Models
{
    public class NotificationApplicationGroupDetail
    {
        public int ApplicationGroupID { get; set; }
        public string ApplicationGroupName { get; set; }
        public int ApplicationID { get; set; }
        public string ApplicationName { get; set; }
    }
}