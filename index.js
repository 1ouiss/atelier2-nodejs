const express = require('express');
const app = express();
const port = 8000;

const render = (res, error) => {
    res.render('cart', {user: user, menu: menu, cart: cart, error: error, totalCart: totalCart});
};

const menu = [
    { id: 1, name: "plat du jour", price: 19.90, category: "lunch" },
    { id: 2, name: "Sandwidch", price: 6, category: "lunch" },
    { id: 3, name: "milkshake", price: 3, category: "boisson" },
    { id: 4, name: "coca", price: 2, category: "boisson"},
    { id: 5, name: "biere", price: 7, category: "alcohol" }
];
let user = {};
const cart = [];
let totalCart = 0;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {title: 'Home'});
});

app.get('/signin', (req, res) => {
    user = req.query;
    render(res, '');
});

app.get('/addtocart', (req, res) => {
    const item = menu.find(item => item.id == req.query.id);
    if (item.category === "alcohol" && user.age < 18) {
        render(res, "Vous n'avez pas l'âge requis pour commander de l'alcool");
    }
    else {
        if (user.total - item.price < 0) {
            render(res, "Vous n'avez pas assez d'argent pour commander cet article");
        }
        else {
            totalCart += item.price;
            user.total -= item.price;
            cart.push(item);
            render(res, '');
        }
    }
});

app.get('/removefromcart', (req, res) => {
    console.log(req.query);
    cart.forEach((item, index) => {
        if (index == req.query.id) {
            user.total += item.price;
            totalCart -= item.price;
            cart.splice(index, 1);
        }
    });
    render(res, '');
});

app.listen(port, () => {    
    console.log(`App listening on port ${port}`);
});