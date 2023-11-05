const DB_URI = process.env.NODE_ENV === "production" ?
      "mongodb+srv://admin:<password>@nextecom.ceox2yt.mongodb.net/?retryWrites=true&w=majority" :
      "mongodb://localhost:27017/nextecom";

module.exports = {
  DB_URI,
};      
