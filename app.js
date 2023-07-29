require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const projects = require("./index");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

const contactUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const ContactUser = mongoose.model("ContactUser", contactUserSchema);

app.get("/", (req, res) => {

    res.render("home");
});

app.get("/project", (req, res) => {
    res.render("project", { projects: projects });
})

app.get("/blog", (req, res) => {
    Post.find({})
        .then((posts) => {
            res.render("blog", { posts: posts });
        })
        .catch((err) => {
            console.log(err);
        })

})
app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/contact", (req, res) => {
    const contactUserInfo = new ContactUser({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    contactUserInfo.save()
        .then(() => {
            res.render("success");
        })
        .catch((err) => {
            res.send("There is problem try after sometime!: " + err);
        })
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", (req, res) => {

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save()
        .then((savePost) => {
            console.log("New post added successfully");
            res.redirect("/blog");

        }).catch((err) => {
            console.log(err);
        })
})

app.get("/posts/:postId", (req, res) => {
    const requestedId = req.params.postId;
    Post.findOne({ _id: requestedId })
        .then((post) => {
            res.render("post", {
                title: post.title,
                content: post.content
            })
        })
        .catch((err) => {
            console.log(err);
        })
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port 3000`);
});