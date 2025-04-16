const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");
const loginRoutes = require("./routes/loginRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const path = require('path');
const app = express();
app.use(express.json());
connectDB();

app.use(cors());

app.use("/api/request", requestRoutes);
app.use("/api", loginRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/medicine", medicineRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
