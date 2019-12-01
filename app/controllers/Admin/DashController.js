const Controller = require('../Controller.js')
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment=require('../../models/Comment');

class DashController extends Controller {
    //show dashboard
    async index(req, res) {
        //count of users and teachers
        let usersCount = await this.countOfUsers('user');
        let teachersCount = await this.countOfUsers('teacher');

        //count of Posts
        let postsCount=await this.countOfPosts();
        
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

    async countOfUsers(role) {
        try {
            return await User.countDocuments({
                role
            })
        } catch (err) {
            throw err
        }
    }

    async countOfPosts() {
        try {
            return await Post.countDocuments({})
        } catch (err) {
            throw err
        }
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