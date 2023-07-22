
CREATE PROCEDURE InsertUser
(  
@full_name VARCHAR(255),  
@username VARCHAR(255),  
@password VARCHAR(255),  
@sex CHAR(1),  
@birthdate DATE,
@level INT
)  
AS  
BEGIN  
	IF (len(@username) < 5)
		BEGIN
		PRINT ('LENGTH OF USERNAME MUST MORE THAN 5 CHARACTERS.');
		RETURN 0;
		END
	IF @username in (SELECT USERNAME FROM ACCOUNT)
		BEGIN
		PRINT ('USERNAME IS EXISTED.');
		RETURN 0;
		END
	declare @AccountID as int
	set @AccountID = (select max(ID) from ACCOUNT) + 1
	if (@AccountID is null)  set @AccountID = 1
	SET DATEFORMAT mdy;
	BEGIN Try
		INSERT INTO ACCOUNT (ID, USERNAME, PASSWORD, LEVEL) VALUES (@AccountID, @username, @password, @level);
		INSERT INTO NORMAL_USER(ID, FULLNAME, BIRTHDATE, SEX) VALUES (@AccountID, @full_name, @birthdate, @sex);
		RETURN 1;
	END Try
	BEGIN Catch
		PRINT('ERROR');
		RETURN 0;
	END Catch
END  
