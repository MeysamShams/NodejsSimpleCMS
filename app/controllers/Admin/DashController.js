const Controller = require('../Controller.js')

const UserCtr=require('./UserController')
const PostCtr=require('./PostController')

const Comment=require('../../models/Comment.js')

class DashController extends Controller {
    //show dashboard
    async index(req, res) {
        //count of users and teachers
        let usersCount = await UserCtr.countOfUsers('user');
        let teachersCount = await UserCtr.countOfUsers('teacher');

        //count of Posts
        let postsCount=await PostCtr.countOfPosts();
        
        //count of comments
        let commentsCount=await this.countOfComments();

        res.render("admin/home", {
            title: "پیشخوان ",
            usersCount,
            teachersCount,
            postsCount,
            commentsCount
        })
    }

    

    

    async countOfComments() {
        try {
            return await Comment.countDocuments({})
        } catch (err) {
            throw err
        }
    }

}

module.exports = new DashController()