const express = require('express');
const path = require('path');
const app = express();

const CONTACTS = [
  {id: 1, name: 'Илья', value: '+7(978)034-89-37', marked: false}
];

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);

})



app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})

app.listen(3333, () => {
  console.log('Server has been started...');
});