CREATE PROCEDURE findCompanyDetails(@id AS int)
AS
BEGIN
	SELECT *
	FROM COMPANY
	WHERE ID = @id
END