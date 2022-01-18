CREATE TABLE [dbo].[Role]
(
	[RoleId] INT IDENTITY(1,1) NOT NULL, 
    [Name] NVARCHAR(50) NULL, 
    [Description] NVARCHAR(MAX) NULL, 
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_Role] PRIMARY KEY ([RoleId]) 
)
