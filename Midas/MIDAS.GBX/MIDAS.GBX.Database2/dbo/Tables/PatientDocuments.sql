﻿CREATE TABLE [dbo].[PatientDocuments] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [PatientId]       INT           NOT NULL,
    [MidasDocumentId] INT           NOT NULL,
    [DocumentName]    VARCHAR (500) NULL,
    [CreateDate]      DATETIME2 (7) NULL,
    [UpdateDate]      DATETIME2 (7) NULL,
    [CreateUserId]    INT           NULL,
    [UpdateUserId]    INT           NULL,
    [IsDeleted]       BIT           NULL,
    [DocumentType]    VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PatientDocuments_MidasDocuments_MidasDocumentId] FOREIGN KEY ([MidasDocumentId]) REFERENCES [dbo].[MidasDocuments] ([Id]),
    CONSTRAINT [FK_PatientDocuments_Patient_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patient] ([Id])
);

