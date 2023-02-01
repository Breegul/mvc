require("dotenv").config(); // Load env variables from the file into the actual environment
const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})