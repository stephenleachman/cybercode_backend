// const http = require('http');
// const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

// 
// const fs = require('fs');

// const httpsOptions = {
//   cert: fs.readFileSync('ssl/cybercode_dev.crt'),
//   ca: fs.readFileSync('ssl/cybercode_dev.ca-bundle'),
//   key: fs.readFileSync('ssl/cybercode_dev.key')
// };


const app = express();

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(httpsOptions, app);

// app.use((req, res, next) => {
//   if(req.protocol === 'http') {
//      res.redirect(301, `https://${req.headers.host}${req.url}`);
//    }
//    next();
// });

// Vew Engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/pricing', (req, res) => {
  res.render('pricing');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/get_started', (req, res) => {
  res.render('get_started');
});

app.get('/login', (req, res) => {
  res.render('login');
});








// contact Form //
app.post('/email_sent', (req, res) => {
  const output = `
    <h2>You have a new contact request.</h2>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  async function main(){

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: '', 
        pass: '' 
      },
      tls: {
        rejectUnauthorized:false
      }
    });

    let mailOptions = {
      from: '"CyberCode Contact" <>', 
      to: "stephen@cybercode.dev",
      subject: "CyberCode - Contact Request", 
      html: output 
    };
    
    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg: 'Email has been sent!'});
  }
    main().catch(console.error);
});


// Client Brief Form //
app.post('/brief_sent', (req, res) => {
  const output = `
    <h2>You have a new Client Brief.</h2>
    <h2>Company Details</h2>
    <ul>
      <li>Clients Name: ${req.body.clients_name}</li>
      <li>Company Name: ${req.body.company_name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone Number: ${req.body.phone}</li>
    </ul>

    <h3>Company Adderss:</h3>
    <ul>
      <li>Cuntry: ${req.body.cuntry}</li>
      <li>Street: ${req.body.street}</li>
      <li>City: ${req.body.city}</li>
      <li>Zip Code: ${req.body.zip_code}</li>
    </ul>

    <h3>Business Description:</h3>
    <p>${req.body.business_description}</p>

    <h3>Other Info:</h3>
    <ul>
      <li>Current Website: ${req.body.website}</li>
    </ul>

    <h3>Cumpany Branbing:</h3>
    <ul>
      <li>Logo: ${req.body.logo}</li>
      <li>Colorss: ${req.body.colors}</li>
      <li>Fonts: ${req.body.fonts}</li>
    </ul>

    <br>

    <h2>Project Details</h2>
    <ul>
      <li>Project Name: ${req.body.project_name}</li>
      <li>Project Category: ${req.body.project_category}</li>
    </ul>

    <h3>Project Description:</h3>
    <p>${req.body.project_description}</p>

    <h3>Project Requirements:</h3>
    <p>${req.body.project_requirements}</p>

    <h3>Project Funtionality:</h3>
    <p>${req.body.project_funtionality}</p>

    <h3>Project Inspiration:</h3>
    <p>${req.body.project_inspiration}</p>
    
    <ul>
      <li>Future Scail: ${req.body.futureScail}</li>
      <li>Budget $: ${req.body.budget}</li>
    </ul>
  `;

  async function main(){

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: '', 
        pass: '' 
      },
      tls: {
        rejectUnauthorized:false
      }
    });

    let mailOptions = {
      from: '"CyberCode Client Brief" <>', 
      to: "stephen@cybercode.dev",
      subject: "CyberCode - Client Brief", 
      html: output 
    };
    
    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('brief_sent');
  }
    main().catch(console.error);
});




// httpServer.listen(80, 'cybercode.dev');
// httpsServer.listen(443, 'cybercode.dev');
app.listen(3000, () => console.log('Server Started...'));