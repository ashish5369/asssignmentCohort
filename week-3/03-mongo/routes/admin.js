const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = express.Router();

// Admin Routes

//this mean if someone write in /admin/signup it will come to the below rout
router.post('/signup', (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;
    //create the user 
    Admin.create({
        username: username,
        password: password
    })

        .then(function () {
            res.json({
                msg: 'Admin created sucessfully'
            })

        })

});
//here we used the asyn await syntax
router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.title;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        messgae: "Course created successfully", courseId: newCourse._id
    })
});

//here we are using the promises concept, no such reason jut for learning purpose
router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    //this reaturn all the courses
    Course.find({})

        //if we wanted th e couurse with fee above 600 then we coulh have done
        // Course.find({
        //     price:600
        // })
        // and this would have returned all courses above 500

        .then(function (response) {
            res.json({
                courses: response
            })
        })


});



router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    //this reaturn all the courses
    Course.find({})

        //if we wanted th e couurse with fee above 600 then we coulh have done
        // Course.find({
        //     price:600
        // })
        // and this would have returned all courses above 500

        .then(function (response) {
            res.json({
                courses: response
            })
        })


});
// router.get('/courses', adminMiddleware, async (req, res) => {
//         //if we wanted th e couurse with fee above 600 then we coulh have done
//         // Course.find({
//         //     price:600
//         // })
//         // and this would have returned all courses above 500

//       res.json({
// message:response
// })  




module.exports = router;