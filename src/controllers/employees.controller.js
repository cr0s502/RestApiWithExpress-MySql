import {pool} from '../db.js'
import jwt from 'jsonwebtoken'

export const getEmployees = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM employee")
        res.json(rows)
    }catch (error){
        return res.status(500).json({ message: "Something goes wrong"})
    }
}

export const getEmployeeById = async (req, res) => {
    const id = req.params.id
    try{
        const [rows] = await pool.query("SELECT * FROM employee WHERE id = (?)", [id])
        if (rows.length <= 0) return res.status(404).json({ message: "Employee not exist" })
        res.json(rows[0])
    }catch (error){
        return res.status(500).json({ message: "Something goes wrong"})
    }
}

export const createEmployees = async (req, res) => {
    const {name, salary} = req.body
    try{
        const [row] = await pool.query("INSERT INTO employee (name, salary) VALUES (?, ?)", [name, salary])
        res.send({
            id: row.insertId,
            name,
            salary
        })
    }catch (error){
        return res.status(500).json({ message: "Something goes wrong"})
    }
}

export const updateEmployees =  async (req, res) => {
    const {id} = req.params
    const {name, salary} = req.body
    try{ 
        const [result] = await pool.query("UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?", [name, salary, id])
        if( result.affectedRows === 0) return res.status(404).json({ message: "Employee not exist" })
        const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id])
        res.json(rows[0])
    }catch (error){
        return res.status(500).json({ message: "Something goes wrong"})
    }

}

export const deleteEmployees = async (req, res) => {
    const {id} = req.params
    try{
        const [result] = await pool.query("DELETE FROM employee WHERE id = (?)", [id])
        if( result.affectedRows <= 0) return res.status(404).json({ message: "Employee not exist" })
        res.sendStatus(204)
    }catch (error){
        return res.status(500).json({ message: "Something goes wrong"})
    }
}
