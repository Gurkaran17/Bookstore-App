import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";



import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"

const app = express();

const allowedOrigins = ["https://bookstoreapp-1-nx1r.onrender.com","http://localhost:5173"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
  allowedHeaders: 'Content-Type',
  credentials: true,
  
}));
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Conected to mongoDB");
} catch (error) {
  console.log("Error:",error)
  
}

app.use("/book",bookRoute);
app.use("/user",userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});