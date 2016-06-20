﻿CREATE TABLE [dbo].[Reminder]( 
[RemindeId] int IDENTITY(1,1), 
[ReminderDate] smalldatetime,
[ReminderDesc] nvarchar(50), 
[ReminderAssignTo]int,
[ReminderAssignBy] int ,
[ReminderStatusId] int,
[StartDate] datetime, 
[EndDate] datetime, 
[IsRecurrence] bit, 
[RecurrenceType] int,
[OccurrenceEndCount] int, 
[DayOption] int, 
[DayCount] int, 
[EveryWeekday] int,
[RecurWeekCount] int,
[Sunday] int, 
[Monday] int, 
[Tuesday] int,
[Wednesday] int,
[Thursday] int, 
[Friday] int, 
[Saturday] int,
[MonthOption] int, 
[CaseId] int, 
[DocterId] int,
[OfficeId] int,
[AccountId]int,
[DismissReason] nvarchar(500), 
[ShowOn] nvarchar(50), 
[ReminderTypeId] int, 
[ReminderType] nvarchar(max), 
[EndDateCount] int )