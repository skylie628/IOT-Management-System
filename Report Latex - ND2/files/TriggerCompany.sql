CREATE TRIGGER Check_Company_Info ON COMPANY
AFTER INSERT, UPDATE
AS
BEGIN
	declare @name as varchar(255)
	set @name = (select NAME from inserted)
	if @name like '%[0-9]%' 
		BEGIN
			print 'wrong format name'
			rollback
		END
	declare @phone as int
	set @phone = (select PHONENUMBER from inserted)
	if @phone not like %[0-9]%
		BEGIN
		print 'wrong int format'
		rollback
		END 
END