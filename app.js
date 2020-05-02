const express = require('express');
const path = require('path');
const app = express();

let CONTACTS = [
  {id: 1, name: 'Илья', value: '+7(978)034-89-37', marked: false}
];

app.use(express.json());

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);
});

app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: Date.now(), marked: false};
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id != req.params.id);
  res.status(202).json({message: 'Контакт удален'});
});

app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id == req.params.id);
  CONTACTS[idx] = req.body;
  res.status(202).json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})

app.listen(3333, () => {
  console.log('Server has been started...');
});