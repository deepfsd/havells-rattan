const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pageRoutes = require('./routes/pages');
app.use('/', pageRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
