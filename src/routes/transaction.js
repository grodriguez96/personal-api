import express from 'express';
import * as transactionDao from '../dao/transaction.js'

var router = express.Router();

/** Get all data of user transactions and returned*/
router.get('/:id', async (req, res) => {

    const { id } = req.params;
    res.send(await transactionDao.getAll(id))
})

/** Create one or multiples data */
router.post('/', async (req, res) => {

    /** Insert transaction in the DB */
    const createTransact = (transact) => {
        const newTransact = convert(transact);
        return transactionDao.post(newTransact)
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
        const insertedTransaction = await createTransact(req.body);
        const gTransaction = transactionDao.get(insertedTransaction.id)
        res.status(201).send({ transaction: await gTransaction })

    } catch (err) {
        console.log(err)
    }
})

/** Edit data of one transaction */
router.put('/:id', async (req, res) => {

    /** Insert transaction in the DB */
    const updateTransact = (transact) => {
        const { id } = req.params;
        const newTransact = convert(transact);
        return transactionDao.update(newTransact, id)
    }

    /** Modify values */
    const convert = (transact) => {
        const { concept, amount, transaction_date } = transact;
        const newTransact = {
            concept: concept.toLowerCase(),
            amount,
            transaction_date,
        }
        return newTransact;
    }

    try {
        const insertedTransaction = await updateTransact(req.body);
        const gTransaction = transactionDao.get(insertedTransaction.id)
        res.status(201).send({ transaction: await gTransaction })

    } catch (err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;
        await transactionDao.delet(id)
        res.status(201).send({ id: id })

    } catch (err) {
        console.log(err)
    }
})

export default router;