const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a new table with the updated fields
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    age INTEGER NOT NULL,
    city TEXT NOT NULL,
    created_at TEXT NOT NULL
)`);

// **GET all users**
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// **GET a user by ID**
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
});

// **POST a new user**
app.post('/users', (req, res) => {
    const { age, city } = req.body;

    if (!age || !city) {
        return res.status(400).json({ error: 'Age and city are required' });
    }

    const createdAt = new Date().toISOString();

    db.run('INSERT INTO users (age, city, created_at) VALUES (?, ?, ?)', [age, city, createdAt], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, age, city, created_at: createdAt });
    });
});

// **UPDATE a user by ID**
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { age, city } = req.body;

    if (!age && !city) {
        return res.status(400).json({ error: 'At least one field (age or city) is required to update' });
    }

    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        const fieldsToUpdate = [];
        const values = [];

        if (age) {
            fieldsToUpdate.push('age = ?');
            values.push(age);
        }
        if (city) {
            fieldsToUpdate.push('city = ?');
            values.push(city);
        }

        values.push(id);

        db.run(`UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`, values, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User updated', id, age: age || row.age, city: city || row.city });
        });
    });
});

// **DELETE a user by ID**
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User deleted successfully', id });
        });
    });
});

// Gracefully close the database connection on exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
