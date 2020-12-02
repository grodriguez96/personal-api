import pool from '../database.js';

export async function getAllTransactions(id) {
    return await pool.query('SELECT * FROM transaction WHERE id_user = ?', [id]);
}

export async function postTransaction(nTran) {
    const result = await pool.query('INSERT INTO transaction (concept,transaction_date,amount,type,id_user) VALUES (?,?,?,?,?)', [nTran.concept, nTran.transaction_date, nTran.amount, nTran.type, nTran.id_user])
    return { ...nTran, id: await result.insertId }
}

export async function getTransaction(id) {
    return await pool.query('SELECT * FROM transaction WHERE id = ?', [id]);
}