import express from 'express';
import Contact from '../models/contact.model.js';

const router = express.Router();

// POST route to store contacts
router.post('/add-contact', async (req, res) => {
  const { email, phone } = req.body;
  
  try {
    const newContact = new Contact({ email, phone });
    await newContact.save();
    res.status(201).send({ success: true, message: 'Contact added successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error adding contact' });
  }
});

// GET route to fetch all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send({ success: true, contacts });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error fetching contacts' });
  }
});

export default router;
