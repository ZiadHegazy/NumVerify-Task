
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const dotenv=require("dotenv")
dotenv.config();
const MongoURI =  process.env.database;

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
})
const searchSchema = new Schema({
  id:{
    type:Number,
  
  },
  phoneNumber:{
    type:String
  },
  date:{
    type:String
  },
  status:{
    type:String
  }
}, { timestamps: true });

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;