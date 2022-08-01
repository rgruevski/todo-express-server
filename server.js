import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// The route for getting a list of all todos
app.get('/todos', (req, res) => {
    res.status(200).json(fakeTodos);
});

// The route for getting a list of all todos, but with a delay to display the loading component
app.get('/todos-delay', (req, res) => {
    setTimeout(() => res.status(200).json(fakeTodos), 2000);
});

// The route for creating new todo-list items
app.post('/todos', (req, res) => {
    const { text } = req.body;
    if (text) {
        const insertedTodo = {
            id: uuid(),
            createdAt: Date.now(),
            isCompleted: false,
            text,
        }
        fakeTodos.push(insertedTodo);
        res.status(200).json(insertedTodo);
    } else {
        res.status(400).json({ message: 'Request body should have a text property' });
    }
});

app.post('/todos/:id/completed', (req, res) => {
    const { id } = req.params;
    const matchingTodo = fakeTodos.find(todo => todo.id === id);
    const updatedTodo = {
        ...matchingTodo,
        isCompleted: true,
    }
    if (updatedTodo) {
        fakeTodos = fakeTodos.map(todo =>
            todo.id === id
                ? updatedTodo
                : todo);
        res.status(200).json(updatedTodo);
    } else {
        res.status(400).json({ message: 'There is no todo with that id' });
    }
})

// The route for deleting a todo-list item
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const removedTodo = fakeTodos.find(todo => todo.id === id);
    fakeTodos = fakeTodos.filter(todo => todo.id !== id);
    res.status(200).json(removedTodo);
});

app.listen(8080, () => console.log("Server listening on port 8080"));
