﻿CREATE TABLE [dbo].[Case]
(
	[CaseId] int identity(1,1) NOT NULL PRIMARY KEY,
	[CaseTypeId] int ,
	[ProviderID] int,
	[InsuranceId] int,
	[CaseStatusId] int,
	[AttorneyId] int,
	[PatientId] int,
	[ClaimNumber] nvarchar(50),
	[PolicyNumber] nvarchar(50),
	[DateOfAccident] datetime,
	[AdjusterId] int ,
	[AssociateToDianosisCode] bit,
	[CreatedDate] datetime,
	[AccountId] int,
	[InsuranceAddressId] int,
    [CaseNo] int NULL, 
    [IsDeleted] BIT NULL, 
	[LocationId] int,
	[IsCopied] int,
	[CopiedAccountId] int,
	[CopiedUserId] int,
	[CopiedDate] datetime,
	[CopiedFormPatient] int,
	[TotalBillAmount] money,
	[Paid] money,
	[Balance] money,
	[CasePrefix] nvarchar(10),
	[RemoteCaseID] nvarchar(50),
	[MarriedStatus] nvarchar(50),
	[ReferringDoctorID] int,
	[ReferringProviderId] int,
	[DiagnosisForSpecialty] nvarchar(2000),
	[EmployerId] int,
	[EmployerAddressId]int,
	[Deleted] bit,	
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int

	
)
