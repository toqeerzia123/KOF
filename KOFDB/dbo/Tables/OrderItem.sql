CREATE TABLE [dbo].[OrderItem]
(
	[OrderItemId] INT IDENTITY(1,1) NOT NULL , 
    [ProductId] INT NULL, 
    [OrderId] INT NULL, 
    [Quantity] INT NULL, 
    [PerUnitPrice] INT NULL, 
    [PerUnitCost] INT NULL, 
    [TotalPrice] INT NULL, 
    [TotalCost] INT NULL,
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [FK_OrderItem_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product](ProductId),
    CONSTRAINT [FK_OrderItem_Order] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Order](OrderId), 
    CONSTRAINT [PK_OrderItem] PRIMARY KEY ([OrderItemId])
)
