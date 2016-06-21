﻿CREATE TABLE [dbo].[ProviderDetails]
(	[ProviderDetailId] int identity(1,1) NOT NULL PRIMARY KEY,
	[ProviderUserID] int,
	[NPI] nvarchar(50),
	[FederalTaxId] nvarchar(50),
	[Prefix] nvarchar(5),
	[LocationId] int,
	[IsSoftwareFeeAdded] bit,
	[SoftwareFee] money,
	[PlaceOfService] int,
	[IsReferring] bit,
	[BillingAddressId] int,	
	[ContactInfoId] int,
	[BillingContactInfoId] int,
	[AccountId] int not null,
	[Deleted] bit,
	[CreatedDate] datetime,
	[UpdatedDate] datetime,
	[CreatedBy] int,
	[UpdatedBY]  int
  )
