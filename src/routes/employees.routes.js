import { Router } from "express";
import { getEmployees, getEmployeeById, createEmployees, updateEmployees, deleteEmployees} from "../controllers/employees.controller.js";

const router = Router()
 
 router.get('/employees', getEmployees)

 router.get('/employee/:id', getEmployeeById)
 
 router.post('/employees', createEmployees)
 
 router.patch('/employee/:id', updateEmployees)
 
 router.delete('/employee/:id', deleteEmployees)

export default router