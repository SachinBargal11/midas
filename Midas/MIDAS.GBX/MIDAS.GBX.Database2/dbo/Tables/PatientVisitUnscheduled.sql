﻿CREATE TABLE [dbo].[PatientVisitUnscheduled] (
    [Id]                  INT            IDENTITY (1, 1) NOT NULL,
    [CaseId]              INT            NOT NULL,
    [PatientId]           INT            NOT NULL,
    [EventStart]          DATETIME2 (7)  NULL,
    [MedicalProviderName] NVARCHAR (256) NULL,
    [DoctorName]          NVARCHAR (256) NULL,
    [SpecialtyId]         INT            NULL,
    [RoomTestId]          INT            NULL,
    [Notes]               NVARCHAR (512) NULL,
    [ReferralId]          INT            NULL,
    [IsDeleted]           BIT            DEFAULT ((0)) NULL,
    [CreateByUserID]      INT            NOT NULL,
    [CreateDate]          DATETIME2 (7)  NOT NULL,
    [UpdateByUserID]      INT            NULL,
    [UpdateDate]          DATETIME2 (7)  NULL,
    [OrignatorCompanyId]  INT            NOT NULL,
    [LocationName]        NVARCHAR (128) NULL,
    CONSTRAINT [PK_PatientVisitUnscheduled] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientVisitUnscheduled_Case_CaseId] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([Id]),
    CONSTRAINT [FK_PatientVisitUnscheduled_Company_OrignatorCompanyId] FOREIGN KEY ([OrignatorCompanyId]) REFERENCES [dbo].[Company] ([id]),
    CONSTRAINT [FK_PatientVisitUnscheduled_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id]),
    CONSTRAINT [FK_PatientVisitUnscheduled_Referral_ReferralId] FOREIGN KEY ([ReferralId]) REFERENCES [dbo].[Referral] ([Id]),
    CONSTRAINT [FK_PatientVisitUnscheduled_RoomTest_RoomTestId] FOREIGN KEY ([RoomTestId]) REFERENCES [dbo].[RoomTest] ([id]),
    CONSTRAINT [FK_PatientVisitUnscheduled_Specialty_SpecialtyId] FOREIGN KEY ([SpecialtyId]) REFERENCES [dbo].[Specialty] ([id])
);
