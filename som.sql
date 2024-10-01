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




DELETE FROM SELLINGREQUEST WHERE sell_req_id = 'SR1001' AND status = 'pending';
DELETE FROM BuyingRequest WHERE buying_req_id = 'BR1001' AND status = 'pending';

SELECT c.company_id, f.C_description, f.C_driver_name, TO_CHAR(f.C_feedback_date, 'YYYY-MM-DD') as "Date"
      FROM FeedbackForCompany f
      JOIN BuyingRequest br ON f.C_request_id = br.buying_req_id
      JOIN Company c ON br.company_id = c.company_id
      WHERE c.company_id IN ('C1001');



---------------------------------------------------------- INSERT DATA IN TABLES -------------------------------------------------------



-- Insert data into Users table

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Diner', 'diner123', '01736624790', 'diner@gmail.com', AddressType('Mirpur-12', '3', '18'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Labib', 'labib123', '01550522756', 'labib@gmail.com', AddressType('Mirpur-11', '4', '16'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Mahin', 'mahin123', '01550522757', 'mahin@gmail.com', AddressType('Mirpur-10', '1', '4'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Farhan', 'farhan123', '01550522758', 'farhan@gmail.com', AddressType('Mirpur-6', '5', '12'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Sakib', 'sakib123', '01550522766', 'sakib@gmail.com', AddressType('Mirpur-2', '1', '6'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Assaf', 'assaf123', '01550522791', 'assaf@gmail.com', AddressType('Mirpur-10', '2', '6'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Robin', 'robin123', '01550522789', 'robin@gmail.com', AddressType('Mirpur-11', '3', '7'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Ariful', 'ariful', '01550522767', 'ariful@gmail.com', AddressType('Mirpur-7', '4', '2'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Safayet', 'safayet123', '01550522772', 'safayet@gmail.com', AddressType('Mirpur-2', '12', '2'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Raihan', 'raihan123', '01550522784', 'raihan@gmail.com', AddressType('Mirpur-1', '12', '34'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Samiul', 'samiul123', '01550522773', 'samiul@gmail.com', AddressType('Mirpur-10', '14', '4'));

INSERT INTO Users (u_name, u_password, u_phone_no, u_email, address)
VALUES ('Mushfiq', 'mushfiq123', '01550522782', 'mushfiq@gmail.com', AddressType('Mirpur-10', '6', '12'));




-- Insert data into Company table

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'corp1001@gmail.com', 'Mirpur 12', 'Block 4', '21/4', '01334567890');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', '3mcompany@gmail.com', 'Banani', 'Block 3', '45/6', '01913253223');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'abbottlaboratories@gmail.com', 'Dhanmondi', 'Block 10', '165/4', '01534765444');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'acternacorp@gmail.com', 'Mirpur 1', 'Block C', '55/5', '01726374883');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'agro@gmail.com', 'Banani', 'Block D', '27/1', '01987676533');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'aflak@gmail.com', 'Uttara', 'Block J', '67/6', '017654583921');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'agway@gmail.com', 'Gazipur', 'Block 8', '15/4', '01856764523');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'alaska@gmail.com', 'Tongi', 'Block F', '29/7', '019283455432');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'alcoa@gmail.com', 'Mirpur 10', 'Block D', '17/4', '01378675645');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'amerada@gmail.com', 'Mirpur 11', 'Block E', '25/7', '01912564311');

INSERT INTO Company (c_password, c_email, c_area, c_road, c_house, c_phone)
VALUES ('1234', 'banknorth@gmail.com', 'Mirpur 7', 'Block 10', '87/2', '01527374854');


-- Insert data into Driver table






truncate table USERS;



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
    'Dhaka Metro-B 19-1234',
    'BD-123456789019',
    '01234567890'
);

INSERT INTO DRIVER (
    D_NAME,
    TRUCK_NO,
    LICENCE_NO,
    D_PHONE
) VALUES (
    'Diner',
    'Dhaka Metro-C 41-5678',
    'BD-123456789041',
    '01234567890'
);

INSERT INTO DRIVER (
    D_NAME,
    TRUCK_NO,
    LICENCE_NO,
    D_PHONE
) VALUES (
    'Shoyeb',
    'Dhaka Metro-D 71-9012',
    'BD-123456789071',
    '01234567890'
);


TRUNCATE TABLE DRIVER;
TRUNCATE TABLE COMPANY;
TRUNCATE TABLE USERS;



-- Insert data into waste table

INSERT INTO WASTE (waste_id, type, weight, price) VALUES (202024, 'Plastic', 1, 45);
INSERT INTO WASTE (waste_id, type, weight, price) VALUES (202125, 'Paper', 1, 40);
INSERT INTO WASTE (waste_id, type, weight, price) VALUES (202226, 'Metal', 1, 80);



INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (202024, 26910, 598);

INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (202125, 49760, 1244);

INSERT INTO WasteDetails (waste_id, price, quantity)
VALUES (202226, 63920, 799);



SELECT sellingrequest.sell_req_date, users.u_name, waste.type, sellingrequest.Quantity, sellingrequest.price
FROM sellingrequest, waste, users 
where users.user_id = sellingrequest.user_id 
and waste.waste_id = sellingrequest.waste_id 
AND SELLINGREQUEST.SELL_REQ_DATE = TO_DATE('2024-09-14', 'YYYY-MM-DD');  2024-09-14





