import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.post('/guests', async (req, res) => {
    try {
        const { fio, presence, peopleCount, alcogols } = req.body;

        const result = await pool.query(
            `INSERT INTO guests (fio, presence, people_count, alcogols)
       VALUES ($1, $2, $3, $4::text[]) RETURNING *`,
            [fio, presence, peopleCount, alcogols]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Ошибка при добавлении гостя:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/guests', async (req, res) => {
    const result = await pool.query('SELECT * FROM guests ORDER BY id DESC');
    res.json(result.rows);
});

app.delete('/guests/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM guests WHERE id = $1', [id]);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
