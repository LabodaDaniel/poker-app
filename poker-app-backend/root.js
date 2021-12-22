import express from 'express';

import  findStrongest  from './findStrongest.js';

const router = express.Router();
router.post('/strongest', (req, res, next) => {
    let cards = req.body;
    console.log(req.body)
    res.send(findStrongest(cards));
    console.log(cards)
});

export default router;