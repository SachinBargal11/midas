﻿using System.Web;
using System.Web.Mvc;

namespace MIDAS.GBX.AncillaryWebAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
