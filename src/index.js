const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

const PORT = process.env.PORT || 8080; // Use PORT from env (Cloud Run) or default to 8080

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init()
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ Error starting server:', err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    console.log('🔄 Shutting down gracefully...');
    db.teardown()
        .catch(() => {})
        .then(() => {
            console.log('✅ Cleanup complete. Exiting.');
            process.exit();
        });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
