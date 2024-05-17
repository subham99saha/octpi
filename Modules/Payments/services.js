
const Payment = require('../../Models/Payments');
const User = require('../../Models/Users');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// Function to create a new code record
const createOrder = (body) => new Promise((resolve, reduce) => {
  try {    
    // let data = JSON.stringify();

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.razorpay.com/v1/orders',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Basic ' + process.env.RZP_CREATEORDER_TOKEN
      },
      data: body
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      resolve({ success: true, message: response.data })
    })
    .catch((error) => {
      console.log(error);
      resolve({ success: false, message: 'Internal Server Error', error })
    });
  } catch (error) {
    reduce({ success: false, message: error })
  }
});

const recordPayment = async (data) => {
  try {    
    const newPayment = new Payment(data);
    let paymentResponse = await newPayment.save();
    if (paymentResponse) {
      // return { success: true, message: response }
      if (data.success === true) {
        let response = await User.updateOne({ clientId: data.clientId }, { $inc: { amountDue: (data.amount * -1) } })
        if (response) {
          return { success: true, message: 'Transaction recorded. Amount updated.', result: [paymentResponse, response] }
        } else {
          return { success: false, message: 'Transaction recorded. Error with amount update', result: [paymentResponse] };
        }
      } else {
        return { success: true, message: 'Transaction recorded.', result: [paymentResponse] }
      }
    } else {
      return { success: false, message: 'Internal Server Error' }
    }
  } catch (error) {
    return { success: false, message: error }
  }
};

const getPayments = async () => {
  try {
    const payments = await Payment.find();
    return { success: true, message: payments };
  } catch (error) {
    return { success: false, message: error };
  }
};

module.exports = {
  createOrder,
  recordPayment,
  getPayments
};
