const DB_URI = process.env.NODE_ENV === "production" ?
      "mongodb+srv://admin:<password>@nextecom.ceox2yt.mongodb.net/?retryWrites=true&w=majority" :
      "mongodb://localhost:27017/nextecom";

const API = process.env.NODE_ENV === "production"
      ? "https://xxx.vercel.com/api"
      : "http://localhost:3000/api";   
      
const NEXTAUTH_SECRET = "math_3036";      

module.exports = {
  DB_URI,
  API,
};      
