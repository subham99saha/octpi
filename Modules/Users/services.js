// Modules/Users/services.js

const User = require('../../Models/Users');

// Function to create a new user record
const saveUser = async (clientId) => {
  try {
    const existingUser = await User.findOne({clientId});
    if (existingUser) {
      return { success: false, message: 'Client already exists' };
    }

    const newUser = new User({clientId});
    let response = await newUser.save();
    if (response) {
      return { success: true, message: response }
    } else {
      return { success: false, message: 'Internal Server Error' }
    }
  } catch (error) {
    return { success: false, message: error }
  }
};

const deleteUser = async (clientId) => {
  try {
    const existingUser = await User.findOne({clientId});
    if (existingUser) {
      User.deleteOne({ clientId }).then((result) => { 
        console.log(result); 
        return { success: true, message: 'Client removed', result };
      });      
    } else {
      return { success: false, message: 'Client doesn\'t exist' }
    }
  } catch (error) {
    return { success: false, message: error }
  }
};

const checkUser = async (clientId) => {
  try {
    const existingUser = await User.findOne({clientId});
    if (existingUser) {
      return { success: true, message: 'Client exists', result: existingUser };
    } else {
      return { success: false, message: 'Client doesn\'t exist' }
    }
  } catch (error) {
    return { success: false, message: error }
  }
};

const addAmount = async (clientId,amount) => {
  try {
    let response = await User.updateOne({ clientId }, { $inc: { amountDue: amount } })
      if (response) {
        return { success: true, message: 'Amount updated', result: response }
      } else {
        return { success: false, message: 'Internal Server Error' };
      }
  } catch (error) {
    return { success: false, message: error }
  }
};

const checkAmount = async (clientId) => {
  try {
    const checkAmount = await User.findOne({ clientId });
    if (checkAmount) {
      if (checkAmount.amountDue === 0) {
        return { success: true, message: 'No amount due', amountDue: false, result: checkAmount };
      } else {
        return { success: true, message: 'Amount Due', amountDue: true, result: checkAmount }
      }
    } else {
      return { success: false, message: 'Client doesn\'t exist' }
    }
  } catch (error) {
    return { success: false, message: 'Amount Due' }
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return { success: true, message: users };
  } catch (error) {
    return { success: false, message: error };
  }
};

module.exports = {
  saveUser,
  checkUser,
  deleteUser,
  addAmount,
  checkAmount,
  getAllUsers,
};
