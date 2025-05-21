const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

  app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
  })


const menuSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    cost: {type: Number, required: true},
    isAvailable: {type: Boolean, default: true},
    description: {type: String, default: 'No description'},
   })
// Define the model for the menu
   const menu = mongoose.model("menu", menuSchema, "Menu")

// Define a POST route at /menu/test that adds a test menu item to the database
app.post("/menu/test", async (req, res)=> {
    const menu1 = new menu({
      name: "",
      cost: 5,
      isAvailable: true,
      description: "No description",
    }).save()
    res.json(menu1);
  })

  

// Define a GET route at /menu that returns all menu items as a JSON
  app.get('/menu', async (req, res) => {
    const items = await menu.find({});
    res.render("menu.ejs", { menu: items });})


    app.get('/menu/items/:name', async (req, res) => {
    const itemsName = req.params.name;
    const foodItem = await menu.findOne({name: itemName});
    res.render("items.ejs", { item: foodItem });})


// Define a POST route at /menu/new that adds a new menu item
app.post("/menu/new", async (req, res)=> {
    const menu1 = new menu({
      name: req.body.name,
      cost: req.body.cost,
      isAvailable: req.body.isAvailable,
      description: req.body.description,
    }).save()
    res.json(menu1);
  })
// Admin Page
  app.delete('/delete/menu/:id', async (req, res) =>{
    const response = await menu.findOneAndDelete({_id: req.params.id})
    res.json(response)
  })
//Admin Page
  app.patch("/patch/menu/:id", async (req, res) => {
    const response = await menu.findOneAndUpdate({ id: req.params._id }, 
    req.body, {new: true})
    res.json(response);
    });
    
// //async function prepopulateDb() {
//     try {
//           Feel free to change the names you want to populate
//         await menu.insertMany([
//             { name: "Crab" },
//             { name: "Fried Fish" },
//             { name: "Tostones" },
//             { name: "Fries" },
//             { name: "Maduros" },
//         ]);

//         console.log('Food names added successfully!');
//     } catch (err) {
//         console.error('Error prepopulating database:', err);
//     }
// }


async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.zc3jx.mongodb.net/corey?retryWrites=true&w=majority&appName=Cluster0");

  //prepopulateDb();

    app.listen(3000, () => {
        console.log(`Server running.`);
    });

  }
 startServer();