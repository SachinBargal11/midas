﻿using MIDAS.GBX.Common;
using MIDAS.GBX.DataRepository.Model;
using MIDAS.GBX.EN;
using MIDAS.GBX.EntityRepository;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO = MIDAS.GBX.BusinessObjects;

namespace MIDAS.GBX.DataRepository.EntityRepository
{
    internal class ScheduleRepository : BaseEntityRepo, IDisposable
    {
        private DbSet<Schedule> _dbSet;
        private DbSet<ScheduleDetail> _dbSetScheduleDetail;
        #region Constructor
        public ScheduleRepository(MIDASGBXEntities context)
            : base(context)
        {
            _dbSet = context.Set<Schedule>();
            _dbSetScheduleDetail = context.Set<ScheduleDetail>();
            context.Configuration.ProxyCreationEnabled = false;
        }
        #endregion

        #region Entity Conversion
        public override T Convert<T, U>(U entity)
        {
            Schedule schedule = entity as Schedule;

            if (schedule == null)
                return default(T);

            BO.Schedule scheduleBO = new BO.Schedule();
            scheduleBO.Name = schedule.Name;
            scheduleBO.ID = schedule.id;
            scheduleBO.isDefault = schedule.IsDefault;

            if (schedule.IsDeleted.HasValue)
                scheduleBO.IsDeleted = schedule.IsDeleted.Value;
            if (schedule.UpdateByUserID.HasValue)
                scheduleBO.UpdateByUserID = schedule.UpdateByUserID.Value;

            BO.ScheduleDetail scheduledetailBO = null;
            List<BO.ScheduleDetail> lstscheduledetailBO = new List<BO.ScheduleDetail>();
            foreach (var scheduledetail in schedule.ScheduleDetails)
            {
                scheduledetailBO = new BO.ScheduleDetail();
                scheduledetailBO.ID = scheduledetail.id;
                scheduledetailBO.Name = scheduledetail.Name;
                scheduledetailBO.dayofWeek = scheduledetail.DayOfWeek;
                scheduledetailBO.slotStart = scheduledetail.SlotStart;
                scheduledetailBO.slotEnd = scheduledetail.SlotEnd;
                scheduledetailBO.slotDate = scheduledetail.SlotDate;
                scheduledetailBO.scheduleStatus = (BO.GBEnums.ScheduleStatus)scheduledetail.Status;

                if (scheduledetail.IsDeleted.HasValue)
                    scheduledetailBO.IsDeleted = scheduledetail.IsDeleted.Value;
                if (scheduledetail.UpdateByUserID.HasValue)
                    scheduledetailBO.UpdateByUserID = scheduledetail.UpdateByUserID.Value;
                lstscheduledetailBO.Add(scheduledetailBO);
            }
            scheduleBO.ScheduleDetails = lstscheduledetailBO;

            return (T)(object)scheduleBO;
        }
        #endregion

        #region Validate Entities
        public override List<MIDAS.GBX.BusinessObjects.BusinessValidation> Validate<T>(T entity)
        {
            BO.Schedule schedule = (BO.Schedule)(object)entity;
            var result = schedule.Validate(schedule);
            return result;
        }
        #endregion

        #region Save
        public override object Save<T>(T entity)
        {
            BO.Schedule scheduleBO = (BO.Schedule)(object)entity;
           
            Schedule scheduleDB = new Schedule();
            ScheduleDetail scheduledetailDB = null;

            #region Schedule
            scheduleDB.id = scheduleBO.ID;
            scheduleDB.Name = scheduleBO.Name;
            scheduleDB.IsDefault = scheduleBO.isDefault;
            scheduleDB.IsDeleted = scheduleBO.IsDeleted.HasValue ? scheduleBO.IsDeleted : false;
            #endregion

            if(scheduleDB.id==0)
            if (_context.Schedules.Any(o => o.Name == scheduleBO.Name))
            {
                return new BO.ErrorObject { ErrorMessage = "Schedule already exists.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }

            #region Schedule Detail
            foreach (var scheduledetailBO in scheduleBO.ScheduleDetails)
            {
                scheduledetailDB = new ScheduleDetail();
                scheduledetailDB.id = scheduledetailBO.ID;
                scheduledetailDB.Name = scheduledetailBO.Name;
                scheduledetailDB.DayOfWeek = scheduledetailBO.dayofWeek;
                scheduledetailDB.SlotStart = scheduledetailBO.slotStart;
                scheduledetailDB.SlotEnd = scheduledetailBO.slotEnd;
                scheduledetailDB.SlotDate = scheduledetailBO.slotDate;
                scheduledetailDB.Status = System.Convert.ToByte(scheduledetailBO.scheduleStatus);
                scheduledetailDB.IsDeleted = scheduledetailBO.IsDeleted.HasValue ? scheduledetailBO.IsDeleted : false;
                scheduleDB.ScheduleDetails.Add(scheduledetailDB);
            }

            #endregion
            if (scheduleDB.id > 0)
            {
                _dbSetScheduleDetail.RemoveRange(_context.ScheduleDetails.Where(c => c.ScheduleID == scheduleBO.ID));
                _context.SaveChanges();
                //For Update Record

                //Find Schedule By ID
                Schedule schedule = _context.Schedules.Where(p => p.id == scheduleDB.id).FirstOrDefault<Schedule>();

                if (schedule != null && !schedule.IsDefault)
                {
                    #region Location
                    schedule.id = scheduleBO.ID;
                    schedule.Name = scheduleBO.Name == null ? schedule.Name : scheduleBO.Name;
                    schedule.IsDeleted = scheduleBO.IsDeleted == null ? scheduleBO.IsDeleted : schedule.IsDeleted;
                    schedule.UpdateDate = scheduleBO.UpdateDate;
                    schedule.UpdateByUserID = scheduleBO.UpdateByUserID;
                    #endregion
                    _context.Entry(schedule).State = System.Data.Entity.EntityState.Modified;
                }
                else
                    return new BO.ErrorObject { errorObject = "", ErrorMessage = "Invalid schedule details or default schdule.", ErrorLevel = ErrorLevel.Error };
                schedule.ScheduleDetails = scheduleDB.ScheduleDetails;
            }
            else
            {
                scheduleDB.CreateDate = scheduleBO.CreateDate;
                scheduleDB.CreateByUserID = scheduleBO.CreateByUserID;
                _dbSet.Add(scheduleDB);
            }
            _context.SaveChanges();

            var res = Convert<BO.Schedule, Schedule>(scheduleDB);
            return (object)res;
        }
        #endregion

        #region Delete
        public override object Delete<T>(T entity)
        {
            BO.Schedule scheduleBO = entity as BO.Schedule;

            Schedule scheduleDB = new Schedule();
            scheduleDB.id = scheduleBO.ID;
            _dbSet.Remove(_context.Schedules.Single<Schedule>(p => p.id == scheduleBO.ID));
            _context.SaveChanges();

            var res = (BO.GbObject)(object)entity;
            return scheduleDB;
        }
        #endregion

        #region Get By ID
        public override object Get(int id)
        {
            BO.Schedule acc_ = Convert<BO.Schedule, Schedule>(_context.Schedules.Include("ScheduleDetails").Where(p => p.id == id && p.IsDeleted == false).FirstOrDefault<Schedule>());
            if (acc_ == null)
            {
                return new BO.ErrorObject { ErrorMessage = "No record found for this schedule.", errorObject = "", ErrorLevel = ErrorLevel.Error };
            }
            return (object)acc_;
        }
        #endregion

        #region Get By Filter
        public override object Get<T>(T entity)
        {
            List<BO.Schedule> lstSchedules = new List<BO.Schedule>();
            BO.Schedule scheduleBO = (BO.Schedule)(object)entity;

            if (scheduleBO != null)
            {
                if (scheduleBO.ID == 0)
                {
                    var acc_ = _context.Schedules.Include("ScheduleDetails").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<Schedule>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (Schedule item in acc_)
                    {
                        lstSchedules.Add(Convert<BO.Schedule, Schedule>(item));
                    }
                }
                else
                {
                    var acc_ = _context.Schedules.Include("ScheduleDetails").Where(p => (p.IsDeleted == false || p.IsDeleted == null) && p.ScheduleDetails.Any(x => x.ScheduleID == scheduleBO.ID)).ToList<Schedule>();
                    if (acc_ == null)
                    {
                        return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                    }
                    foreach (Schedule item in acc_)
                    {
                        lstSchedules.Add(Convert<BO.Schedule, Schedule>(item));
                    }
                }
            }
            else
            {
                var acc_ = _context.Schedules.Include("ScheduleDetails").Where(p => (p.IsDeleted == false || p.IsDeleted == null)).ToList<Schedule>();
                if (acc_ == null)
                {
                    return new BO.ErrorObject { ErrorMessage = "No records found.", errorObject = "", ErrorLevel = ErrorLevel.Error };
                }
                foreach (Schedule item in acc_)
                {
                    lstSchedules.Add(Convert<BO.Schedule, Schedule>(item));
                }
            }

            return lstSchedules;
        }
        #endregion
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
