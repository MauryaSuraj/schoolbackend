const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next)=>{
    Product.find().exec().then( docs =>{
    console.log(docs);
    res.status(200).json(docs);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
  });
});

router.post('/', (req, res, next)=>{
  const product = new Product({
    _id : new mongoose.Types.ObjectId(),
    name : req.body.name,
    price : req.body.price
  });

  product.save().then(result => {
    console.log(result);
  }).then(result =>{
    console.log(result);
    res.status(201).json({
      message : "Handling POST resquest to /Products",
      createdProduct : result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
  });

  res.status(201).json({
    message : 'Handling POST requests to /products',
    createdProduct : product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc =>{
      console.log("From Database ", doc);
      if (doc) {
        res.status(200).json(doc);
      }else {
        res.status(404).json({message : 'No Valid Entry found for provided ID'});
      }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error : err });
  });

  // if (id == 'special') {
  //   res.status(200).json({
  //     message : 'you discovered the special ID',
  //     id: id
  //   });
  // }
  // else {
  //   res.status(200).json({
  //     message : 'you passed an ID',
  //     id:id
  //   });
  // }
});

router.patch('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  // res.status(200).json({
  //   message : 'Updated products'
  // });
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName = ops.value]
  }
  Product.update({ _id : id }, { $set: updateOps })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
  });
});

router.delete('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  Product.remove({ _id:id })
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
  });
});

module.exports = router;
