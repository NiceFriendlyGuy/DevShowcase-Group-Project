require('./config/db.config');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const projectRoutes = require('./routes/projects.route');
const accountRoutes = require('./routes/accounts.route');

app.get('/', (req, res) => {
    res.send(`server running on port ${port}: Portfolio Web App`);
})

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/accounts', accountRoutes);

app.listen(port, () => {
console.log(`server running at http://localhost:${port}`);
});
