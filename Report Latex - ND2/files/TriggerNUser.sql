CREATE trigger check_normal_user_info on NORMAL_USER
after insert, update
as
begin
	declare @fullname as varchar(255)
	set @fullname = (select FULLNAME from inserted)
	if @fullname like '%[0-9]%' 
	begin
		print 'Invalid name'
		DELETE FROM ACCOUNT WHERE ID = (SELECT ID FROM inserted);
		rollback
	end
	declare @bdate as date
	set @bdate = (select BIRTHDATE from inserted)
	if DATEDIFF(day,@bdate,getdate()) < 0
	begin
		print 'Invalid birthdate'
		DELETE FROM ACCOUNT WHERE ID = (SELECT ID FROM inserted);
		rollback
	end
end;
