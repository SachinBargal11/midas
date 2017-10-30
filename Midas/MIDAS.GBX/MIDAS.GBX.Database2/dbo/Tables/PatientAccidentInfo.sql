﻿CREATE TABLE [dbo].[PatientAccidentInfo] (
    [Id]                    INT             IDENTITY (1, 1) NOT NULL,
    [CaseId]                INT             NOT NULL,
    [AccidentDate]          DATETIME        NOT NULL,
    [PlateNumber]           NVARCHAR (64)   NULL,
    [ReportNumber]          NVARCHAR (128)  NULL,
    [AccidentAddressInfoId] INT             NOT NULL,
    [HospitalName]          NVARCHAR (128)  NULL,
    [HospitalAddressInfoId] INT             NOT NULL,
    [DateOfAdmission]       DATETIME        NULL,
    [AdditionalPatients]    NVARCHAR (512)  NULL,
    [DescribeInjury]        NVARCHAR (1024) NULL,
    [PatientTypeId]         TINYINT         NOT NULL,
    [IsDeleted]             BIT             DEFAULT ((0)) NULL,
    [CreateByUserID]        INT             NOT NULL,
    [CreateDate]            DATETIME2 (7)   NOT NULL,
    [UpdateByUserID]        INT             NULL,
    [UpdateDate]            DATETIME2 (7)   NULL,
    [MedicalReportNumber]   NVARCHAR (128)  NULL,
    [Weather]               NVARCHAR (128)  NULL,
    [PoliceAtScene]         BIT             CONSTRAINT [DF_PatientAccidentInfo_PoliceAtScene] DEFAULT ((0)) NULL,
    [Precinct]              NVARCHAR (64)   NULL,
    [WearingSeatBelts]      BIT             CONSTRAINT [DF_PatientAccidentInfo_WearingSeatBelts] DEFAULT ((0)) NULL,
    [AirBagsDeploy]         BIT             CONSTRAINT [DF_PatientAccidentInfo_AirBagsDeploy] DEFAULT ((0)) NULL,
    [PhotosTaken]           BIT             CONSTRAINT [DF_PatientAccidentInfo_PhotosTaken] DEFAULT ((0)) NULL,
    [AccidentDescription]   NVARCHAR (1024) NULL,
    [Witness]               BIT             CONSTRAINT [DF_PatientAccidentInfo_Witness] DEFAULT ((0)) NULL,
    [Ambulance]             BIT             CONSTRAINT [DF_PatientAccidentInfo_Ambulance] DEFAULT ((0)) NULL,
    [TreatedAndReleased]    BIT             CONSTRAINT [DF_PatientAccidentInfo_TreatedAndReleased] DEFAULT ((0)) NULL,
    [Admitted]              BIT             CONSTRAINT [DF_PatientAccidentInfo_Admitted] DEFAULT ((0)) NULL,
    [XRaysTaken]            BIT             CONSTRAINT [DF_PatientAccidentInfo_XRaysTaken] DEFAULT ((0)) NULL,
    [DurationAtHospital]    NVARCHAR (128)  NULL,
    CONSTRAINT [PK_AccidentInfo] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_AccidentAddressInfoId] FOREIGN KEY ([AccidentAddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_PatientAccidentInfo_AddressInfo_HospitalAddressInfoId] FOREIGN KEY ([HospitalAddressInfoId]) REFERENCES [dbo].[AddressInfo] ([id]),
    CONSTRAINT [FK_PatientAccidentInfo_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_PatientAccidentInfo_PatientType_PatientTypeId] FOREIGN KEY ([PatientTypeId]) REFERENCES [dbo].[PatientType] ([Id])
);
