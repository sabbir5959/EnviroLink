
CREATE SEQUENCE user_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE admin_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE sell_req_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE buy_req_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE company_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE driver_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE waste_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE u_feedback_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE c_feedback_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE report_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE SEQUENCE waste_details_id_seq
START WITH 1001
INCREMENT BY 1
NOCACHE
NOCYCLE;


CREATE TABLE Users (
    user_id VARCHAR2(20) NOT NULL,
    u_name VARCHAR2(100) NOT NULL,
    u_password VARCHAR2(100) NOT NULL,
    u_phone_no VARCHAR2(20) NOT NULL,
    u_email VARCHAR2(100) NOT NULL,
    u_area VARCHAR2(100) NOT NULL,
    u_road VARCHAR2(100) NOT NULL,
    u_house VARCHAR2(100) NOT NULL,
    PRIMARY KEY (user_id)
);


CREATE OR REPLACE TRIGGER user_id_trigger
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    :NEW.user_id := 'U' || TO_CHAR(user_id_seq.NEXTVAL);
END;




CREATE TABLE Admin (
    admin_id NUMBER(20) NOT NULL,
    admin_name VARCHAR2(100) NOT NULL,
    a_email VARCHAR2(100) NOT NULL,
    a_password VARCHAR2(100) NOT NULL,
    a_phone_no VARCHAR2(20) NOT NULL,
    PRIMARY KEY (admin_id)
);


CREATE TABLE SellingRequest (
    sell_req_id VARCHAR2(20) NOT NULL,
    user_id VARCHAR2(20),
    price NUMBER(20),
    waste_id NUMBER(20),
    quantity NUMBER(20),
    status VARCHAR2(100),
    sell_req_date DATE,
    PRIMARY KEY (sell_req_id)
);


CREATE OR REPLACE TRIGGER sell_req_id_trigger
BEFORE INSERT ON SellingRequest
FOR EACH ROW
BEGIN
    :NEW.sell_req_id := 'SR' || TO_CHAR(sell_req_id_seq.NEXTVAL);
END;



CREATE TABLE BuyingRequest (
    buying_req_id VARCHAR2(20) NOT NULL,
    quantity NUMBER(20),
    company_id VARCHAR2(20),
    waste_id NUMBER(20),
    amount NUMBER(20),
    buy_req_date DATE,
    status VARCHAR2(100),
    PRIMARY KEY (buying_req_id)
);


CREATE OR REPLACE TRIGGER buy_req_id_trigger
BEFORE INSERT ON BuyingRequest
FOR EACH ROW
BEGIN
    :NEW.buying_req_id := 'BR' || TO_CHAR(buy_req_id_seq.NEXTVAL);
END;



CREATE TABLE Company (
    company_id VARCHAR2(20) NOT NULL,
    c_password VARCHAR2(100) NOT NULL,
    c_email VARCHAR2(100) NOT NULL,
    c_area VARCHAR2(100) NOT NULL,
    c_road VARCHAR2(100) NOT NULL,
    c_house VARCHAR2(100) NOT NULL,
    c_phone VARCHAR2(20) NOT NULL,
    PRIMARY KEY (company_id)
);


CREATE OR REPLACE TRIGGER company_id_trigger
BEFORE INSERT ON Company
FOR EACH ROW
BEGIN
    :NEW.company_id := 'C' || TO_CHAR(company_id_seq.NEXTVAL);
END;



CREATE TABLE Driver (
    driver_id VARCHAR2(20) NOT NULL,
    d_name VARCHAR2(100) NOT NULL,
    truck_no VARCHAR2(100) NOT NULL,
    licence_no VARCHAR2(100) NOT NULL,
    d_phone VARCHAR2(20) NOT NULL,
    PRIMARY KEY (driver_id)
);


CREATE OR REPLACE TRIGGER driver_id_trigger
BEFORE INSERT ON Driver
FOR EACH ROW
BEGIN
    :NEW.driver_id := 'D' || TO_CHAR(driver_id_seq.NEXTVAL);
END;



CREATE TABLE Waste (
    waste_id NUMBER(20) NOT NULL,
    type VARCHAR2(100),
    weight NUMBER(20),
    price NUMBER(20),
    PRIMARY KEY (waste_id)
);


CREATE TABLE FeedbackForUsers (
    U_feedback_id VARCHAR2(20) NOT NULL,
    U_request_id VARCHAR2(20) NOT NULL,
    U_feedback_date DATE,
    U_driver_id VARCHAR2(20),
    U_driver_name VARCHAR2(100),
    U_description VARCHAR2(500),
    PRIMARY KEY (U_feedback_id)
);


CREATE OR REPLACE TRIGGER u_feedback_id_trigger
BEFORE INSERT ON FeedbackForUsers
FOR EACH ROW
BEGIN
    :NEW.U_feedback_id := 'UF' || TO_CHAR(u_feedback_id_seq.NEXTVAL);
END;




CREATE TABLE FeedbackForCompany (
    C_feedback_id VARCHAR2(20) NOT NULL,
    C_request_id VARCHAR2(20) NOT NULL,
    C_feedback_date DATE,
    C_driver_id VARCHAR2(20),
    C_driver_name VARCHAR2(100),
    C_description VARCHAR2(500),
    PRIMARY KEY (C_feedback_id)
);


CREATE OR REPLACE TRIGGER c_feedback_id_trigger
BEFORE INSERT ON FeedbackForCompany
FOR EACH ROW
BEGIN
    :NEW.C_feedback_id := 'CF' || TO_CHAR(c_feedback_id_seq.NEXTVAL);
END;




CREATE TABLE reportToAdmin (
    report_id VARCHAR2(20) NOT NULL,
    driver_id VARCHAR2(20) NOT NULL,
    user_id VARCHAR2(20),
    waste_type VARCHAR2(100) NOT NULL,
    quantity NUMBER(20) NOT NULL,
    price NUMBER(20) NOT NULL,
    report_date DATE NOT NULL,
    company_id VARCHAR2(20),
    PRIMARY KEY (report_id)
);


CREATE OR REPLACE TRIGGER report_id_trigger
BEFORE INSERT ON reportToAdmin
FOR EACH ROW
BEGIN
    :NEW.report_id := 'RA' || TO_CHAR(report_id_seq.NEXTVAL);
END;




CREATE TABLE WasteDetails (
    waste_details_id VARCHAR2(20) NOT NULL,
    waste_id NUMBER(20) NOT NULL,
    price NUMBER(20),
    quantity NUMBER(20),
    PRIMARY KEY (waste_details_id)
);


CREATE OR REPLACE TRIGGER waste_details_id_trigger
BEFORE INSERT ON WasteDetails
FOR EACH ROW
BEGIN
    :NEW.waste_details_id := 'WD' || TO_CHAR(waste_details_id_seq.NEXTVAL);
END;




ALTER TABLE SellingRequest
ADD CONSTRAINT fk_sellingrequest_user
FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE SellingRequest
ADD CONSTRAINT fk_sellingrequest_waste
FOREIGN KEY (waste_id) REFERENCES Waste(waste_id);


ALTER TABLE BuyingRequest
ADD CONSTRAINT fk_buyingrequest_company
FOREIGN KEY (company_id) REFERENCES Company(company_id);

ALTER TABLE BuyingRequest
ADD CONSTRAINT fk_buyingrequest_waste
FOREIGN KEY (waste_id) REFERENCES Waste(waste_id);


ALTER TABLE FeedbackForUsers
ADD CONSTRAINT fk_feedbackforusers_request
FOREIGN KEY (U_request_id) REFERENCES SellingRequest(sell_req_id);

ALTER TABLE FeedbackForUsers
ADD CONSTRAINT fk_feedbackforusers_driver
FOREIGN KEY (U_driver_id) REFERENCES Driver(driver_id);


ALTER TABLE FeedbackForCompany
ADD CONSTRAINT fk_feedbackforcompany_request
FOREIGN KEY (C_request_id) REFERENCES BuyingRequest(buying_req_id);

ALTER TABLE FeedbackForCompany
ADD CONSTRAINT fk_feedbackforcompany_driver
FOREIGN KEY (C_driver_id) REFERENCES Driver(driver_id);


ALTER TABLE reportToAdmin
ADD CONSTRAINT fk_reporttoadmin_driver
FOREIGN KEY (driver_id) REFERENCES Driver(driver_id);

ALTER TABLE reportToAdmin
ADD CONSTRAINT fk_reporttoadmin_user
FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE reportToAdmin
ADD CONSTRAINT fk_reporttoadmin_company
FOREIGN KEY (company_id) REFERENCES Company(company_id);






-- VIEW 

CREATE OR REPLACE VIEW BuyingRequestHistoryView AS
SELECT 
    br.buying_req_id AS "Request Id",
    br.status AS "Status", 
    br.buy_req_date AS "Date", 
    c.c_email AS "Company email",
    d.d_name AS "Driver name",
    w.type AS "Waste type", 
    br.quantity AS "Waste amount"
FROM BuyingRequest br
JOIN Company c ON br.company_id = c.company_id
JOIN Waste w ON br.waste_id = w.waste_id
LEFT JOIN FeedbackForCompany f ON br.buying_req_id = f.c_request_id
LEFT JOIN Driver d ON f.c_driver_id = d.driver_id 
WHERE br.status IN ('completed');


CREATE OR REPLACE VIEW SellingRequestHistoryView AS
SELECT 
    sr.sell_req_id,
    sr.status, 
    sr.sell_req_date AS request_date, 
    u.u_name AS user_name,
    d.d_name AS driver_name,
    w.TYPE AS waste_type, 
    sr.quantity,
    f.u_feedback_date,
    f.u_description
FROM SellingRequest sr
JOIN Users u ON sr.user_id = u.user_id
JOIN Waste w ON sr.waste_id = w.WASTE_ID
LEFT JOIN FeedbackForUsers f ON sr.sell_req_id = f.u_request_id
LEFT JOIN Driver d ON f.u_driver_id = d.driver_id
WHERE sr.status IN ('completed');


-- TRIGGER

CREATE OR REPLACE TRIGGER update_selling_request_status
AFTER INSERT ON reportToAdmin
FOR EACH ROW
BEGIN
    UPDATE SellingRequest
    SET status = 'completed'
    WHERE user_id = :NEW.user_id; 
END;
