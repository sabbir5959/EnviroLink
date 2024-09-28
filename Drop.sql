------------------------------------------------------------ DROP TABLES ---------------------------------------------------------------


DROP TABLE IF EXISTS FeedbackForCompany CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS FeedbackForUsers CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS reportToAdmin CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS WasteDetails CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS Driver CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS Company CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS BuyingRequest CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS SellingRequest CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS Users CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS Admin CASCADE CONSTRAINTS;
DROP TABLE IF EXISTS Waste CASCADE CONSTRAINTS;




------------------------------------------------------------ DROP SEQUENCES ---------------------------------------------------------------


DROP SEQUENCE IF EXISTS user_id_seq;
DROP SEQUENCE IF EXISTS admin_id_seq;
DROP SEQUENCE IF EXISTS sell_req_id_seq;
DROP SEQUENCE IF EXISTS buy_req_id_seq;
DROP SEQUENCE IF EXISTS company_id_seq;
DROP SEQUENCE IF EXISTS driver_id_seq;
DROP SEQUENCE IF EXISTS waste_id_seq;
DROP SEQUENCE IF EXISTS u_feedback_id_seq;
DROP SEQUENCE IF EXISTS c_feedback_id_seq;
DROP SEQUENCE IF EXISTS report_id_seq;
DROP SEQUENCE IF EXISTS waste_details_id_seq;










------------------------------------------------------------ DROP VIEWS ---------------------------------------------------------------


DROP VIEW IF EXISTS BuyingRequestHistoryView;
DROP VIEW IF EXISTS SellingRequestHistoryView;





------------------------------------------------------------ DROP TRIGGERS ---------------------------------------------------------------


DROP TRIGGER IF EXISTS user_id_trigger;
DROP TRIGGER IF EXISTS sell_req_id_trigger;
DROP TRIGGER IF EXISTS buy_req_id_trigger;
DROP TRIGGER IF EXISTS company_id_trigger;
DROP TRIGGER IF EXISTS driver_id_trigger;
DROP TRIGGER IF EXISTS u_feedback_id_trigger;
DROP TRIGGER IF EXISTS c_feedback_id_trigger;
DROP TRIGGER IF EXISTS report_id_trigger;
DROP TRIGGER IF EXISTS waste_details_id_trigger;
DROP TRIGGER IF EXISTS update_selling_request_status;






------------------------------------------------------------ DROP PROCEDURES ---------------------------------------------------------------


DROP PROCEDURE IF EXISTS register_user;






------------------------------------------------------------ DROP FUNCTIONS ---------------------------------------------------------------


DROP FUNCTION IF EXISTS check_phone;
DROP FUNCTION IF EXISTS check_email;





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
