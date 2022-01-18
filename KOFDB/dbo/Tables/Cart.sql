CREATE TABLE [dbo].[Cart]
(
	[CartId] INT IDENTITY(1,1) NOT NULL , 
    [ProductId] INT NULL, 
    [UserId] INT NULL, 
    [Quantity] INT NULL, 
    [PerUnitPrice] INT NULL, 
    [PerUnitCost] INT NULL, 
    [TotalPrice] INT NULL, 
    [TotalCost] INT NULL,
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [FK_Cart_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product](ProductId),
    CONSTRAINT [FK_Cart_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User](UserId), 
    CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED([CartId] ASC)
)
