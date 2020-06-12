const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/dev')
const cookieSession = require('cookie-session');
require('./models/Items');
require('./models/Cart');
require('./models/Users');
require('./models/Payments')
require('./services/passportGitHub');

const app = express();

app.use(bodyParser.json())

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 *60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/itemRoutes')(app);
require('./routes/payRoutes')(app);
require('./routes/cartRoutes')(app);   
require('./routes/userRoutes')(app);
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);



const port = process.env.PORT || 5000;

app.listen(port)