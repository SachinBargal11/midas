﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class UserCompany : GbObject
    {
        public User User { get; set; }
        public Company Company { get; set; }
    }
}