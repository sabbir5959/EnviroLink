
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

DROP TRIGGER user_id_trigger;
DROP TRIGGER sell_req_id_trigger;
DROP TRIGGER buy_req_id_trigger;
DROP TRIGGER company_id_trigger;
DROP TRIGGER driver_id_trigger;
DROP TRIGGER u_feedback_id_trigger;
DROP TRIGGER c_feedback_id_trigger;
DROP TRIGGER report_id_trigger;
DROP TRIGGER waste_details_id_trigger;
DROP TRIGGER update_selling_request_status;


DROP VIEW BuyingRequestHistoryView;
DROP VIEW SellingRequestHistoryView;

DROP TABLE FeedbackForUsers CASCADE CONSTRAINTS;
DROP TABLE FeedbackForCompany CASCADE CONSTRAINTS;
DROP TABLE reportToAdmin CASCADE CONSTRAINTS;
DROP TABLE SellingRequest CASCADE CONSTRAINTS;
DROP TABLE BuyingRequest CASCADE CONSTRAINTS;
DROP TABLE WasteDetails CASCADE CONSTRAINTS;
DROP TABLE Waste CASCADE CONSTRAINTS;
DROP TABLE Driver CASCADE CONSTRAINTS;
DROP TABLE Company CASCADE CONSTRAINTS;
DROP TABLE Admin CASCADE CONSTRAINTS;
DROP TABLE Users CASCADE CONSTRAINTS;





