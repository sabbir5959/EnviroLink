------------------------------------------------------------ DROP TABLES ---------------------------------------------------------------


DROP TABLE FeedbackForCompany CASCADE CONSTRAINTS;
DROP TABLE FeedbackForUsers CASCADE CONSTRAINTS;
DROP TABLE reportToAdmin CASCADE CONSTRAINTS;
DROP TABLE WasteDetails CASCADE CONSTRAINTS;
DROP TABLE Driver CASCADE CONSTRAINTS;
DROP TABLE Company CASCADE CONSTRAINTS;
DROP TABLE BuyingRequest CASCADE CONSTRAINTS;
DROP TABLE SellingRequest CASCADE CONSTRAINTS;
DROP TABLE Users CASCADE CONSTRAINTS;
DROP TABLE Admin CASCADE CONSTRAINTS;
DROP TABLE Waste CASCADE CONSTRAINTS;




------------------------------------------------------------ DROP SEQUENCES ---------------------------------------------------------------


DROP SEQUENCE user_id_seq;
DROP SEQUENCE admin_id_seq;
DROP SEQUENCE sell_req_id_seq;
DROP SEQUENCE buy_req_id_seq;
DROP SEQUENCE company_id_seq;
DROP SEQUENCE driver_id_seq;
DROP SEQUENCE waste_id_seq;
DROP SEQUENCE u_feedback_id_seq;
DROP SEQUENCE c_feedback_id_seq;
DROP SEQUENCE report_id_seq;
DROP SEQUENCE waste_details_id_seq;











------------------------------------------------------------ DROP VIEWS ---------------------------------------------------------------


DROP VIEW BuyingRequestHistoryView;
DROP VIEW SellingRequestHistoryView;





------------------------------------------------------------ DROP TRIGGERS ---------------------------------------------------------------



-- Drop user_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER user_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop sell_req_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER sell_req_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop buy_req_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER buy_req_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop company_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER company_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop driver_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER driver_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop u_feedback_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER u_feedback_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop c_feedback_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER c_feedback_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop report_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER report_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop waste_details_id_trigger
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER waste_details_id_trigger';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/

-- Drop update_selling_request_status
BEGIN
  EXECUTE IMMEDIATE 'DROP TRIGGER update_selling_request_status';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -4080 THEN
      RAISE;
    END IF;
END;
/





------------------------------------------------------------ DROP PROCEDURES ---------------------------------------------------------------


DROP PROCEDURE register_user;






------------------------------------------------------------ DROP FUNCTIONS ---------------------------------------------------------------


DROP FUNCTION check_phone;
DROP FUNCTION check_email;





------------------------------------------------------------ TRUNCATE ---------------------------------------------------------------

TRUNCATE TABLE Users;
TRUNCATE TABLE Admin;
TRUNCATE TABLE SellingRequest;
TRUNCATE TABLE BuyingRequest;
TRUNCATE TABLE Company;
TRUNCATE TABLE Driver;
TRUNCATE TABLE Waste;
TRUNCATE TABLE FeedbackForUsers;
TRUNCATE TABLE FeedbackForCompany;
TRUNCATE TABLE reportToAdmin;
TRUNCATE TABLE WasteDetails;
