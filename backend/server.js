const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const cors = require('cors');
const connectToDb = require('./config/connectToDB')
const helmet = require('helmet')
const rateLimiting = require('express-rate-limit')
const hpp = require('hpp')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(rateLimiting({
  windowMs: 10 * 60 * 1000,
  max: 1200,
}))
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["*", "data:"],
    },
  })
);
app.use(hpp())
app.use(express.json({ limit: '100mb' }))
app.use(cors({
  // origin: 'http://localhost:3000',
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}))
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/students', require('./routes/studentsRoutes'))
app.use('/api/groups', require('./routes/groupsRoutes'))

app.listen(PORT, () => console.log(`app started on port ${PORT}`));
connectToDb()

