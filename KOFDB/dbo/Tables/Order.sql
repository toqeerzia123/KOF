CREATE TABLE [dbo].[Order]
(
	[OrderId] INT IDENTITY(1,1) NOT NULL , 
    [UserId] INT NULL, 
    [OrderNumber] NVARCHAR(50) NULL, 
    [OrderType] NVARCHAR(50) NULL, 
    [OrderFrom] NVARCHAR(50) NULL, 
    [OrderStatus] NVARCHAR(50) NULL, 
    [TotalAmount] INT NULL, 
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [FK_Order_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([UserId]), 
    CONSTRAINT [PK_Order] PRIMARY KEY ([OrderId])
)
