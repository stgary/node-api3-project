const express = require('express');

const router = express.Router();

const User = require('./userDb.js');
const Post = require('../posts/postDb.js');

router.post('/', (req, res) => {
  console.log(req.body);
  User.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding user"
      });
    });
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then(dbRes => {
      let body = req.body;
      body.user_id = req.params.id;
      Post.insert(body)
        .then(post => {
          res.status(201).json(post)
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error adding post"
          });
        });
    })
    .catch(error => {
      console.log(error);
    })
});

router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: "Error getting users"
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: "Error getting user"
      });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: "Error getting posts"
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(success => {
      res.status(201).json({
        message: "successfully removed"
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error removing user"
        });
      });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(req.body)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error updating user"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  User.getById(req.params.id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({
          message: "invalid user id"
        }); 
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "mw validate id failure"
      });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = body.name;
  if (body === undefined) {
    res.status(400).json({
      message: "missing user data"
    });
  }
  if (name === undefined) {
    res.status(400).json({
      message: "missing required name field"
    });
  }
  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = body.text;
  if (body === undefined) {
    res.status(400).json({
      message: "missing post data"
    });
  }
  if (text === undefined) {
    res.status(400).json({
      message: "missing text"
    });
  }
  next();
}

module.exports = router;
