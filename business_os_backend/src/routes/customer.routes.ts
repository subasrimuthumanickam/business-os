
import { Router } from 'express';

import {
  getAllCustomers,
  createNewCustomer,
  updateCustomer,
  removeCustomer,
  getCustomerDetails,
  getInvoicesByCustomer,
  getPaymentsByCustomer,
  searchCustomers,          
} from '../controllers/customer.controller.js';

const router = Router();

/* Customer CRUD */
router.get('/all', getAllCustomers);
router.post('/add', createNewCustomer);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', removeCustomer);


router.get('/search', searchCustomers);


router.get('/:id', getCustomerDetails);

/* Customer Invoices */
router.get('/:id/invoices', getInvoicesByCustomer);

/* Customer Payments */
router.get('/:id/payments', getPaymentsByCustomer);

export default router;