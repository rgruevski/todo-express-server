import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';
import Database from "./conn";

const PORT = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());

// The route for getting a list of all todos
app.get('/todo-list', (req, res) => {
    const client = Database.connectToServer();
    

    res.status(200).json(fakeTodos);
});

// The route for getting a list of all todos with timeout for loading effect
app.get('/todos-delay', (req, res) => {
    setTimeout(() => res.status(200).json(fakeTodos), 2000);
});

// The route for creating a new todo item
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

// To mark a todo as complete
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

// To delete a todo list item
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const removedTodo = fakeTodos.find(todo => todo.id === id);
    fakeTodos = fakeTodos.filter(todo => todo.id !== id);
    res.status(200).json(removedTodo);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
