import express from 'express'
import cors from 'cors'

import transactionRoute from '../src/routes/transaction.js';

/** Incicializations */
const app = express();
app.use(cors());
app.options('*', cors());

/** Settings */
app.set('port', process.env.PORT || 4000);

/** Routes */
app.use('/transaction', transactionRoute);

/** Starting server */
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})