import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import accout from "./routes/account";

const app = express();

app.use(cors());
app.use(express.json());

app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

app.use("/account", accout);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});