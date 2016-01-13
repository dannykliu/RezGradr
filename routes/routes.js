'use strict'
module.exports = function(express, app, multer){
    
    //Configure some routes 
    let router = express.Router();

    router.get('/', function(req, res){
        //terminate the connection with the server with a res.render method 
        res.render('index', {});
    })
    
    router.get('/rating', function(req, res){
        res.render('rating', {});
    })

    //dest: './danny/uploads/'
//    multer({storage: multer.diskStorage({
//              destination: function (req, file, cb) {
//                cb(null, './danny/uploads')
//              },
//              filename: function (req, file, cb) {
//                cb(null, file.originalname);
//              }
//            })
//        })
    router.post('/upload', multer({storage: multer.diskStorage({
              destination: function (req, file, cb) {
                cb(null, './public/resumes')
              },
              filename: function (req, file, cb) {
                cb(null, file.originalname);
              }
            })
        }).single('resume'), function(req, res){
                console.log(req.file);
                console.log(req.file.originalname);
                //instead of using sessions to keep track of the variable, I cheated and used a queryString
                //this works because the data we want to send is a string, but if it's an object, we would have to use sessions instead
                //res.render('rating', {name: req.file.filename});
                res.redirect('rating?name=' + req.file.filename);
    })
    
    app.use('/', router)  
}
