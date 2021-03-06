/* Script to load test data into activity table */

BEGIN TRAN

DELETE FROM ActivityProfile
DELETE FROM [Profile] WHERE NickName <> 'Dimitri'
DELETE FROM Activity

-- insert dummy users
INSERT INTO [Profile] VALUES ('Esme', '31', 'Female', 'Hendrik-Ido-Ambacht', 'edd50aa881e34fb29f142a38cabff9ea')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'edenbraven@yahoo.com', 'edenbraven@yahoo.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Remy', '28', 'Male', 'Oud-Beijerland', '478c0c0f210c46ca9d62e34b2f111c34')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'remytoonen@gmail.com', 'remytoonen@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Jack', '31', 'Female', 'Noordwijk', '49443fdfb3dd4d3a8515e581c27e4be5')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'vinkjack@yahoo.com', 'vinkjack@yahoo.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Sebastiaan', '30', 'Female', 'Rotterdam', '4def813b0eb84aa8b0be65eed1732bf0')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'sebastiaan@gmail.com', 'sebastiaan@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('David', '35', 'Female', 'Rotterdam', 'a5d1951b693d4c999271e6c4dcc48d4c')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'davidblom@gmail.com', 'davidblom@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)


DECLARE @Owner_Id INT, @User2_Id INT, @User3_Id INT, @User4_Id INT, @User5_Id INT
SELECT @Owner_Id = [Id] FROM [Profile] WHERE NickName = 'Dimitri'
SELECT @User2_Id = [Id] FROM [Profile] WHERE NickName = 'Remy'
SELECT @User3_Id = [Id] FROM [Profile] WHERE NickName = 'Jack'
SELECT @User4_Id = [Id] FROM [Profile] WHERE NickName = 'Sebastiaan'
SELECT @User5_Id = [Id] FROM [Profile] WHERE NickName = 'David'


-- insert dummy activities

DECLARE @InsertScope INT
-- ACTIVITY 1
DECLARE @Category_Id INT
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'sport'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(d, 8, GETDATE()), 'Rotterdam', 4, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit.')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User3_Id)


-- ACTIVITY 2
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'dating'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(d, 2, DATEDIFF(d, 0, GETDATE())) + '10:00', 'Hendrik-ido-ambacht', 10, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User3_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 3
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'food'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(m, 1, DATEDIFF(d, 0, GETDATE())) + '10:00', 'Amsterdam', 6, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User3_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 4
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'entertainment'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(m, 4, DATEDIFF(d, 0, GETDATE())) + '14:00', 'Sliedrecht', 4, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)


-- ACTIVITY 5
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'party'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(m, 3, DATEDIFF(d, 0, GETDATE())) + '14:00', 'Rotterdam', 5, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 6
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'hiking'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(m, 3, DATEDIFF(d, 0, GETDATE())) + '19:00', 'Rotterdam', 5, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 7
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'travelling'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(m, 1, DATEDIFF(d, 0, GETDATE())) + '19:00', 'Rotterdam', 10, @Category_Id, @Owner_Id, 'orem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 8
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'shopping'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(d, 65, DATEDIFF(d, 0, GETDATE())) + '22:00', 'Hendrik-ido-ambacht', 7, @Category_Id, @Owner_Id, 'ultricies nec, pellentesque eu, pretium')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User3_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


-- ACTIVITY 9
SELECT @Category_Id = [Id] FROM [Category] WHERE Code = 'museum'

INSERT INTO Activity ([Date], Location, MaxParticipants, Category_Id, Profile_Id, ContentText)
VALUES (DATEADD(d, 45, DATEDIFF(d, 0, GETDATE())) + '22:00', 'Sliedrecht', 5, @Category_Id, @Owner_Id, 'Come and join us!')

SET @InsertScope = SCOPE_IDENTITY()

INSERT INTO ActivityProfile VALUES (@InsertScope, @Owner_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User2_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User3_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User4_Id)
INSERT INTO ActivityProfile VALUES (@InsertScope, @User5_Id)


COMMIT TRAN