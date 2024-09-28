import express from "express";
import cors from "cors";
import { connect, insert, getData, get, update } from "./database/connection.js";

const port = process.env.PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


connect();

app.get("/api", (req, res) => {
  res.status(200).send("Welcome to the backend server");
});






// ---------------------------------------------------------------------- FUNCTION LOGIN --------------------------------------------------------------------------


async function handleLogin(query, params, res) {
  try {
    const result = await getData(query, params);
    

    if (result.length) {
      console.log("Login Successful");
      res.status(200).json(result[0]);  
    } else {
      console.log("Invalid Credentials");
      res.status(401).json({ error: "Invalid Credentials" }); 
    }

  } catch (err) {
  
    if (err.code === 'ECONNREFUSED') {
      console.error("Database connection refused:", err);
      res.status(503).json({ error: "Service Unavailable. Please try again later." });  
    } else if (err.name === 'QueryError') {
      console.error("Query execution error:", err);
      res.status(500).json({ error: "Error executing the database query." });  
    } else {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal Server Error" });  
    }
  }
}


// Admin login route
app.post("/api/admin-login", (req, res) => {
  const { Email, Password } = req.body;
  console.log("Received admin login request:", { Email, Password });
  

  if (!Email || !Password) {
    console.error("Missing Email or Password");
    return res.status(400).json({ error: "Email and Password are required" });
  }
  
  const query = "SELECT * FROM ADMIN WHERE a_email = :Email AND a_password = :Password";
  const params = { Email, Password };
  
 
  handleLogin(query, params, res);
});


// User login route
app.post("/api/users", (req, res) => {
  const { Email, password } = req.body;
  console.log("Received user login request:", { Email, password });
  

  if (!Email || !password) {
    console.error("Missing Email or Password");
    return res.status(400).json({ error: "Email and Password are required" });
  }

  const query = `
    SELECT * FROM USERS 
    WHERE user_id = (SELECT user_id FROM USERS WHERE u_email = :Email) 
    AND u_password = :password
  `;
  const params = { Email, password };


  handleLogin(query, params, res);
});


// Driver login route
app.post("/api/drivers", (req, res) => {
  const { id, phone } = req.body;
  console.log("Received driver login request:", { id, phone });

  if (!id || !phone) {
    console.error("Missing ID or Phone");
    return res.status(400).json({ error: "ID and Phone are required" });
  }

  // Treat phone as a string in the query
  const query = "SELECT * FROM DRIVER WHERE driver_id = :id AND d_phone = :phone";
  const params = { id, phone: String(phone) }; // Make sure phone is a string

  handleLogin(query, params, res);
});


// Company login route
app.post("/api/company-login", (req, res) => {
  const { Email, Password } = req.body;
  console.log("Received company login request:", { Email, Password });

 
  if (!Email || !Password) {
    console.error("Missing Email or Password");
    return res.status(400).json({ error: "Email and Password are required" });
  }

  const query = "SELECT * FROM COMPANY WHERE c_email = :Email AND c_password = :Password";
  const params = { Email, Password };

  handleLogin(query, params, res);
});


// -----------------------------------------------------------------HISTORY--------------------------------------------------------------------------

// Endpoint to get buying requests history// Endpoint to get buying requests history
app.get('/api/admin/buying-requests/history', async (req, res) => {
  try {
      const query = `SELECT * FROM BuyingRequestHistoryView`;  // Use the DBMS view
      
      const result = await getData(query);
      console.log("Company result", result);

      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching buying requests history:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Endpoint to get selling requests history
app.get('/api/admin/selling-requests/history', async (req, res) => {
  try {
      const query = `SELECT * FROM SellingRequestHistoryView`;  // Use the DBMS view
      
      const result = await getData(query);
      console.log("User result", result);

      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching selling requests history:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});




// ---------------------------------------------------------------------- USER --------------------------------------------------------------------------


// User registration route
app.post("/api/users-reg", async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const query = "INSERT INTO USERS (u_name, u_phone_no, u_email, u_area, u_road, u_house, u_password) VALUES (:name, :phone, :email, :area, :road, :house, :password)";
    const params = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      area: body.area,
      road: body.road,
      house: body.house,
      password: body.password,
    };

    await insert(query, params);

    res.status(201).send("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});



// ---------------------------------------------------------------------- SELLING REQUESTS --------------------------------------------------------------------------

// Submit a new selling request
app.post('/api/selling-requests', async (req, res) => {
  console.log('Request Body:', req.body);
  const body = req.body;
  const userID = Number(body.userId);
  const Price = Number(body.price);
  const WasteType = body.wasteType;
  const Quantity = Number(body.quantity);
  const reqDate = body.date;
  const status = 'pending'; 

  console.log('Waste Type:', WasteType);

  try {
    // Check if the user already has an active selling request
    const checkActiveRequestQuery = "SELECT * FROM SELLINGREQUEST WHERE user_id = :userID AND status IN ('pending', 'on going process')";
    const activeRequestResult = await getData(checkActiveRequestQuery, { userID });

    if (activeRequestResult.length > 0) {
      console.log('User already has an active selling request.');
      return res.status(400).send("You already have an active selling request.");
    }

    // Get the waste ID
    const getWasteIdQuery = "SELECT WASTE_ID FROM WASTE WHERE TYPE = :WasteType";
    const wasteResult = await getData(getWasteIdQuery, { WasteType });

    console.log('Waste Result:', wasteResult);

    if (wasteResult.length === 0) {
      console.log('Invalid waste type');
      return res.status(400).send("Invalid waste type");
    }

    const wasteId = wasteResult[0][0];
    console.log('Waste ID:', wasteId);

    // Insert the new selling request
    const insertQuery = "INSERT INTO SELLINGREQUEST (user_id, price, waste_id, quantity, status, sell_req_date) VALUES (:userID, :Price, :wasteId, :Quantity, :status, TO_DATE(:reqDate, 'YYYY-MM-DD'))";
    await insert(insertQuery, { userID, Price, wasteId, Quantity, status, reqDate });

    const updatequantity = `
      UPDATE WasteDetails
      SET quantity = quantity + :Quantity
      WHERE waste_id = :wasteId
    `;
    await update(updatequantity, { Quantity, wasteId });

    res.status(201).send("Request submitted successfully");
  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Admin selling requests endpoint
app.get("/api/admin/selling-requests/pending", async (req, res) => {
  try {
    const query = "SELECT * FROM SELLINGREQUEST WHERE status IN ('pending', 'on going process')";
    const result = await get(query);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching pending selling requests:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Accept a selling request
app.put('/api/admin/selling-requests/:id/accept', async (req, res) => {
  const requestId = req.params.id;
  try {
    const query = "UPDATE SELLINGREQUEST SET status = 'on going process' WHERE sell_req_id = :requestId";
    await update(query, { requestId });
    res.status(200).send("Request accepted successfully");
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Reject a selling request
app.delete('/api/admin/selling-requests/:id/reject', async (req, res) => {
  const requestId = req.params.id;
  try {
    const query = "DELETE FROM SELLINGREQUEST WHERE sell_req_id = :requestId";
    await update(query, { requestId });
    res.status(200).send("Request rejected successfully");
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Cancel an accepted selling request
app.put('/api/admin/selling-requests/:id/cancel', async (req, res) => {
  const requestId = req.params.id;
  try {
    const query = "UPDATE SELLINGREQUEST SET status = 'pending' WHERE sell_req_id = :requestId";
    await update(query, { requestId });
    res.status(200).send("Request canceled successfully");
  } catch (error) {
    console.error("Error canceling request:", error);
    res.status(500).send("Internal Server Error");
  }
});


// ---------------------------------------------------------------------- NOTIFICATIONS --------------------------------------------------------------------------


// Handle notifications for drivers
app.post('/api/driver/notifications', async (req, res) => {
  const { driver_id } = req.body;

  console.log('Driver ID:', driver_id);

  if (!driver_id) {
      return res.status(400).json({ error: 'Driver ID is required' });
  }

  // SQL query to fetch notifications for the specific driver
  const query = `
    SELECT u.user_id, f.U_feedback_date, u.u_name AS user_name, u.u_phone_no, u.u_email, u.u_area, u.u_road, u.u_house, sr.status, w.TYPE as "Waste Type", sr.quantity, sr.price
    FROM FeedbackForUsers f
    JOIN SellingRequest sr ON f.U_request_id = sr.sell_req_id
    JOIN Users u ON sr.user_id = u.user_id
    JOIN WASTE w ON sr.waste_id = w.WASTE_ID
    WHERE f.U_driver_id = :driver_id AND sr.status <> 'completed'`;


  try {
      const result = await getData(query, { driver_id });

      console.log('Notifications:', result);

      res.status(200).send(result);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'An error occurred while fetching notifications.' });
  }
});


// ------------------------------------------------------------------HISTORY--------------------------------------------------------------------------


app.get('/api/user-history', async (req, res) => {
  const { email } = req.query;

  if (!email) {
      console.error('Email parameter is missing');
      return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
      console.log('Fetching user history for email:', email);

      const query = `
          SELECT 
              sr.status, sr.sell_req_date AS order_date, u.user_id, u.u_name AS user_name, 
              u.u_area || ', ' || u.u_road || ', ' || u.u_house AS address,
              w.TYPE AS waste_name, sr.quantity, sr.price
          FROM SellingRequest sr
          JOIN Users u ON sr.user_id = u.user_id
          JOIN WASTE w ON sr.waste_id = w.WASTE_ID
          WHERE u.u_email = :email AND sr.status = 'completed'
      `;

      const result = await getData(query, { email });
      console.log('Query result:', result);

      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching user history:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// ---------------------------------------------------------------------- WASTE --------------------------------------------------------------------------

// Endpoint to fetch waste information
app.get("/api/waste-info", async (req, res) => {
  try {
    const query = 'SELECT WASTE_ID as "Waste ID", TYPE as "Waste Type", WEIGHT as "Weight (Kg)", PRICE as "Price (TK)" FROM WASTE';
    const result = await get(query);
    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching waste information:", error);
    res.status(500).send("Internal Server Error");
  }
});


// --------------------------------------------------------------------- WASTE DETAILS --------------------------------------------------------------------------




// Fetch waste details including quantity from WasteDetails table
app.get('/api/waste-details', async (req, res) => {
  try {
    const query = `
      SELECT wd.waste_id, w.type, wd.quantity, wd.price
      FROM WasteDetails wd
      JOIN WASTE w ON wd.waste_id = w.waste_id
    `;
    const result = await get(query);
    res.status(200).send(result);
  } catch (error) {
    console.error('Error fetching waste details:', error);
    res.status(500).send('Internal Server Error');
  }
});




// ---------------------------------------------------------------------- DRIVER --------------------------------------------------------------------------




// Fetch driver names
app.get('/api/drivers-name', async (req, res) => {
  try {
    const query = "SELECT d_name FROM DRIVER";
    const result = await get(query);
    
    const drivers = result.map(row => ({ d_name: row[0] }));
    
    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Driver registration route
app.post("/api/drivers-reg", async (req, res) => {
  const body = req.body;
  console.log(body);
  const driver_id = Number(body.driverID);
  const d_name = body.name;
  const truck_no = body.truck_no;
  const licence_no = body.licence_no;
  const d_phone = Number(body.phone);

  try {
    const query = "INSERT INTO Driver (driver_id, d_name, truck_no, licence_no, d_phone) VALUES (:driverID, :name, :truck_no, :licence_no, :phone)";
    const params = {
      driverID: driver_id,
      name: d_name,
      truck_no: truck_no,
      licence_no: licence_no,
      phone: d_phone
    };

    await insert(query, params);

    res.status(201).send("Driver registration successful");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Fetch driver names
app.get('/api/drivers', async (req, res) => {
  try {
    const query = "SELECT driver_id, d_name FROM DRIVER";
    const result = await get(query);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).send("Internal Server Error");
  }
});











// ---------------------------------------------------------------------- DRIVER REPORT --------------------------------------------------------------------------

// Driver submits a report to the admin about waste collection
app.post('/api/reportToAdmin', async (req, res) => {
  const { driverId, userId, wasteType, quantity, price, ndate } = req.body;
  console.log("req body (reportToAdmin): ", req.body);

  if (!driverId || !userId || !wasteType || !quantity || !price || !ndate) {
    return res.status(400).json({ error: 'All report details are required' });
  }

  const paramsTmp = {
    driverId,
    userId,
    wasteType,
    quantity,
    price,
    ndate,
  };
  console.log(paramsTmp);

  try {
    // Insert query
    const query = `      
      INSERT INTO ReportToAdmin (driver_id, user_id, waste_type, quantity, price, report_date)
      VALUES (:driverId, :userId, :wasteType, :quantity, :price, TO_DATE(:ndate, 'YYYY-MM-DD'))
    `;

    // Define the parameters
    const params = {
      driverId,
      userId,
      wasteType,
      quantity,
      price,
      ndate,
    };
    console.log('params:', params);
    
    // Execute the insert
    const result = await insert(query, params);
    console.log('Result:', result);

    // No need to update SellingRequest status here, trigger will handle it.
    res.status(201).json({ message: "Report submitted successfully" });
    
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'An error occurred while submitting the report.' });
  }
});


// ReportForCompany
app.post('/api/reportForCompany', async (req, res) => {
  const { driverId, companyId, wasteType, quantity, price, ndate } = req.body;
  console.log("req body (reportForCompany): ", req.body);
  
  if (!driverId || !companyId || !wasteType || !quantity || !price || !ndate) {
    return res.status(400).json({ error: 'All report details are required' });
  }
  const paramsTmp = {
    driverId,
    companyId,
    wasteType,
    quantity,
    price,
    ndate,
  };
  console.log(paramsTmp)

  try {
    // Insert query
    const query = `      
      INSERT INTO ReportToAdmin (driver_id, company_id, waste_type, quantity, price, report_date)
      VALUES (:driverId, :companyId, :wasteType, :quantity, :price, TO_DATE(:ndate, 'YYYY-MM-DD'))
    `;
    // Define the parameters
    const params = {
      driverId,
      companyId,
      wasteType,
      quantity,
      price,
      ndate,
    };
    console.log(params)
    // Execute the insert and get the requestId
    const result = await insert(query, params);
    console.log('Result for company:', result);
    const getRequestIdQuery = `SELECT MAX(report_id) FROM ReportToAdmin WHERE driver_id = :driverId AND company_id = :companyId AND waste_type = :wasteType AND quantity = :quantity AND price = :price AND report_date = TO_DATE(:ndate, 'YYYY-MM-DD')`;
    const requestId = await getData(getRequestIdQuery, params);
    console.log('Request ID:', requestId);

    const updateBuyingRequestStatusQuery = "UPDATE BuyingRequest SET status = 'completed' WHERE company_id = :companyId";
    await update(updateBuyingRequestStatusQuery, { companyId });

    console.log('Report submitted successfully with requestId:', requestId);
    res.status(201).json({ message: "Report submitted successfully", requestId });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'An error occurred while submitting the report.' });
  }
});



// Update the status of the waste collection request
app.post('/api/updateStatus', async (req, res) => {
  const { userId, companyId, status } = req.body;
  
  console.log('User ID:', userId, 'Company ID:', companyId, 'Status:', status);

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    if (userId) {
      const query = "UPDATE SELLINGREQUEST SET status = :status WHERE user_id = :userId";
      await update(query, { userId, status });
    } else if (companyId) {
      const query = "UPDATE BUYINGREQUEST SET status = :status WHERE company_id = :companyId";
      await update(query, { companyId, status });
    }

    res.status(200).send("Request status updated successfully");
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: 'An error occurred while updating the request status.' });
  }
});





//--------------------------------------------------------Feedback--------------------------------------------------------------


app.post('/api/admin/selling-requests/:requestId/feedback', async (req, res) => {
  const { requestId } = req.params;
  const { date, driverName, description } = req.body;

  try {
    const getDriverIdQuery = `SELECT driver_id FROM DRIVER WHERE d_name = :driverName`;
    const driverResult = await getData(getDriverIdQuery, { driverName });

    console.log('Driver Result:', driverResult);

    if (!driverResult || driverResult.length === 0) {
        console.log('Invalid driver name');
        return res.status(400).send("Invalid driver name");
    }

    const driverId = driverResult[0][0]; // Adjusting this to access the correct index if it's an array of arrays

    console.log('Driver ID:', driverId);

    const query = `
        INSERT INTO FeedbackForUsers (U_request_id, U_feedback_date, U_driver_id, U_driver_name, U_description)
        VALUES (:requestId, TO_DATE(:feedback_date, 'YYYY-MM-DD'), :driverId, :driverName, :description)
    `;

    const params = {
        requestId: Number(requestId),
        feedback_date: date,
        driverId,
        driverName,
        description
    };

    await insert(query, params);
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error('Error inserting feedback:', error);
    res.status(500).send('Failed to submit feedback');
  }
});





//--------------------------------------------------------Notification--------------------------------------------------------------


app.get('/api/notifications', async (req, res) => {
  try {
      const user = JSON.parse(req.query.user);
      const userId = user[0]; // Access the first element as userId

      const query = `
          SELECT u.u_name, f.U_description, f.U_driver_name, TO_CHAR(f.U_feedback_date, 'YYYY-MM-DD') as "Date" 
          FROM 
          FeedbackForUsers f
          JOIN 
          SellingRequest s ON f.U_request_id = s.sell_req_id
          JOIN 
          Users u ON s.user_id = u.user_id
          WHERE u.user_id = :userId
      `;
      const result = await getData(query, [userId]);

      if (result.length > 0) {
          const notifications = result.map(row => {
              const userName = row[0];
              const description = row[1];
              const driverName = row[2];
              const date = row[3];

              const message = `Assalamualaikum ${userName},<br>${description} ${date}<br>Driver Name: ${driverName}<br>Our driver will call you within that date, please be patient during this time.`;

              return { userName, description, driverName, date, message };
          });

          res.status(200).json(notifications);
      } else {
          res.status(200).json([]);  // Return an empty array if no results are found
      }
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



// Handle company notifications
app.get('/api/CompanyNotifications', async (req, res) => {
  try {
    const companies = JSON.parse(req.query.companies);

    const query = `
      SELECT c.company_id, f.C_description, f.C_driver_name, TO_CHAR(f.C_feedback_date, 'YYYY-MM-DD') as "Date"
      FROM FeedbackForCompany f
      JOIN BuyingRequest br ON f.C_request_id = br.buying_req_id
      JOIN Company c ON br.company_id = c.company_id
      WHERE c.company_id IN (${companies.join(',')})
    `;
    const result = await getData(query);

    console.log('Company Notifications:', result);

    if (result.length > 0) {
      const notifications = result.map(row => {
        const companyId = row[0];
        const description = row[1];
        const driverName = row[2];
        const date = row[3];

        const message = `Assalamualaikum,<br>${description} ${date}<br>Driver Name: ${driverName}<br>Our driver will call you within that date, please be patient during this time.`;

        return { companyId, description, driverName, date, message };
      });

      res.status(200).json(notifications);
    } else {
      res.status(200).json([]);  // Return an empty array if no results are found
    }
  } catch (error) {
    console.error('Error fetching company notifications:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});




// ---------------------------------------------------------------------- COMPANY --------------------------------------------------------------------------

// Fetch company information
app.get('/api/companies-info', async (req, res) => {
  try {
    const query = 'SELECT * FROM COMPANY';
    const result = await get(query); // Assuming get is a function to query your database
    res.status(200).send(result);
  } catch (error) {
    console.error('Error fetching company information:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Fetch driver names
app.get('/api/drivers-info', async (req, res) => {
  try {
    const query = "SELECT * FROM DRIVER";
    const result = await get(query);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error('Error fetching driver information:', error);
    res.status(500).send('Internal Server Error');
  }
});



// ---------------------------------------------------------------------- BUYING REQUEST --------------------------------------------------------------------------
app.post('/api/buying-request', async (req, res) => {
  const { companyId, wasteType, quantity, price, date } = req.body;
  console.log('Received buying request:', req.body);

  try {
    // Check for existing pending request for this company
    const checkQuery = `
      SELECT COUNT(*) FROM BuyingRequest 
      WHERE company_id = :companyId AND status IN ('pending', 'on going process')
    `;
    const checkResult = await getData(checkQuery, { companyId });

    if (checkResult[0][0] > 0) {
      console.error('There is already an active buying request for this company.');
      return res.status(400).send('Failed to submit request. You already have an active buying request.');
    }

    // Fetch waste_id based on wasteType (case insensitive)
    const wasteIdQuery = "SELECT waste_id FROM WASTE WHERE LOWER(type) = LOWER(:wasteType)";
    console.log('Executing query:', wasteIdQuery, { wasteType });

    const wasteResult = await getData(wasteIdQuery, { wasteType: wasteType.toLowerCase() });

    if (wasteResult.length === 0) {
      console.error("No waste found for type:", wasteType);
      return res.status(400).send("Invalid waste type");
    }

    const wasteId = wasteResult[0][0];

    // Insert into BuyingRequest table using the sequence for buying_req_id
    const insertQuery = `
      INSERT INTO BuyingRequest (buying_req_id, quantity, company_id, waste_id, amount, buy_req_date, status)
      VALUES (buying_req_id_seq.NEXTVAL, :quantity, :companyId, :wasteId, :amount, TO_DATE(:buyReqDate, 'YYYY-MM-DD'), :status)
    `;
    await insert(insertQuery, { 
      quantity, 
      companyId, 
      wasteId, 
      amount: price, 
      buyReqDate: date, 
      status: 'pending' 
    });

    // Update the quantity in WasteDetails
    const updateQuantityQuery = `
      UPDATE WasteDetails
      SET quantity = quantity - :quantity
      WHERE waste_id = :wasteId
    `;
    await update(updateQuantityQuery, { quantity, wasteId });

    res.status(201).send("Buying request submitted successfully");
  } catch (error) {
    console.error("Error submitting buying request:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Admin buying requests endpoint

app.get("/api/admin/buying-requests/pending", async (req, res) => {
  try {
    const query = "SELECT * FROM BuyingRequest WHERE status IN ('pending', 'on going process')";
    const result = await get(query);
    res.status(200).send(result
    );
  } catch (error) {
    console.error("Error fetching pending buying requests:", error);
    res.status(500).send("Internal Server Error");
  }
}
);


// Accept a buying request
app.put('/api/admin/buying-requests/:id/accept', async (req, res) => {
  const { id } = req.params;

  try {
    const query = "UPDATE BuyingRequest SET status = 'on going process' WHERE buying_req_id = :id";
    await update(query, { id });

    res.status(200).send("Buying request accepted successfully");
  } catch (error) {
    console.error("Error accepting buying request:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Reject a buying request and delete it
app.delete('/api/admin/buying-requests/:id/reject', async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM BuyingRequest WHERE buying_req_id = :id";
    await update(query, { id });

    res.status(200).send("Buying request rejected and deleted successfully");
  } catch (error) {
    console.error("Error rejecting and deleting buying request:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Cancel a buying request
app.put('/api/admin/buying-requests/:id/cancel', async (req, res) => {
  const { id } = req.params;

  try {
    const query = "UPDATE BuyingRequest SET status = 'pending' WHERE buying_req_id = :id";
    await update(query, { id });

    res.status(200).send("Buying request cancelled successfully");
  } catch (error) {
    console.error("Error cancelling buying request:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Handle buying request feedback
app.post('/api/admin/buying-requests/:requestId/feedback', async (req, res) => {
  const { requestId } = req.params;
  const { date, driverName, description } = req.body;

  console.log('Request ID:', requestId);

  console.log("Feedback Body:", req.body);

  try {
    const getDriverIdQuery = `SELECT driver_id FROM DRIVER WHERE d_name = :driverName`;
    const driverResult = await getData(getDriverIdQuery, { driverName });

    console.log('Driver Result:', driverResult);

    if (!driverResult || driverResult.length === 0) {
        console.log('Invalid driver name');
        return res.status(400).send("Invalid driver name");
    }

    const driverId = driverResult[0][0]; 

    console.log('Driver ID:', driverId);
    
    const query = `
        INSERT INTO FeedbackForCompany (C_request_id, C_feedback_date, C_driver_id, C_driver_name, C_description)
        VALUES (:requestId, TO_DATE(:feedback_date, 'YYYY-MM-DD'), :driverId, :driverName, :description)
    `;

    const params = {
        requestId: Number(requestId),
        feedback_date: date,
        driverId,
        driverName,
        description
    };

    await insert(query, params);
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error('Error inserting feedback:', error);
    res.status(500).send('Failed to submit feedback');
  }
});


// ---------------------------------------------------------------------- Company Notifications --------------------------------------------------------------------------


// handle notificationForCompany
app.post('/api/driver/notificationsForCompany', async (req, res) => {
  const { driver_id } = req.body;

  console.log('Driver ID:', driver_id);

  if (!driver_id) {
      return res.status(400).json({ error: 'Driver ID is required' });
  }

  // SQL query to fetch notifications for the specific driver
  const query = `
    SELECT c.company_id, f.C_feedback_date, c.c_phone, c.c_email, c.c_area, c.c_road, c.c_house, br.status, w.TYPE as "Waste Type", br.quantity, br.amount
    FROM FeedbackForCompany f
    JOIN BuyingRequest br ON f.C_request_id = br.buying_req_id
    JOIN Company c ON br.company_id = c.company_id
    JOIN WASTE w ON br.waste_id = w.WASTE_ID
    WHERE f.C_driver_id = :driver_id AND br.status <> 'completed'`;

  try {
      const result = await getData(query, { driver_id });

      console.log('Notifications:', result);

      res.status(200).send(result);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'An error occurred while fetching notifications.' });
  }
});



app.get('/api/company-history', async (req, res) => {
  try {
    const query = `
      SELECT 
      br.status, 
      br.buy_req_date AS order_date, 
      c.company_id,  
      c.c_phone,
      c.c_email, 
      c.c_area || ', ' || c.c_road || ', ' || c.c_house AS company_address, 
      w.TYPE AS waste_name, 
      br.quantity, 
      br.amount
      FROM BuyingRequest br, Company c, Waste w
      WHERE br.company_id = c.company_id AND br.waste_id = w.WASTE_ID AND br.status IN ('completed', 'pending')
    `;

    const result = await getData(query);

    console.log('Company History:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching company history:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post("/api/selling-dynamic-search", async (req, res) => {
  const { searchPrice, date, category, sortBy, wasteType } = req.body;

  try {
   
    let query = `
      SELECT sellingrequest.sell_req_date AS "Date", users.u_name AS "Name", waste.type AS "Waste Type", sellingrequest.Quantity AS "Quantity", sellingrequest.price AS "Price" 
      FROM sellingrequest 
      JOIN users ON users.user_id = sellingrequest.user_id 
      JOIN waste ON waste.waste_id = sellingrequest.waste_id 
      WHERE 1 = 1
    `;

    let where = '';
    const bindParams = {};

    if (wasteType && wasteType !== 'Wdefault') {
      where += ` AND waste.type = :waste_type`;
      bindParams.waste_type = wasteType;  
    }


    if (date) {
      where += ` AND TO_CHAR(sellingrequest.sell_req_date, 'YYYY-MM-DD') = :sell_req_date`;
      bindParams.sell_req_date = date;  
    }

    if (searchPrice) {
      bindParams.search_price = searchPrice;  

      if (sortBy === 'low') {
        where += ` AND sellingrequest.price < :search_price ORDER BY sellingrequest.price ASC`;
      } else if (sortBy === 'high') {
        where += ` AND sellingrequest.price > :search_price ORDER BY sellingrequest.price DESC`;
      } else{
        where += ` AND sellingrequest.price = :search_price`;
      }
    }

    if (!searchPrice) {
      if (sortBy === 'low') {
        where += ` ORDER BY sellingrequest.price ASC`;
      } else if (sortBy === 'high') {
        where += ` ORDER BY sellingrequest.price DESC`;
      } else if (sortBy === 'average+') {
        where += ` AND sellingrequest.price > (SELECT AVG(sellingrequest.price) FROM sellingrequest) ORDER BY sellingrequest.price ASC`;
      } else if (sortBy === 'average-') {
        where += ` AND sellingrequest.price < (SELECT AVG(sellingrequest.price) FROM sellingrequest) ORDER BY sellingrequest.price ASC`;
      }
    }

    const finalQuery = query + where;

    const results = await getData(finalQuery, bindParams);

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: "An error occurred while fetching the data" });
  }
});





app.post("/api/buying-dynamic-search", async (req, res) => {
  const { searchPrice, date, category, sortBy, wasteType } = req.body;

  try {
    // Base query for selling requests
    let query = `
      SELECT buyingrequest.buy_req_date, company.company_id, company.c_email, waste.type, buyingrequest.Quantity, buyingrequest.amount 
      FROM buyingrequest 
      JOIN company ON company.company_id = buyingrequest.company_id 
      JOIN waste ON waste.waste_id = buyingrequest.waste_id 
      WHERE 1 = 1
    `;

    let where = '';
    const bindParams = {};

    if (wasteType && wasteType !== 'Wdefault') {
      where += ` AND waste.type = :waste_type`;
      bindParams.waste_type = wasteType; 
    }

    if (date) {
      where += ` AND TO_CHAR(buyingrequest.buy_req_date, 'YYYY-MM-DD') = :buy_req_date`;
      bindParams.buy_req_date = date;  
    }

    if (searchPrice) {
      bindParams.search_price = searchPrice;  

      if (sortBy === 'low') {
        where += ` AND buyingrequest.amount < :search_price ORDER BY buyingrequest.amount ASC`;
      } else if (sortBy === 'high') {
        where += ` AND buyingrequest.amount > :search_price ORDER BY buyingrequest.amount DESC`;
      } else {
        where += ` AND buyingrequest.amount = :search_price`;
      }
    }

    if (!searchPrice) {
      if (sortBy === 'low') {
        where += ` ORDER BY buyingrequest.amount ASC`;
      } else if (sortBy === 'high') {
        where += ` ORDER BY buyingrequest.amount DESC`;
      } else if (sortBy === 'average+') {
        where += ` AND buyingrequest.amount > (SELECT AVG(buyingrequest.amount) FROM buyingrequest) ORDER BY buyingrequest.amount DESC`;
      } else if (sortBy === 'average-') {
        where += ` AND buyingrequest.amount < (SELECT AVG(buyingrequest.amount) FROM buyingrequest) ORDER BY buyingrequest.amount ASC`;
      }
    }

    const finalQuery = query + where;

    const results = await getData(finalQuery, bindParams);

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: "An error occurred while fetching the data" });
  }
});
