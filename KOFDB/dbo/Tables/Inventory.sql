CREATE TABLE [dbo].[Inventory]
(
	[InventoryId] INT IDENTITY(1,1) NOT NULL , 
    [ProductId] INT NULL, 
    [SupplierId] INT NULL,
    [Quantity] INT NULL, 
    [Unit] NVARCHAR(50) NULL, 
    [CostPerUnit] INT NULL, 
    [PricePerUnit] INT NULL, 
    [TotalCost] INT NULL, 
    [TotalPrice] INT NULL, 
    [RemainingQuantity] INT NULL, 
    [Status] BIT NULL, 
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_Inventory] PRIMARY KEY CLUSTERED ([InventoryId] ASC),
    CONSTRAINT [FK_Inventory_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product](ProductId),
    CONSTRAINT [FK_Inventory_Supplier] FOREIGN KEY ([SupplierId]) REFERENCES [dbo].[Supplier](SupplierId)
)
