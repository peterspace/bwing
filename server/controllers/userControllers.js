const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const Recovery = require('../models/Recovery.js');
const Place = require('../models/placeModel');
// const generateToken = require('../config/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validateMongoDbId = require('../utils/validateMongodbId');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

//======{Change: adding email activation link}======
// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    pic,
    country,
    state,
    city,
    walletAddress,
    businessName,
    tokens,
    fiat,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !country ||
    !state ||
    !city ||
    !walletAddress ||
    !tokens ||
    !fiat
  ) {
    res.status(400);
    throw new Error('Please Enter all the Feilds');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    country,
    state,
    city,
    walletAddress,
    tokens,
    fiat,
    businessName,
    role: 'Admin',
    level: 1,
    isAdmin: true,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      walletAddress: user.walletAddress,
      level: user.level,
      supervisor: user.supervisor,
      role: user.role,
      country: user.country,
      state: user.state,
      city: user.city,
      businessName: user.businessName,
      tokens: user.tokens,
      fiat: user.fiat,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

const login1 = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //======={Email Verification} ==================
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (user?.role === 'User') {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        walletAddress: user.walletAddress,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        walletAddress: user.walletAddress,
        level: user.level,
        supervisor: user.supervisor,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  //======={Email Verification} ==================
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
    const { _id, name, email, pic, role, isAdmin } = user;
    let response = {
      _id,
      userId: _id,
      name,
      email,
      pic,
      role,
      isAdmin,
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// ====================={Login User}===========================
const adminLogin = asyncHandler(async (req, res) => {
  //====={email and password || walletAddress}===============
  let user;
  let verified = false;
  //======={Wallet Verification} ==================
  if (req.body.walletAddress && !req.body.password && !req.body.email) {
    user = await User.findOne({ walletAddress: req.body.walletAddress });
    if (user) {
      verified = true;
    }
    //   Generate Token
    const token = generateToken(user._id);

    if (verified) {
      const { _id, walletAddress, email, pic, role } = user;
      let response = {
        userId: _id,
        walletAddress,
        email,
        pic,
        role,
        token,
      };
      res.status(200).json(response);
    } else {
      user = await User.findOne({ email: req.body.email });
      if (user) {
        verified = true;
      }

      if (verified) {
        const { _id, walletAddress, email, pic, role } = user;
        let response = {
          userId: _id,
          walletAddress,
          email,
          pic,
          role,
          token,
        };
        res.status(200).json(response);
      } else {
        res.status(400);
        throw new Error('Invalid email or password');
      }
    }
    if (!user) {
      res.status(400);
      throw new Error('User not found, please signup');
    }
  }
});

const usersAdmin = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    // const { _id, walletAddress, email, pic, role } = user;

    console.log(user);
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('User Not Found');
  }
});

// Update User

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { walletAddress, email, pic, phone, role } = user;
    user.email = email;
    user.walletAddress = req.body.walletAddress || walletAddress;
    user.phone = req.body.phone || phone;
    user.role = req.body.role || role;
    user.pic = req.body.pic || pic;

    const updatedUser = await user.save();

    if (updatedUser?.role === 'User') {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        pic: updatedUser.pic,
        walletAddress: updatedUser.walletAddress,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        pic: updatedUser.pic,
        walletAddress: updatedUser.walletAddress,
        level: updatedUser.level,
        supervisor: updatedUser.supervisor,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Get All Users Data
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.role === 'Admin') {
    res.json(await User.find({ role: 'User' }));
  }
});

//====={Consider keeping}=========
const getTransactions = asyncHandler(async (req, res) => {
  const { _id } = req.user; // sending user as an object
  validateMongoDbId(_id);
  try {
    const userTransactions = await Transaction.findOne({ Transactionby: _id })
      .populate('user')
      .populate('manager')
      .populate('messages')
      .exec();
    res.json(userTransactions);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const alluserTransactions = await Transaction.find()
      .populate('user')
      .populate('manager')
      .populate('messages')
      .exec();
    res.json(alluserTransactions);
  } catch (error) {
    throw new Error(error);
  }
});
const getTransactionByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userTransactions = await Transaction.findOne({ Transactionby: id })
      .populate('user')
      .populate('manager')
      .populate('messages')
      .exec();
    res.json(userTransactions);
  } catch (error) {
    throw new Error(error);
  }
});

//========={LOCAL AUTH}================================================================================================

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters');
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('You have an account, please proceed to login');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    await registrationConfirmationMsg(email, name); // send email
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
// Login User
const loginUser1 = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
    if (user?.role === 'User') {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        photo: user.photo,
        walletAddress: user.walletAddress,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        photo: user.photo,
        walletAddress: user.walletAddress,
        level: user.level,
        supervisor: user.supervisor,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });
  }
  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, role } = user;
    let response = {
      userId: _id,
      name,
      email,
      photo,
      role,
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

//========={SOCIAL AUTH}================================================================================================
const registerSocial = asyncHandler(async (req, res) => {
  const { authId } = req.body;

  if (!authId) {
    res.status(400);
    throw new Error('Not authorized');
  }

  //========={Check if the hashed OTP has not expired}============
  const userToken = await Recovery.findOne({
    authId,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Token has expired');
  }

  const userExists = await User.findOne({
    email: userToken?.email,
    accountId: userToken?.accountId,
  });
  console.log({ userExists: userExists });

  if (userExists) {
    res.status(400);
    throw new Error('You have an account, please proceed to login');
  }

  // Create new user
  const user = await User.create({
    name: userToken?.name,
    email: userToken?.email,
    accountId: userToken?.accountId,
    provider: userToken?.provider,
  });

  console.log({ user: user });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    await registrationConfirmationMsg(email, name); // send email
    let response = {
      userId: _id,
      name,
      email,
      photo,
      role,
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginSocial = asyncHandler(async (req, res) => {
  const { authId } = req.body;

  if (!authId) {
    res.status(400);
    throw new Error('Not authorized');
  }

  //========={Check if the hashed OTP has not expired}============
  const userToken = await Recovery.findOne({
    authId,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Token has expired');
  }

  const user = await User.findOne({
    email: userToken?.email,
    accountId: userToken?.accountId,
  });

  if (!user) {
    res.status(400);
    throw new Error('user not found please register');
  }

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    let response = {
      userId: _id,
      name,
      email,
      photo,
      role,
      token,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const authSucessGoogle1 = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  if (req.user) {
    const accountId = req.user.id;
    const email = req.user.emails[0].value;
    const name = req.user.displayName;
    const provider = req.user.provider;

    const otp = Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(10);
    const hashedOtP = await bcrypt.hash(otp.toString(), salt);
    const authId = uuidv4(); // new unique identifier

    // Delete token if it exists in DB
    let token = await Recovery.findOne({ accountId: accountId });
    if (token) {
      await token.deleteOne();
    }

    await new Recovery({
      accountId,
      email,
      name,
      provider,
      token: hashedOtP,
      authId,
      // token: otp.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * (60 * 1000), // 5 minutes
    }).save();

    // const url = `http://localhost:5173/auth/${email}/${accountId}/`;
    const url = `http://localhost:5173/auth/success/${authId}`;
    res.redirect(url);
  }
});

const authSucessGoogle = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  if (req.user) {
    const accountId = req.user.id;
    const email = req.user.emails[0].value;
    const name = req.user.displayName;
    const provider = req.user.provider;

    const otp = Math.floor(1000 + Math.random() * 9000);
    const salt = await bcrypt.genSalt(10);
    const hashedOtP = await bcrypt.hash(otp.toString(), salt);
    const authId = uuidv4(); // new unique identifier

    // Delete token if it exists in DB
    let token = await Recovery.findOne({ accountId: accountId });
    if (token) {
      await token.deleteOne();
    }

    await new Recovery({
      accountId,
      email,
      name,
      provider,
      token: hashedOtP,
      authId,
      // token: otp.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * (60 * 1000), // 5 minutes
    }).save();

    //======={destroy previous session since we'll be using jwt next}
    // console.log({ 'previous session': req.session });
    // const newSession = req.session?.passport?.user;
    // console.log({ 'new session': newSession });

    // const url = `http://localhost:5173/auth/${email}/${accountId}/`;
    const url = `http://localhost:5173/auth/success/${authId}`;
    res.redirect(url);
  }
});

const authErrorGoogle = asyncHandler(async (req, res) => {
  if (!req.user) {
    const message = `Failed to authenticate..`;
    const url = `http://localhost:5173/auth/failure/${message}`;
    res.redirect(url);
  }
});

//========={facebook}==================
const authSucessFacebook = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  if (req.user) {
    const accountId = req.user.id;
    const email = req.user.email;
    const name = req.user.displayName;
    const provider = req.user.provider;
    // const url = `http://localhost:5173/auth/${email}/${accountId}/`;
    const url = `http://localhost:5173/auth/success/${name}/${email}/${accountId}/${provider}`;
    res.redirect(url);
  }
});

const authErrorFacebook = asyncHandler(async (req, res) => {
  if (!req.user) {
    const message = `Failed to authenticate..`;
    const url = `http://localhost:5173/auth/failure/${message}`;
    res.redirect(url);
  }
});

/**
 *
 * {"provider":"google","sub":"110230640942167012709","id":"110230640942167012709","displayName":"Peter Okeme","name":{"givenName":"Peter","familyName":"Okeme"},"given_name":"Peter","family_name":"Okeme","email_verified":true,"verified":true,"language":"en-GB","email":"peter.space.io@gmail.com","emails":[{"value":"peter.space.io@gmail.com","type":"account"}],"photos":[{"value":"https://lh3.googleusercontent.com/a/ACg8ocKDGEtBmmsEueHYlz2nhjcN3gSull1wofOzd1FHogR7=s96-c","type":"default"}],"picture":"https://lh3.googleusercontent.com/a/ACg8ocKDGEtBmmsEueHYlz2nhjcN3gSull1wofOzd1FHogR7=s96-c","_raw":"{\n  \"sub\": \"110230640942167012709\",\n  \"name\": \"Peter Okeme\",\n  \"given_name\": \"Peter\",\n  \"family_name\": \"Okeme\",\n  \"picture\": \"https://lh3.googleusercontent.com/a/ACg8ocKDGEtBmmsEueHYlz2nhjcN3gSull1wofOzd1FHogR7\\u003ds96-c\",\n  \"email\": \"peter.space.io@gmail.com\",\n  \"email_verified\": true,\n  \"locale\": \"en-GB\"\n}","_json":{"sub":"110230640942167012709","name":"Peter Okeme","given_name":"Peter","family_name":"Okeme","picture":"https://lh3.googleusercontent.com/a/ACg8ocKDGEtBmmsEueHYlz2nhjcN3gSull1wofOzd1FHogR7=s96-c","email":"peter.space.io@gmail.com","email_verified":true,"locale":"en-GB"}}
 */

const loginByFacebook = asyncHandler(async (req, res) => {
  // const { email, password } = req.body;
  if (req.user) {
    const accountId = req.user.id;
    const email = req.user.email;
    const url = `http://localhost:5173/auth/${email}/${accountId}/`;
    res.redirect(url);
  }
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({ message: 'Successfully Logged Out' });
});

//Get User Data

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, walletAddress, email, pic, role } = user;

    const token = generateToken(_id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    });

    res.status(200).json({
      _id,
      userId: _id,
      walletAddress,
      email,
      pic,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('User Not Found');
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error('Please add old and new password');
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
    // user.password = password;
    await user.save();
    res.status(200).send('Password change successful');
  } else {
    res.status(400);
    throw new Error('Old password is incorrect');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Delete token if it exists in DB
  let token = await Recovery.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save Token to DB
  await new Recovery({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `<!DOCTYPE html>

  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #dc2626;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #ffffff;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Blendery</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e4e4e7;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        color: #000000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Hi ${user.name}!</span
                                      >
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        You are reseting your password
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-7"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Please click
                                          <strong>Reset</strong> to reset your
                                          password</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        ⇒ This reset link is valid for only
                                        30minutes.
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-20"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 10px;
                                      padding-right: 10px;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #dddddd;
                                            "
                                          >
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #dc2626;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <a href="${resetUrl}" clicktracking="off"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              >Reset</span
                                            ></span
                                          ></a
                                        >
                                      </div>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-22"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #1e0e4b;
                                      font-family: 'Inter', sans-serif;
                                      font-size: 15px;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;
  const subject = 'Password Reset Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: 'Reset Email Sent' });
  } catch (error) {
    res.status(500).json('Email not sent, please try again');
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // fIND tOKEN in DB
  const userToken = await Recovery.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token');
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // user.password = password;
  user.password = hashedPassword;

  await user.save();
  res.status(200).json({
    message: 'Password Reset Successful, Please Login',
  });
});

const findUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // get user'sd from "protect middleware"
  if (user) {
    console.log('userData:', user);
    return res.json(user);
  }
});

const registrationConfirmationMsg = async (email, name) => {
  const user = await User.findOne({ email });

  if (!user) {
    console.log({ error: 'User does not exist' });
    return;
  }

  // Delete token if it exists in DB

  // const userLogin = `${process.env.FRONTEND_URL}/login`;
  const userLogin = `${process.env.FRONTEND_URL}/auth`;

  // Reset Email
  const message = `<!DOCTYPE html>

  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #dc2626;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #ffffff;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Blendery</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e4e4e7;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        color: #000000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Hi ${name}!</span
                                      >
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        Thank you for choosing Blendery
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-7"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Your registration was successful</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Please continue to your account by
                                          clicking on the
                                          <strong>Login</strong> button below</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-20"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 10px;
                                      padding-right: 10px;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #dddddd;
                                            "
                                          >
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #dc2626;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <a href="${userLogin}" clicktracking="off"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              ><strong>Login</strong></span
                                            ></span
                                          ></a
                                        >
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-22"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #1e0e4b;
                                      font-family: 'Inter', sans-serif;
                                      font-size: 15px;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;
  const subject = 'Registration Successful';

  const emailTest = 'peter.space.io@gmail.com';
  const send_to = email;
  // const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;

  console.log({ email: email, name: name });

  await sendEmail(subject, message, send_to, sent_from);
};

const registrationConfirmationMsgTest = async () => {
  const name = 'Peter';
  const email = 'eenglishwithpeter@gmail.com';

  // Delete token if it exists in DB

  // const userLogin = `${process.env.FRONTEND_URL}/login`;
  const userLogin = `${process.env.FRONTEND_URL}/auth`;

  // Reset Email
  const message = `<!DOCTYPE html>

  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #dc2626;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #ffffff;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Blendery</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e4e4e7;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        color: #000000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Hi ${name}!</span
                                      >
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        Thank you for choosing Blendery
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-7"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Your registration was successful</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Please continue to your account by
                                          clicking on the
                                          <strong>Login</strong> button below</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-20"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 10px;
                                      padding-right: 10px;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #dddddd;
                                            "
                                          >
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #dc2626;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <a href="${userLogin}" clicktracking="off"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              ><strong>Login</strong></span
                                            ></span
                                          ></a
                                        >
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-22"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #1e0e4b;
                                      font-family: 'Inter', sans-serif;
                                      font-size: 15px;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;
  const subject = 'Registration Successful';

  const emailTest = 'peter.space.io@gmail.com';
  const send_to = email;
  // const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;

  console.log({ email: email, name: name });

  await sendEmail(subject, message, send_to, sent_from);
};

// registrationConfirmationMsgTest()

async function generateOTP() {
  const name = 'Peter';
  const email = 'eenglishwithpeter@gmail.com';

  const otp = Math.floor(1000 + Math.random() * 9000);

  const subject = 'Verify Your Email';

  const send_to = email;
  // const send_to = emailTest;
  const sent_from = process.env.EMAIL_USER;
  const userLogin = `${process.env.FRONTEND_URL}/auth`;
  const message = `<!DOCTYPE html>

  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #dc2626;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #ffffff;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Blendery</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e4e4e7;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        color: #000000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Hi ${name}!</span
                                      >
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        You are reseting your password
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-7"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Please use the otp below to reset
                                          your password</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        ⇒ This otp is valid for only
                                        5 minutes.
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-20"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 10px;
                                      padding-right: 10px;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #dddddd;
                                            "
                                          >
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #dc2626;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <span
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            style="
                                              word-break: break-word;
                                              line-height: 32px;
                                            "
                                            ><strong>${otp}</strong></span
                                          ></span
                                        >
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-22"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #1e0e4b;
                                      font-family: 'Inter', sans-serif;
                                      font-size: 15px;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;

  await sendEmail(subject, message, send_to, sent_from);
}

// generateOTP()

const forgotOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Delete token if it exists in DB
  let token = await Recovery.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create otp Token and hash with bcrypt
  const otp = Math.floor(1000 + Math.random() * 9000);

  const salt = await bcrypt.genSalt(10);
  const hashedOtP = await bcrypt.hash(otp.toString(), salt);
  const authId = uuidv4(); // new unique identifier

  // Save Token to DB
  await new Recovery({
    userId: user._id,
    token: hashedOtP,
    authId,
    // token: otp.toString(),
    createdAt: Date.now(),
    expiresAt: Date.now() + 5 * (60 * 1000), // 5 minutes
  }).save();

  const resetUrl = `${process.env.FRONTEND_URL}/otp/${authId}`;
  // Reset Email
  const message = `<!DOCTYPE html>
  <html
    lang="en"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 620px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
    <body
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fff;
        "
        width="100%"
      >
        <tbody>
          <tr>
            <td>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-1"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #dc2626;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #ffffff;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 38px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Blendery</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-2"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e4e4e7;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="heading_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                      text-align: center;
                                      width: 100%;
                                    "
                                  >
                                    <h3
                                      style="
                                        margin: 0;
                                        color: #000000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: left;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >Hi ${user?.name}!</span
                                      >
                                    </h3>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #101112;
                                        direction: ltr;
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        You are reseting your password
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-7"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <em
                                          >⇒ Please use the otp below and click on
                                          the <strong>Verify</strong> button to
                                          verify your account</em
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="paragraph_block block-2"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #dc2626;
                                        direction: ltr;
                                        font-family: Georgia, Times,
                                          'Times New Roman', serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        ⇒ This otp is valid for only 5 minutes.
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-20"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="divider_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-left: 10px;
                                      padding-right: 10px;
                                    "
                                  >
                                    <div align="center" class="alignment">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #dddddd;
                                            "
                                          >
                                            <span> </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #ffffff;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <span
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            font-size: 16px;
                                            display: inline-block;
                                            letter-spacing: normal;
                                          "
                                          ><span
                                            style="
                                              word-break: break-word;
                                              line-height: 32px;
                                            "
                                            ><strong>${otp}</strong></span
                                          ></span
                                        >
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-21"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000;
                          background-color: #dc2626;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                class="button_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td class="pad">
                                    <div align="center" class="alignment">
                                      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:86px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ffffff"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#dc2626; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #dc2626;
                                          background-color: #ffffff;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <a href="${resetUrl}" clicktracking="off"
                                          ><span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              >Verify</span
                                            ></span
                                          ></a
                                        >
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="row row-22"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #ffffff;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row-content stack"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          color: #000;
                          width: 600px;
                          margin: 0 auto;
                        "
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                              width="100%"
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="icons_block block-1"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                                width="100%"
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      vertical-align: middle;
                                      color: #1e0e4b;
                                      font-family: 'Inter', sans-serif;
                                      font-size: 15px;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="alignment"
                                          style="
                                            vertical-align: middle;
                                            text-align: center;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  `;
  const subject = 'OTP Request';
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: 'Verify account Sent' });
  } catch (error) {
    res.status(500).json('Email not sent, please try again');
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, authId } = req.body;

  const tokenAuthorized = await Recovery.findOne({ authId });
  if (!tokenAuthorized) {
    res.status(400);
    throw new Error('Unauthorized OTP');
  }

  const otpHashed = tokenAuthorized?.token;

  // User exists, check if password is correct
  const verifyOTP = await bcrypt.compare(otp, otpHashed);
  if (!verifyOTP) {
    res.status(400);
    throw new Error('Invalid OTP');
  }

  const tokenExists = await Recovery.findOne({ authId });
  if (!tokenExists) {
    res.status(400);
    throw new Error('Invalid otp');
  }
  //========={Check if the hashed OTP has not expired}============
  const userToken = await Recovery.findOne({
    token: otpHashed,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Token has expired');
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });

  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    let response = {
      userId: _id,
      name,
      email,
      photo,
      role,
      token,
      authId,
    };
    res.status(200).json(response);
  } else {
    res.status(400);
    throw new Error('Invalid OTP');
  }
});

//===============================================================================
module.exports = {
  allUsers,
  registerUser,
  registerAdmin,
  login,
  usersAdmin,
  adminLogin,
  getUser,
  loginStatus,
  updateUser,
  getAllUsers,
  getTransactions,
  getTransactionByUserId,
  getUserById,
  changePassword,
  forgotPassword,
  resetPassword,
  //======{new}===============
  loginUser,
  logout,
  loginByFacebook,
  registerSocial,
  loginSocial,
  authSucessGoogle,
  authErrorGoogle,
  authSucessFacebook,
  authErrorFacebook,
  forgotOtp,
  verifyOtp,
};
