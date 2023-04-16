const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Follow = require('../models/Follow');

 //criando usuario
 module.exports.create = (req, res, next) => {
  const { email, password, firstName, lastName, username } = req.body;
  User.create({ email, password, firstName, lastName, username })
    .then(userCreated => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch(next)
}

module.exports.listPeopleToFollow = (req, res, next) => {
  const currentUserId = req.params.id;

  User.find()
    .then(users => {
      Follow.find({ follower: currentUserId })
        .then(follows => {
          users.map((user) => {
            follows.map((follow) => {
              if(user.id === follow.following.valueOf()) {
                user.alreadyFollowed = true;
              }
            })
          })
          res.status(StatusCodes.CREATED).json(users);
        })
        .catch(next)
    })
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  const { id } = req.user;

  Profile.findById(id)
  .then(profile => {
      res.render('user/profile')
  })
  .catch(err => next(err))
};

