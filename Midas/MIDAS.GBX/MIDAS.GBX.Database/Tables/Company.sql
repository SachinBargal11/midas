﻿CREATE TABLE [dbo].[Company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[CompanyType] [int] NOT NULL,
	[SubscriptionPlanType] [int] NOT NULL,
	[TaxID] [nvarchar](10) NOT NULL,
	[AddressId] [int] NOT NULL,
	[ContactInfoID] [int] NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_AddressInfo] FOREIGN KEY([AddressId])
REFERENCES [dbo].[AddressInfo] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_AddressInfo]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_CompanyType] FOREIGN KEY([CompanyType])
REFERENCES [dbo].[CompanyType] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_CompanyType]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_ContactInfo] FOREIGN KEY([ContactInfoID])
REFERENCES [dbo].[ContactInfo] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_ContactInfo]
GO

ALTER TABLE [dbo].[Company]  WITH CHECK ADD  CONSTRAINT [FK_Company_SubscriptionPlan] FOREIGN KEY([SubscriptionPlanType])
REFERENCES [dbo].[SubscriptionPlan] ([id])
GO

ALTER TABLE [dbo].[Company] CHECK CONSTRAINT [FK_Company_SubscriptionPlan]
GO