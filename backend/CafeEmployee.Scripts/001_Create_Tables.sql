DROP TABLE IF EXISTS [dbo].[CafeEmployee]
GO

DROP TABLE IF EXISTS [dbo].[Employee]
GO

DROP TABLE IF EXISTS [dbo].[Cafe]
GO


CREATE TABLE [dbo].[Employee] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [EmployeeStringId] nvarchar(50) NOT NULL,
    [Name] nvarchar(50) NOT NULL,
    [EmailAddress] nvarchar(50) NOT NULL,
    [PhoneNumber] nvarchar(8) NOT NULL,
    [Gender] bit NOT NULL,
    CONSTRAINT PK_Employee PRIMARY KEY ([Id]),
    CONSTRAINT UQ_Employee_EmployeeId UNIQUE ([EmployeeStringId])
    );
GO


CREATE TABLE [dbo].[Cafe] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CafeStringId] nvarchar(50) NOT NULL,
    [Name] nvarchar(10) NOT NULL,
    [Description] nvarchar(256) NOT NULL,
    [Logo] nvarchar(500) NULL,
    [Location] nvarchar(100) NOT NULL,
    CONSTRAINT PK_Cafe PRIMARY KEY ([Id]),
    CONSTRAINT UQ_Cafe_CafeId UNIQUE ([CafeStringId])
    );

CREATE INDEX IX_Cafe_Location ON [dbo].[Cafe]([Location]);
GO

CREATE TABLE [dbo].[CafeEmployee] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [EmployeeId] int NOT NULL,
    [CafeId] int NOT NULL,
    [IsActive] bit NOT NULL,
    [EmployeeStartDate] datetime2(7) NOT NULL,
    [EmployeeEndDate] datetime2(7) NULL,
    CONSTRAINT PK_CafeEmployee PRIMARY KEY ([Id]),
    CONSTRAINT FK_CafeEmployee_EmployeeId FOREIGN KEY ([EmployeeId]) REFERENCES [dbo].[Employee]([Id]),
    CONSTRAINT FK_CafeEmployee_CafeId FOREIGN KEY ([CafeId]) REFERENCES [dbo].[Cafe]([Id]),
    CONSTRAINT UQ_CafeEmployee_EmployeeId UNIQUE ([EmployeeId])
    );
GO
