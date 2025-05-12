import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var deleteMessage=null;

const BlogEntry=[];
// Middleware
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs"); 
});

app.get("/add_blog",(req,res)=>{
  res.render("add_blog.ejs");
});

app.get("/view",(req,res)=>{
  res.render("view_all.ejs",{blogs:BlogEntry});
});

app.get("/delete",(req,res)=>{
  const messageToShow = deleteMessage;
  deleteMessage = null; // Clear after reading
  res.render("delete.ejs", { message: messageToShow });
});

app.get("/edit",(req,res)=>{
    res.render("edit.ejs",{message:null});
});

app.post("/edit", (req, res) => {
  const titleToEdit = req.body.EditedBlogTitle.trim().toLowerCase();
  const newDesc = req.body.EditedBlogDesc.trim();

  const blog = BlogEntry.find(
    (entry) => entry.title.trim().toLowerCase() === titleToEdit
  );

  if (blog) {
    blog.description = newDesc;
    res.render("edit.ejs", { message: "Blog updated successfully!" });
  } else {
    res.render("edit.ejs", { message: "Blog not found!" });
  }
});

app.post("/delete",(req,res)=>{
  const titleToDelete = req.body.blogTitle.trim().toLowerCase();
  const index = BlogEntry.findIndex(
    (entry) => entry.title.trim().toLowerCase() === titleToDelete
  );
  if(index!=-1){
     BlogEntry.splice(index, 1);
    deleteMessage = "Blog deleted successfully!";
  }else{
    deleteMessage = "Blog not found!";
  }
  res.redirect("/delete");
});

app.post("/submit",(req,res)=>{
  const {blogTitle,blogDesc} = req.body;
  BlogEntry.push({title:blogTitle,description:blogDesc});
  res.redirect("/view");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



