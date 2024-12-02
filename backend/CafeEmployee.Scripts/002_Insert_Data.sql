DELETE FROM [dbo].[Employee];
GO

SET IDENTITY_INSERT [dbo].[Employee] ON;

INSERT INTO [dbo].[Employee] ([Id], [EmployeeStringId], [Name], [EmailAddress], [PhoneNumber], [Gender])
VALUES
    (1,  'UIA1B2C3', 'Alice Johnson',   'alice.johnson@example.com',   '91234567', 0),
    (2,  'UI7X9Y5T', 'Bob Williams',     'bob.williams@example.com',     '83456789', 1),
    (3,  'UIK8L6N2', 'Carol Smith',      'carol.smith@example.com',      '94567812', 0),
    (4,  'UIQ4P3Z7', 'David Brown',      'david.brown@example.com',      '85678934', 1),
    (5,  'UI3J7M9T', 'Emily Davis',      'emily.davis@example.com',      '93456781', 0),
    (6,  'UIU8V2L4', 'Frank Wilson',     'frank.wilson@example.com',     '91237845', 1),
    (7,  'UIO9P5M3', 'Grace Clark',      'grace.clark@example.com',      '89945678', 0),
    (8,  'UIZ7K8Q4', 'Henry Lee',        'henry.lee@example.com',        '98765432', 1),
    (9,  'UI3F6J8L', 'Ivy Hall',         'ivy.hall@example.com',         '87654321', 0),
    (10, 'UI9M5K3P', 'Jack Adams',       'jack.adams@example.com',       '93457890', 1),
    (11, 'UI1A7X5Q', 'Katie Brown',      'katie.brown@example.com',      '84567893', 0),
    (12, 'UIL9Z4X6', 'Leo Martinez',     'leo.martinez@example.com',     '89987654', 1),
    (13, 'UI2X9V5J', 'Mia Lee',          'mia.lee@example.com',          '97865431', 0),
    (14, 'UI5L7N8P', 'Nathan Scott',     'nathan.scott@example.com',     '86543210', 1),
    (15, 'UIR4X7L9', 'Olivia Parker',    'olivia.parker@example.com',    '92345678', 0),
    (16, 'UIW7K5M3', 'Paul Rivera',      'paul.rivera@example.com',      '81234567', 1),
    (17, 'UI3T6F9L', 'Quinn Torres',     'quinn.torres@example.com',     '88765432', 0),
    (18, 'UIX5P3L8', 'Ryan Carter',      'ryan.carter@example.com',      '96543218', 1),
    (19, 'UI4N7L5P', 'Sophia Gomez',     'sophia.gomez@example.com',     '89876543', 0),
    (20, 'UI9J3X6P', 'Tom Harris',       'tom.harris@example.com',       '87654329', 1);

SET IDENTITY_INSERT [dbo].[Employee] OFF;
GO

DELETE FROM [dbo].[Cafe];
GO

SET IDENTITY_INSERT [dbo].[Cafe] ON;

INSERT INTO [dbo].[Cafe] ([Id], [CafeStringId], [Name], [Description], [Logo], [Location])
VALUES
(1, NEWID(), N'Café', N'Cozy place with artisanal coffee.', 'https://example.com/logo1.jpg', N'Makati City, Philippines'),
(2, NEWID(), N'Sunset', N'Perfect spot for sunset views and coffee.', 'https://example.com/logo2.jpg', N'Pasay City, Philippines'),
(3, NEWID(), N'Bean', N'Wide variety of beans from around the world.', 'https://example.com/logo3.jpg', N'Cebu City, Philippines'),
(4, NEWID(), N'Java', N'24-hour coffee shop for night owls.', 'https://example.com/logo4.jpg', N'Quezon City, Philippines'),
(5, NEWID(), N'Morning', N'Best morning blends and pastries.', 'https://example.com/logo5.jpg', N'Davao City, Philippines');

-- Disable identity insert
SET IDENTITY_INSERT [dbo].[Cafe] OFF;
GO

DELETE FROM [dbo].[CafeEmployee]
GO

INSERT INTO [dbo].[CafeEmployee] ([EmployeeId], [CafeId], [IsActive], [EmployeeStartDate], [EmployeeEndDate])
VALUES
    (1,  1, 1, '2024-11-01', NULL),
    (2,  2, 1, '2024-11-02', NULL),
    (3,  3, 1, '2024-11-03', NULL),
    (4,  4, 1, '2024-11-04', NULL),
    (5,  5, 1, '2024-11-05', NULL),
    (6,  1, 1, '2024-11-06', NULL),
    (7,  2, 1, '2024-11-07', NULL),
    (8,  3, 1, '2024-11-08', NULL),
    (9,  4, 1, '2024-11-09', NULL),
    (10, 5, 1, '2024-11-10', NULL),
    (11, 1, 1, '2024-11-11', NULL),
    (12, 2, 1, '2024-11-12', NULL),
    (13, 3, 1, '2024-11-13', NULL),
    (14, 4, 1, '2024-11-14', NULL),
    (15, 5, 1, '2024-11-15', NULL),
    (16, 1, 1, '2024-11-16', NULL),
    (17, 2, 1, '2024-11-17', NULL),
    (18, 3, 1, '2024-11-18', NULL),
    (19, 4, 1, '2024-11-19', NULL),
    (20, 5, 1, '2024-11-20', NULL);