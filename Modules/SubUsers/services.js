const User = require('../../Models/Users');
const SubUser = require('../../Models/SubUsers');
const path = require('path');

// Function to create a new user record
const addProfilePic = async (req) => {
  try {
    const existingUser = await User.findOne({ clientId: req.body.clientId });
    if (existingUser) {
      const existingSubUser = await SubUser.findOne({ clientId: req.body.clientId, username: req.body.username });
      if (existingSubUser) {
        // return { success: false, message: 'Client already exists' };
        let response = await SubUser.updateOne({ username: req.body.username }, { image: req.file.filename })
        if (response) {
          return { success: true, message: 'Profile pic updated', result: response }
        } else {
          return { success: false, message: 'Internal Server Error' };
        }
      }
  
      const newSubUser = new SubUser({ ...req.body, image: req.file.filename });
      let response = await newSubUser.save();
      if (response) {
        return { success: true, message: 'Successfully uploaded your first profile pic', result: response }
      } else {
        return { success: false, message: 'Internal Server Error' }
      }
    } else {
      return { success: true, message: 'Client does not exist!' }
    }
  } catch (error) {
    // throw error
    return { success: false, message: error }
  }
};

const getAllSubUsers = async () => {
  try {
    const users = await SubUser.find();
    return { success: true, message: users };
  } catch (error) {
    return { success: false, message: error };
  }
};

const getSubUser = async (req) => {
  const { clientId, username } = req.params
  try {
    const user = await SubUser.findOne({ clientId, username });
    return { success: true, message: user };
  } catch (error) {
    return { success: false, message: error };
  }
};

const getProfilePic = async (req) => {
  const { clientId, username } = req.params
  console.log({clientId, username})
  try {
    const user = await SubUser.findOne({ clientId, username });
    // console.log({user})
    if (user) {
      return { success: true, message: user.image };
    } else {
      return { success: false, message: 'User not found' };
    }
    
    // return { success: true, message: user };
  } catch (error) {
    // throw error
    return { success: false, message: error };
  }
};

module.exports = {
  addProfilePic,
  getAllSubUsers,
  getSubUser,
  getProfilePic
};
