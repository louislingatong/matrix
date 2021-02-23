const app = require('./app');

// Start the server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));