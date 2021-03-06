﻿CREATE TABLE [dbo].[UserType](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IsDeleted] [bit] NULL,
	[CreateByUserID] [int] NOT NULL,
	[CreateDate] [datetime2](7) NOT NULL,
	[UpdateByUserID] [int] NULL,
	[UpdateDate] [datetime2](7) NULL,
 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/*
INSERT INTO [dbo].[UserType] ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) VALUES ('Patient', NULL, 0, GETDATE())
GO
INSERT INTO [dbo].[UserType] ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) VALUES ('Staff', NULL, 0, GETDATE())
GO
INSERT INTO [dbo].[UserType] ([Name], [IsDeleted], [CreateByUserID], [CreateDate]) VALUES ('Attorney', NULL, 0, GETDATE())
GO
*/


--insert into [dbo].[UserType] values('Doctor',null,0,'2017-01-24 16:18:19.8870000',null,null);

--insert into [MIDASGBX].[dbo].[UserType] values('Ancillary',null,0,'2017-02-17 12:00:40.6830000',null,null);