const Controller = require('../Controller.js')
const User = require('../../models/User');
const Post = require('../../models/Post');

class DashController extends Controller {
    //show dashboard
    async index(req, res) {
        //count of users and teachers
        let usersCount = await this.countOfUsers('user');
        let teachersCount = await this.countOfUsers('teacher');

        //count of Posts
        let postsCount=await this.countOfPosts();

        res.render("admin/home", {
            title: "پیشخوان ",
            usersCount,
            teachersCount,
            postsCount
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

}

module.exports = new DashController()