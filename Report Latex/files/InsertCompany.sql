CREATE PROCEDURE InsertCompany (
@address VARCHAR(255),
@website VARCHAR(255),
@name VARCHAR(255),
@business_field VARCHAR(255),
@business_type VARCHAR(255),
@logo VARCHAR(255),
@phone int,
@id_account INT
)
AS
BEGIN
	declare @id as int
	set @id = (select max(ID) from COMPANY ) + 1
	if (@id is null) set @id = 1
	declare @exprired_date as DATE
	SET @exprired_date = GETDATE();
	BEGIN Try
		INSERT INTO COMPANY (ID, ADDRESS, WEBSITE, NAME, BUSINESS_FIELD, BUSINESS_TYPE, EXPIRED_DATE, REMAINING, LOGO, PHONENUMBER, ID_Account) 
		VALUES (@id, @address, @website, @name, @business_field, @business_type, @exprired_date, 0, @logo, @phone, @id_account);
		RETURN 1;
	END Try
	BEGIN Catch
		RETURN 0;
	END Catch
END