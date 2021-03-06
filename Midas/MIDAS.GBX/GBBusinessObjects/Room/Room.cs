﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIDAS.GBX.BusinessObjects
{
    public class Room : GbObject
    {
        private string _name;
        public string name
        {
            get
            {
                return this._name;
            }
            set
            {
                _name = value;
            }
        }

        private string _contactpersonname;
        public string contactersonName
        {
            get
            {
                return this._contactpersonname;
            }
            set
            {
                _contactpersonname = value;
            }
        }

        private string _phone;
        public string phone
        {
            get
            {
                return this._phone;
            }
            set
            {
                _phone = value;
            }
        }

        private RoomTest _roomtest;
        public RoomTest roomTest
        {
            get
            {
                return this._roomtest;
            }
            set
            {
                _roomtest = value;
            }
        }
        private Location _location;
        public Location location
        {
            get
            {
                return this._location;
            }
            set
            {
                _location = value;
            }
        }
        private Schedule _schedule;
        public Schedule schedule
        {
            get
            {
                return this._schedule;
            }
            set
            {
                _schedule = value;
            }
        }

        public override List<BusinessValidation> Validate<T>(T entity)
        {
            List<BusinessValidation> validations = new List<BusinessValidation>();
            BusinessValidation validation = new BusinessValidation();
            return validations;
        }
    }

    public class mRoom : GbObject
    {
        private string _name;
        public string name
        {
            get
            {
                return this._name;
            }
            set
            {
                _name = value;
            }
        }

        private string _contactpersonname;
        public string contactersonName
        {
            get
            {
                return this._contactpersonname;
            }
            set
            {
                _contactpersonname = value;
            }
        }

        private string _phone;
        public string phone
        {
            get
            {
                return this._phone;
            }
            set
            {
                _phone = value;
            }
        }

        private RoomTest _roomtest;
        public RoomTest roomTest
        {
            get
            {
                return this._roomtest;
            }
            set
            {
                _roomtest = value;
            }
        }
        private mLocation _location;
        public mLocation location
        {
            get
            {
                return this._location;
            }
            set
            {
                _location = value;
            }
        }
        private mSchedule _schedule;
        public mSchedule schedule
        {
            get
            {
                return this._schedule;
            }
            set
            {
                _schedule = value;
            }
        }

    }
}
