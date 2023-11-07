const DB_URI = process.env.NODE_ENV === "production" ?
      "mongodb+srv://admin:<password>@nextecom.ceox2yt.mongodb.net/?retryWrites=true&w=majority" :
      "mongodb://localhost:27017/nextecom";

const API = process.env.NODE_ENV === "production"
      ? "https://nextecom-252w61jrj-hervals-projects.vercel.app"
      : "http://localhost:3000/api";   
      
const NEXTAUTH_SECRET = "math_3036";  

const GOOGLE_CLIENT_ID="201979114674-kr0luv3f0msk95h1v73ikh19uc4eco0v.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};      
