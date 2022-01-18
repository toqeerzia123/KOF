CREATE TABLE [dbo].[User]
(
	[UserId] INT IDENTITY(1,1) NOT NULL, 
    [RoleId] INT NULL, 
    [Name] NVARCHAR(250) NULL, 
    [Email] NVARCHAR(250) NULL, 
    [Phone] NVARCHAR(50) NULL, 
    [PasswordHash] BINARY(50) NULL, 
    [PasswordSalt] BINARY(50) NULL, 
    [IsActive] BIT NULL, 
    [CreatedBy] NVARCHAR(250) NULL, 
    [CreatedOn] DATETIME NULL, 
    CONSTRAINT [PK_User] PRIMARY KEY ([UserId]) ,
    CONSTRAINT [FK_User_Role] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role](RoleId)
)
