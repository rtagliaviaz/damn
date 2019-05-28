const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());


// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} 

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });    
  }
  
  const file = req.files.file;
  const fileMimeType = req.files.file.mimetype; 
 
  
//comparing mime-type
  if ( (fileMimeType !== 'image/jpeg') && (fileMimeType != 'image/png') )  {    
    return res.status(400).json({ msg: 'The extension file must be ".jpg", ".png" or ".jpeg"' });
  } else {  
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        
    });
  }
});

//listen server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port ${port}`));


