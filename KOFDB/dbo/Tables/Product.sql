CREATE TABLE [dbo].[Product]
(
	[ProductId] INT IDENTITY(1,1) NOT NULL ,
    [CategoryId] INT NULL,
    [Name] NVARCHAR(250) NULL, 
    [ImageUrl] NVARCHAR(250) NULL, 
    [About] NVARCHAR(300) NULL, 
    [Description] NVARCHAR(500) NULL, 
    [IsActive] BIT NULL,
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([ProductId] ASC),
    CONSTRAINT [FK_Product_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category](CategoryId),
)
