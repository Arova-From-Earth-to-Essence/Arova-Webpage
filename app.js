const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 5000; // <<< KEEP THIS PORT 5000 FOR NOW

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data for wishlist and cart
const dummyProducts = [
    { id: 1, name: 'Timeless Oudh', description: 'A rich and exotic blend for deep relaxation.', price: 1200, image: '/images/image_7a183d.jpg' },
    { id: 2, name: 'Dreamscape Essences', description: 'A soothing aroma for peaceful sleep.', price: 950, image: '/images/image_7a183d.jpg' },
    { id: 3, name: 'Vitality Boost', description: 'Uplifting citrus notes to energize your day.', price: 800, image: '/images/image_7a183d.jpg' }
];

// Home page route
app.get('/', (req, res) => {
    res.render('home');
});

// Wishlist page route
app.get('/wishlist', (req, res) => {
    const wishlistItems = [dummyProducts[0], dummyProducts[2]];
    res.render('wishlist', { wishlistItems: wishlistItems });
});

// Cart page route
app.get('/cart', (req, res) => {
    const cartItems = [
        { ...dummyProducts[0], quantity: 1 },
        { ...dummyProducts[1], quantity: 2 }
    ];
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 50;

    res.render('cart', { cartItems: cartItems, totalPrice: totalPrice, shippingCost: shippingCost });
});

// Heritage page route
app.get('/heritage', (req, res) => {
    res.render('heritage');
});

// Discover Our Blends Page
app.get('/discover', (req, res) => {
  res.render('discover', { products: dummyProducts });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
