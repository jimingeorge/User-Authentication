const mongoose = require("mongoose");
const validator = require("validator"); //to validate email
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    minlength: 5
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: value => {
        validator.isEmail(value);
      },
      message: "Email validation failed"
    }
  },
  ip:[{
    type:String
  }],
  loginCount:{
    type:Number,
    default:0
  },
  password: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

//to encrypt user pswd before saaving it to db
userSchema.pre("save", function(next) {
  const user = this;
  if (user.isNew) {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(user.password, salt).then(encryptedPswd => {
        user.password = encryptedPswd;
        next();
      });
    });
  } else {
    next();
  }
});

//Custom Static Methods
userSchema.statics.findByCredentialsEmail = function(email, password) {
  const User = this;
  return User.findOne({ email })
    .then(user => {
      if (!user) {
        return Promise.reject("invalid email / password");
      }
      return bcrypt.compare(password, user.password).then(function(result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject("invalid email / password");
        }
      });
    })
    .catch(err => {
      return Promise.reject(err);
      //return new Promise(function(resolve,reject){
      //     reject(err)
      // }
    });
};
userSchema.statics.findByCredentialsUsername = function(username, password) {
  const User = this;
  return User.findOne({ username })
    .then(user => {
      if (!user) {
        return Promise.reject("invalid email / password");
      }
      return bcrypt.compare(password, user.password).then(function(result) {
        if (result) {
          return Promise.resolve(user);
        } else {
          return Promise.reject("invalid email / password");
        }
      });
    })
    .catch(err => {
      return Promise.reject(err);
      //return new Promise(function(resolve,reject){
      //     reject(err)
      // }
    });
};

//Custom instance methods
userSchema.methods.generateToken = function(req) {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.name,
    createdAt: Number(new Date())
  };

  
  const token = jwt.sign(tokenData, "jwt@123");

  user.tokens.push({

    token: token
  });
  //console.log(user.login.push({ip:req.ip}))
  user.ip.push(req.ip)
  user.loginCount+=1

  return user
    .save()
    .then(function(user) {
      return Promise.resolve(token);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function(token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@123");
  } catch (err) {
    return Promise.reject(err);
  }
  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token //spcl characters must be within ''
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
