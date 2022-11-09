const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const { dirname } = require('path');
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('db connection sucessful');
  });

//Read json

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//import data to database 

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data sucessfully loaded!! :)')
        process.exit()
      }catch(err) {
        console.log(err)
    }
}

const deleteAllData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data sucessfully deleted!! :)')
        process.exit()
    }catch(err) {
        console.log(err)
    }
}

if(process.argv[2] === "--import"){
  importData()
}else if(process.argv[2] === '--delete'){
  deleteAllData()
}

console.log(process.argv)




