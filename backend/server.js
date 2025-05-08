const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`server running on port ${port}: Portfolio Web App`);
})

app.listen(port, () => {
console.log(`server running at http://localhost:${port}`)
});
