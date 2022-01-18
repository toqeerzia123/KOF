CREATE TABLE [dbo].[Supplier]
(
	[SupplierId] INT IDENTITY(1,1) NOT NULL , 
    [Name] NVARCHAR(250) NULL, 
    [Company] NVARCHAR(250) NULL, 
    [Email] NVARCHAR(250) NULL, 
    [Address] NVARCHAR(250) NULL, 
    [Phone] NVARCHAR(250) NULL, 
    [IsActive] BIT NULL,
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_Supplier] PRIMARY KEY ([SupplierId]), 
)
