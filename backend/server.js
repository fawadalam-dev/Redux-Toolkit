import express from 'express';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'DELETE'],
}));
let products = [
    {
        id: 1,
        name: 'Dell Laptop',
        imageURL: "",
        price: 10.99,
        description: 'This is Dell Laptop',
    },

    {
        id: 2,
        name: 'HP Laptop',
        imageURL: "",
        price: 12.99,
        description: 'This is HP Laptop',
    },
];
app.get('/products', (req, res) => {
    res.json(products);
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        imageURL: req.body.imageURL,
        price: req.body.price,
        description: req.body.des
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});
app.listen(8000, () => {
    console.log('Server is Running on port 8000');
});