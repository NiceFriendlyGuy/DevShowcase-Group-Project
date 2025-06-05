require('./config/db.config');

const cors = require('cors');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const projectRoutes = require('./routes/projects.route');
const profileRoutes = require('./routes/profiles.route');
const authRoutes = require('./routes/auth.route');
const userRequestsRoutes = require('./routes/userRequests.route');
const statisticsRoutes = require('./routes/statistics.route')

app.get('/', (req, res) => {
    res.send(`server running on port ${port}: Portfolio Web App`);
})

app.use(express.json());
app.use(cors());

app.use('/api/projects', projectRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', userRequestsRoutes);
app.use('/api/stats', statisticsRoutes);

app.listen(port, () => {
console.log(`server running at http://localhost:${port}`);
});
