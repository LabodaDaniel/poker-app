import express from 'express';

import  findStrongest  from './findStrongest.js';
import  findEnemyStrongest  from './findEnemyStrongest.js';

const router = express.Router();
router.post('/mystrongest', (req, res, next) => {
    let cards = req.body;
    res.send.toString(findStrongest(cards));
});

router.post('/enemystrongest', (req, res, next) => {
    let cards = req.body;
    res.send.toString(findEnemyStrongest(cards));
});

export default router;