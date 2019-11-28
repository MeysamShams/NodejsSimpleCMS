//express 
const express=require('express');
const app=express();

const http=require('http')
//body parser
const bodyParser=require('body-parser');
// mongoose
const mongoose=require('mongoose');
//express session
const session=require('express-session');
//Store session in DB
const mongoStore=require('connect-mongo')(session);
//flash message
const flash=require('connect-flash');

//ejs layouts
const expressLayouts = require('express-ejs-layouts');

const passport=require('passport')

//local variable
const Locals=require('./helpers/Locals')

module.exports=class App{
    constructor(){
        this.serverSetup();
        this.mongoConnention();
        this.appConfig();
        this.setRoutes();
    }

    //set server config
    serverSetup(){
        http.createServer(app)
            .listen(process.env.PORT,()=>console.log(`Server is running on http://localhost:${process.env.PORT}`))
    }

    //mongo connection
    mongoConnention(){
        mongoose.connect(process.env.DB_URL,{useUnifiedTopology:true,useNewUrlParser:true})
        mongoose.Promise=global.Promise
    }

    //main config
    appConfig(){
        //passport 
        require("./passport/Local-auth")
        require("./passport/Google-auth")
        //set view engine
        app.set('view engine',process.env.VIEW_ENGINE);
        app.set("layout" , "layout.ejs");
        app.use(expressLayouts)

        //Public directory
        app.use(express.static(process.env.PUBLIC_DIR));

        //sessions
        app.use(session({
            resave:true,
            saveUninitialized:true,
            secret:process.env.SESSION_SECRET,
            store:new mongoStore({mongooseConnection:mongoose.connection})
            
        }))

        //body parser
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json())

        //flash message
        app.use(flash());

        //passport 
        app.use(passport.initialize());
        app.use(passport.session())

        //set local 
        app.use((req,res,next)=>{
            app.locals=new Locals(req,res).helpers();
            next()
        })

    }

    setRoutes(){
        app.use(require('./routes/web/IndexRoutes.js'))
    }


}