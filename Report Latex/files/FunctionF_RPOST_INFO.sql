create function F_RPOST_INFO(@compId int)
returns table
as
return (
	select POST.TITLE, POST.UPLOAD_TIME, RECRUIT_POST.POSTION, RECRUIT_POST.QUANTITY, RECRUIT_POST.SALARY, RECRUIT_POST.WORK_PLACE, RECRUIT_POST.REQUIREMENT, POST.ID
	from COMPANY,EMPLOYEE,RECRUIT_POST,POST
	where COMPANY.ID = @compId and EMPLOYEE.ID_COMPANY = @compId and RECRUIT_POST.ID_UPLOADER = EMPLOYEE.ID and RECRUIT_POST.ID = POST.ID
);