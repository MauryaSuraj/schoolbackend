const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.status(200).json({
    message : 'Handling Get requests to /products'
  });
});

router.post('/', (req, res, next)=>{
  res.status(200).json({
    message : 'Handling POST requests to /products'
  });
});

router.get('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  if (id == 'special') {
    res.status(200).json({
      message : 'you discovered the special ID',
      id: id
    });
  }
  else {
    res.status(200).json({
      message : 'you passed an ID',
      id:id
    });
  }
});

router.patch('/:productId', (req, res, next) =>{
  res.status(200).json({
    message : 'Updated products'
  });
});

router.delete('/:productId', (req, res, next) =>{
  res.status(200).json({
    message : 'Deleted Product!'
  });
});

module.exports = router;
