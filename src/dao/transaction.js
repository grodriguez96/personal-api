import pool from '../database.js';

export async function getAll(id) {
    return await pool.query('SELECT * FROM transaction WHERE id_user = ?', [id]);
}

export async function post(nTran) {
    const result = await pool.query('INSERT INTO transaction (concept,transaction_date,amount,type,id_user) VALUES (?,?,?,?,?)', [nTran.concept, nTran.transaction_date, nTran.amount, nTran.type, nTran.id_user])
    return { ...nTran, id: await result.insertId }
}

export async function get(id) {
    return await pool.query('SELECT * FROM transaction WHERE id = ?', [id]);
}
export async function update(nTran, id) {
    await pool.query('UPDATE transaction set ? WHERE id = ?', [nTran, id]);
    return { ...nTran, id }
}