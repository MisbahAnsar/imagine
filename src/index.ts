import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.get('/', (req, res) => {
  res.send("Hello World");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
