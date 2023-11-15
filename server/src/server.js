const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://20110374:khanhtran29072002@cluster0.nnndzfa.mongodb.net/?retryWrites=true&w=majority";
const server = http.createServer(app);
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`listen on port ${PORT}...`);
  });
}
startServer();
// app.listen();

console.log(PORT);
