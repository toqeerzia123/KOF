CREATE TABLE [dbo].[Category]
(
	[CategoryId] INT IDENTITY(1,1) NOT NULL , 
    [Name] NVARCHAR(250) NULL, 
    [ImageUrl] NVARCHAR(250) NULL, 
    [Status] BIT NULL,
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([CategoryId] ASC) 
)
