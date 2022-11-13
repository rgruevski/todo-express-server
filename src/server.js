import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import FetchForms from "./FetchForms";

const PORT = 9090;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// The route for getting a list of all forms
app.get('/forms', (req, res) => {
    res.status(200).send(new FetchForms());
});

// The route for creating a new form item
app.post('/forms', (req, res) => {
    const { text } = req.body;
    if (text) {
        const insertedForm = {
            id: uuid(),
            createdAt: Date.now(),
            isCompleted: false,
            text,
        }
        fakeForms.push(insertedForm);
        res.status(200).json(insertedForm);
    } else {
        res.status(400).json({ message: 'Request body should have a text property' });
    }
});

// To delete a form list item
app.delete('/forms/:id', (req, res) => {
    const { id } = req.params;
    const removedForm = fakeForms.find(form => form.id === id);
    fakeForms = fakeForms.filter(form => form.id !== id);
    res.status(200).json(removedForm);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
