// server.js (Port 4000)
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/pay');
});

app.get('/pay', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shopping Platform - Pay</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <h2>Initiate Payment</h2>
      <form id="paymentForm">
        <label>
          Merchant ID:
          <input type="text" name="merchantid" required placeholder="Enter merchant ID" />
        </label>
        
        <label>
          Amount:
          <input type="number" name="amount" required step="0.01" placeholder="Enter amount" />
        </label>
        
        <label>
          Payment ID:
          <input type="text" name="paymentid" required placeholder="Enter payment ID" />
        </label>
        
        <label>
          Payee UPI Id:
          <input type="text" name="payeeUpiId" required placeholder="Enter UPI ID" />
        </label>
        
        <label>
          Payee UPI Name:
          <input type="text" name="payeeUpiName" required placeholder="Enter UPI name" />
        </label>
        
        <label>
          Success URL:
          <input type="text" name="successUrl" value="http://localhost:4000/success" required />
        </label>
        
        <label>
          Failure URL:
          <input type="text" name="failureUrl" value="http://localhost:4000/failure" required />
        </label>
        
        <label>
          Redirect URI:
          <input type="text" name="redirectUrl" value="https://www.kedbog.com/payment" />
        </label>
        
        <button type="submit">Initiate Payment</button>
      </form>

      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      // server.js (frontend)
// Update the form submission code
<script>
  document.getElementById('paymentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const paymentData = {
      paymentId: formData.get('paymentid'),      // Changed from paymentId
      merchantId: formData.get('merchantid'),     // Changed from merchantId
      amount: parseFloat(formData.get('amount')),
      payeeName: formData.get('payeeUpiName'),    // Changed from payeeUpiName
      payeeUpiId: formData.get('payeeUpiId'),    // Changed from payeeUpiId
      successUri: formData.get('successUrl'),
      failureUri: formData.get('failureUrl'),
      redirectUri: formData.get('redirectUr
      l')
    };

    try {
      // Updated endpoint URL
      const response = await axios.post('https://www.kedbog.com/payment/initiate', paymentData);
      console.log('Response:', response.data); // Add this for debugging
      
      const { status, redirectUrl } = response.data;
      
      if (status === 'success' && redirectUrl) {
        const paymentWindow = window.open(redirectUrl, '_blank');
        
        if (paymentWindow === null) {
          alert('Please allow popups for this website to complete the payment');
        }
        
        window.location.href = '/';
      } else {
        alert("Payment initialization failed. Please try again.");
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      const errorMessage = err.response?.data?.message || err.message;
      console.log('Error details:', err.response?.data); // Add this for debugging
      alert("Payment initiation failed: " + errorMessage);
    }
  });
</script>
    </body>
    </html>
  `);
});

app.get('/success', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Success</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f8f0;
        }
        .success-message {
          text-align: center;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <div class="success-message">
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/failure', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Failed</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #fff0f0;
        }
        .failure-message {
          text-align: center;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          color: #ff4444;
        }
      </style>
    </head>
    <body>
      <div class="failure-message">
        <h2>Payment Failed</h2>
        <p>Please try again later.</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Shopping Platform is running on http://localhost:${PORT}`);
});