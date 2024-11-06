 const express = require('express');
const mongoose = require('mongoose');

//const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');


//const LocalStrategy = require('passport-local').Strategy;


const app = express();
const port = 3000;
//const flash = require('connect-flash');
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
const uri = 'mongodb://localhost:27017/login';

app.use(express.static('public'));



mongoose.connect(uri)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error('Connection error', err));

    const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String ,required:true},
        email: { type: String, required: true, unique: true },
       
      });

      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'public', 'index.html'));
    });
    // UserSchema.methods.validPassword = function(password) {
    //   return bcrypt.compareSync(password, this.password);  // Use bcrypt for password comparison
    // };
    const User = mongoose.model('User', userSchema);
     module.exports = User;

      

    app.post('/save-user', async (req, res) => {
        try {
            // Create a new user from the form data
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,  
            });
    
            // Save the user in the MongoDB collection
            await newUser.save();
    
            res.send(`<h2>Usersaved successfully!</h2>`);
                    //res.sendFile(__dirname+"/public/index.html")
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send('Error saving user');
        }
    });

// fetching the data  for sign in authentication

// const userAuto = new mongoose.Schema({
//     name: { type: String, required: true },
//     password: { type: String ,required:true},
    
   
//  });
//  const newUser = mongoose.model('User', userAuto);



//  async function findUserByUsername(name, password) {
//     try {
//       // Look for a user with the matching name and password
//       const user = await User.findOne({ name: name });
//       return user;
//     } catch (err) {
//       throw err;
//     }
//   }



  // app.post('/allow-user', async (req, res) => {
  //   try {
  //       // Create a new user from the form data
  //       const nUser = {
  //           name: req.body.name,
            
  //           password: req.body.password,  
  //       };
  //       const user = await findUserByUsername(nUser.name, nUser.password);
        
  //       //call th efindone function;
    
  //   if (user) {
  //       // If the user is found, you can respond accordingly
  //       console.log('User found:', user);
  //       res.sendFile(path.join(__dirname,'public', 'about.html'))
  //     } else {
  //       // If no user is found, send a "not found" response
  //       console.log('User not found');
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //   } catch (err) {
  //     // Handle errors
  //     console.error('Error occurred:', err);
  //     res.status(500).json({ message: 'An error occurred', error: err });
  //   }
  // });
  app.use('/', require('./routes'));


    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
