import express from 'express';
import * as transactionDao from '../dao/transaction.js'

var router = express.Router();

/** Get all data of user transactions and returned*/
router.get('/:id', async (req, res) => {

    const { id } = req.params;
    res.send(await transactionDao.getAllTransactions(id))
})

/** Create one or multiples data */
router.post('/', async (req, res) => {

    /** Insert transaction in the DB */
    const createTransact = (transact) => {
        const newTransact = convert(transact);
        return transactionDao.postTransaction(newTransact)
    }

    /** Modify values */
    const convert = (transact) => {
        const { concept, amount, transaction_date, type, id_user } = transact;
        const newTransact = {
            concept: concept.toLowerCase(),
            amount: parseFloat(amount),
            type: parseInt(type),
            id_user: id_user.toLowerCase(),
            transaction_date,
        }
        return newTransact;
    }

    try {
        /** When using map i will have an array of promises, which when they are fulfilled will return the inserted pies */
        const insertedTransaction = await createTransact(req.body);
        const gTransaction = transactionDao.getTransaction(insertedTransaction.id)
        res.status(201).send({ transaction: await gTransaction })

    } catch (err) {
        console.log(err)
    }
})

export default router;