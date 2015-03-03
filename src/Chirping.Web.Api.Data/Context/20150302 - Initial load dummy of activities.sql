/* Script to load test data into activity table */

BEGIN TRAN

-- insert dummy users
INSERT INTO [Profile] VALUES ('Esme', '31', 'Female', 'Hendrik-Ido-Ambacht', 'Male', '/images/profile.jpg')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'edenbraven@yahoo.com', 'edenbraven@yahoo.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Remy', '28', 'Male', 'Oud-Beijerland', 'Male', '/images/profile2.jpg')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'remytoonen@gmail.com', 'remytoonen@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Jack', '31', 'Female', 'Noordwijk', 'Male', '/images/profile.jpg')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'vinkjack@yahoo.com', 'vinkjack@yahoo.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('Sebastiaan', '30', 'Female', 'Rotterdam', 'Male', '/images/profile.jpg')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'sebastiaan@gmail.com', 'sebastiaan@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)

INSERT INTO [Profile] VALUES ('David', '35', 'Female', 'Rotterdam', 'Male', '/images/profile.jpg')
INSERT INTO [User] (Id, Email, UserName, Profile_Id, passwordHash, EmailConfirmed, TwoFactorEnabled, PhoneNumberConfirmed, LockoutEnabled, AccessFailedCount, Active) VALUES (NEWID(), 'davidblom@gmail.com', 'davidblom@gmail.com', SCOPE_IDENTITY(), 'ADeOKyUculk2eUvhIS+HeNcWAbH0l2wFvft533+IuJ+jBvapo1FzgRgQ/onUxtivDg==', 0, 0, 0, 0, 0, 1)


-- insert dummy activities

INSERT INTO Activity (ContentText, MaxParticipants, CategoryId, OwnerId

select * from [Profile]
select * from [User]

ROLLBACK TRAN