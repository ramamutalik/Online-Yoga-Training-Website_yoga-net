
require('../models/database')
const Testomonials = require('../models/Testomonials')
const Calender = require('../models/calender')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const axios = require('axios')

exports.homepage = async(req,res) => {

    try{
        const testLimit = 3;
        const testObjs= await Testomonials.find({}).limit(testLimit);
        res.render('index',{title:'Yoga.Net - Index',testObjs});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}



exports.aboutus = async(req,res) => {

    try{
        res.render('aboutUs',{title:'Yoga.Net - AboutUs'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}



exports.contact = async(req,res) => {

    try{
        res.render('contact',{title:'Yoga.Net - ContactUs'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}


exports.onlineClass = async(req,res) => {

    try{
        res.render('onlineClass',{title:'Yoga.Net - onlineClass'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}


exports.recorded = async(req,res) => {

    try{
        res.render('recordedClass',{title:'Yoga.Net - recordedClass'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.calender = async(req,res) => {

    try{
        axios.get("http://localhost:3000/calender/api/month")
        .then(function(response){
            
            res.render('calenderEvent',{title:'Yoga.Net - calenderEvent',cal: response.data});
        })
        .catch(err =>{
            res.send(err)
        })
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.calenderMonth = async(req,res) => {

    try{
        res.render('add_month',{title:'Yoga.Net - add_month'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.calenderUMonth = async(req,res) => {

    try{
        axios.get('http://localhost:3000/calender/api/month',{params:{id:req.query.id}})
        .then(function(caldata){
            res.render('update_month',{title:'Yoga.Net - update_month',cal:caldata.data})
        })
        .catch(err => {
            res.send(err)
        })
       
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.login = async(req,res) => {

    try{
        res.render('login');
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.signup = async(req,res) => {

    try{
        res.render('signup',{title:'Yoga.Net - signup'});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.postsignup = async(req,res) => {

    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            req.flash('error','All fields are required')
            req.flash('name',name)
            req.flash('email',email)
            return res.redirect('/signup');
        }

        //check if email exits
        User.exists({email: email},(err,result)=> {
            if(result){
                req.flash('error','Email already taken')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/signup');
            }
        })

        //hash password
        const hashedPassword = await bcrypt.hash(password,10)
        //create a user
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        user.save().then(()=>{
            //login
           return  res.redirect('/login')
        }).catch(err =>{
            req.flash('error','something went wrong')
            return res.redirect('/signup');
        })

    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}


exports.postlogin = async(req,res,next) => {

    try{
        passport.authenticate('local',(err,user,info) => {
            if(err){
                req.flash('err',info.message)
                return next(err)
            }
            if(!user){
                req.flash('err',info.message)
                return res.redirect('/login')
            }

            req.logIn(user,(err) =>{
                if(err){
                    req.flash('err',info.message)
                    return next(err)
                }

                return res.redirect('/')
            })
        })(req,res,next)
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.logout = async(req,res) => {

    try{
        req.logout((err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/login')
        })
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}


//create month
exports.create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "content can not be empty"});
        return;
    }

    const mon= new Calender({
        month : req.body.month,
        year: req.body.year,
        date: req.body.date,
        day: req.body.day,
        timing: req.body.timing
    })

    //save month
    mon
    .save(mon)
    .then(data => {
        // res.send(data)
        req.flash('mes',"Month added")
        res.redirect('/calender/addMonth',{title:'Yoga.Net - new Month'})
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || " some error occured"
        });
    });

}

//
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Calender.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not found month with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch( err => {
            res.send(500).send({message: "Error retriving user with id :"+id})
        })
    }else{
    Calender.find()
    .then(mon => {
        res.send(mon)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "error occured while retriving the month"})
    })
}
}

exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "data to update can not be empty"})
    }
    const id = req.params.id;
    Calender.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: 'cannot update month with ${id}. maybe month not found'})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "error update month information"})
    })
}

exports.delete=(req,res)=>{
    const id = req.params.id;

    Calender.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: 'cannot delete with this ${id}. maybe id is wrong '})
        }else{
            res.send({
                message:'user was deleted successfully!'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "could not delete id =" + id
        });
    });
}