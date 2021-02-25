const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/api/authRoutes');
const articleRoutes = require('./routes/api/articleRoutes')
const { errorHandler }  = require('./middlewares/errorHandler');

const { PORT, NODE_ENV } = process.env;

app.use(express.json());

// Ini middleware untuk logging ketika development
if(NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


app.use(cors({origin: '*'})); // Ini middleware untuk memungkinkan request dari tempat berbeda (bukan localhost:5000) untuk dapat masuk kemari

// Init & config passport
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/articles', articleRoutes);

// Kalau ada error yang di throw atau di next(), maka masuk ke sini.
app.use(errorHandler);

app.listen(PORT || 5000, () => {
  console.log(chalk.blueBright(`Server is running in port ${PORT}`));
})