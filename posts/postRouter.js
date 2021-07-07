const express = require('express');

const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Unable to get posts'
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Unable to get post'
      });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(dbRes => {
      res.status(200).json({
        message: 'Post successfully removed.'
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'Unable to remove post.'
      });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Could not update post.'
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
    .then(post => {
      if(post) {
        next();
      } else {
        res.status(500).json({
          error: 'Invalid post ID'
        });
        return;
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'Unable to verify post ID'
      })
    })
}

module.exports = router;
