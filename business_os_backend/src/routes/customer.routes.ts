import { Router } from 'express';
import { 
  getAllCustomers, 
  createNewCustomer, 
  updateCustomer, 
  removeCustomer 
} from '../controllers/customer.controller.js'; 


const router = Router();

router.get('/all', getAllCustomers);
router.post('/add', createNewCustomer);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', removeCustomer);

export default router;