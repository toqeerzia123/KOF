CREATE TABLE [dbo].[ProductImage]
(
	[ProductImageId] INT IDENTITY(1,1) NOT NULL, 
    [ProductId] INT NULL,
    [ImageUrl] NVARCHAR(50) NULL, 
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_ProductImage] PRIMARY KEY CLUSTERED (ProductImageId ASC),
    CONSTRAINT [FK_ProductImage_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product](ProductId),

)
