---------------------------------------------------------- DROP TABLES -------------------------------------------------------

-- Drop tables
DROP TABLE FeedbackForUser;
DROP TABLE Transport;
DROP TABLE Transaction;
DROP TABLE CanDo2;
DROP TABLE CanDo1;
DROP TABLE Sales;
DROP TABLE Buys;
DROP TABLE BuyingRequest;
DROP TABLE Type2;
DROP TABLE Type1;
DROP TABLE Action;
DROP TABLE Location;
DROP TABLE Driver;
DROP TABLE Company;
DROP TABLE Waste;
DROP TABLE Admin;
DROP TABLE SellingRequest;
DROP TABLE Users;
DROP TABLE WasteDetails;






---------------------------------------------------------- SELECT TABLES -------------------------------------------------------


SELECT * FROM TAB;


SELECT * FROM USERS;
SELECT * FROM ADMIN;
SELECT * FROM DRIVER;
SELECT * FROM COMPANY;
SELECT * FROM WASTE;
SELECT * FROM TRANSACTION;
SELECT * FROM TRANSPORT;
SELECT * FROM SELLINGREQUEST;
SELECT * FROM BUYINGREQUEST;
SELECT * FROM BUYS;
SELECT * FROM SALES;
SELECT * FROM TYPE2;
SELECT * FROM TYPE1;
SELECT * FROM CANDO2;
SELECT * FROM CANDO1;
SELECT * FROM ACTION;
SELECT * FROM LOCATION;
SELECT * FROM FEEDBACKFORUSER;
SELECT * FROM REPORTTOADMIN;



TRUNCATE TABLE SELLINGREQUEST;
TRUNCATE TABLE FeedbackForUser;
TRUNCATE TABLE WASTEDETAILS;
TRUNCATE TABLE BUYINGREQUEST;
TRUNCATE TABLE REPORTTOADMIN;




---------------------------------------------------------- DELETE TABLES -------------------------------------------------------


DELETE FROM ADMIN WHERE admin_id = 202214055;














---------------------------------------------------------- DBMS CLASS -------------------------------------------------------

-- POINT 1
SET SERVEROUTPUT ON
BEGIN
dbms_output.put_line('Hello World');
END;


-- POINT 2

DECLARE
    v_name VARCHAR2(100);
BEGIN
    v_name := 'SABBIR';
    dbms_output.put_line(v_name);
END;


-- POINT 3

DECLARE
    SALARY EMPLOYEE.SALARY%TYPE;
BEGIN
    SALARY := 50000;
    dbms_output.put_line(SALARY);
END;


-- POINT 4 --------NESSTED BLOCK

DECLARE
    msg1 VARCHAR2(100) := 'Sabbir ';
BEGIN
    DECLARE
        msg2 VARCHAR2(100) := msg1 || 'Hossain';
    BEGIN
        dbms_output.put_line(msg2);
    END;
END;


-- DECLARE A VARIABLE

DECLARE
    v_name VARCHAR2(100);
    v_city VARCHAR2(100);
BEGIN
    SELECT cust_name, cust_city INTO v_name, v_city FROM CUSTOMER WHERE cust_id = 'C00000000001';
    dbms_output.put_line(v_name || ' ' || v_city);
    dbms_output.put_line(v_name);
END;


-- IN AND OUT MODE

CREATE PROCEDURE FINDMIN(X IN NUMBER, Y IN NUMBER, Z OUT NUMBER)
AS
BEGIN
    IF X < Y THEN
        Z := X;
    ELSE
        Z := Y;
    END IF;
END;


-- PRACTICE

create or REPLACE function get_city  (customerid in varchar2) return varchar2
as
    v_city varchar2(100);
BEGIN
    select cust_city into v_city from customer
    where cust_id = customerid;
    return v_city;
END;










INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('kawsar47', 'kawsar@gmail.com', 'Downtown', 'Road 45', 'House 21', '01234567890');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('diner41', 'diner@gmail.com', 'Uptown', 'Road 10', 'House 5', '01234567890');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('samia19', 'samia@gmail.com', 'East Side', 'Road 18', 'House 12A', '01234567890');








---------------------------------------------------------- INSERT DATA IN TABLES -------------------------------------------------------



-- Insert data into Users table

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Farzana', 'samia19', '01914347042', 'farzana@gmail.com', 'Matikata', 'O-5', 'A-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Diner', 'diner41', '01234567890', 'diner@gmail.com', 'Shagufta', 'L-5', 'B-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Kawsar', 'kawsar47', '01234567890', 'kawsar@gmail.com', 'Balughat', 'N-5', 'C-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house) 
VALUES ('Sabbir', '55', '01798155814', 'sabbir1808769@gmail.com', 'Easter Housing', 'N-5', 'J-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Shoyeb', 'shoyeb71', '01234567890', 'shoyeb@gmail.com', 'Uttara', 'J-5', 'D-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Ramisa', 'ramisa81', '01234567890', 'ramisa@gmail.com', 'Mirpur DOHS', 'N-5', 'E-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Samara', 'samara99', '01234567890', 'samara@gmail.com', 'Farmgate', 'N-5', 'F-15');

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, u_area, u_road, u_house)
VALUES ('Sadia', 'sadia111', '01234567890', 'sadia@gmail.com', 'Balughat', 'J-5', 'G-15');









-- Insert data into Admin table

INSERT into ADMIN (admin_id, admin_name, a_email, a_password, a_phone_no) VALUES (202214055, 'Sabbir', 'sabbir1808769@gmail.com', '55', 01798155814);






-- Insert data into Driver table
INSERT INTO DRIVER (
    D_NAME,
    TRUCK_NO,
    LICENCE_NO,
    D_PHONE
) VALUES (
    'Kawsar',
    'Dhaka Metro 19',
    'Dhaka 19',
    '01234567890'
);

INSERT INTO DRIVER (
    D_NAME,
    TRUCK_NO,
    LICENCE_NO,
    D_PHONE
) VALUES (
    'Diner',
    'Dhaka Metro 41',
    'Dhaka 41',
    '01234567890'
);

INSERT INTO DRIVER (
    D_NAME,
    TRUCK_NO,
    LICENCE_NO,
    D_PHONE
) VALUES (
    'Shoyeb',
    'Dhaka Metro 71',
    'Dhaka 71',
    '01234567890'
);











-- Insert data into waste table
    INSERT INTO WASTE (waste_id, type, weight, price) VALUES (20202024, 'Plastic', 1, 45);
    INSERT INTO WASTE (waste_id, type, weight, price) VALUES (20212025, 'Paper', 1, 40);
    INSERT INTO WASTE (waste_id, type, weight, price) VALUES (20222026, 'Metal', 1, 80);



INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (20202024, 26910, 598);

INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (20212025, 49760, 1244);

INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (20222026, 63920, 799);



SELECT sellingrequest.sell_req_date, users.u_name, waste.type, sellingrequest.Quantity, sellingrequest.price
FROM sellingrequest, waste, users 
where users.user_id = sellingrequest.user_id 
and waste.waste_id = sellingrequest.waste_id 
AND SELLINGREQUEST.SELL_REQ_DATE = TO_DATE('2024-09-14', 'YYYY-MM-DD');  2024-09-14










