import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;