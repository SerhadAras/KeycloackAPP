var fs = require('fs');
path = require('path'),
    filePath = path.join(__dirname, "/scrumboard.json");
console.log(__dirname)
console.log(filePath)
    // json file with the data
var data = fs.readFileSync(filePath);
var jsonData = JSON.parse(data)

var storypoints = jsonData['storypoints']
var storyboards = jsonData['storyboard']

const express = require("express");
const app = express();
const port = 3000

// To solve the cors issue
const cors = require('cors');
app.use(express.json())
app.listen(port,
    () => console.log("Server Start at the Port 3000"));

app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});
app.get('/storypoints', function(req, res) { res.send(storypoints) });
app.get('/storyboards', function(req, res) { res.send(storyboards) });
app.post('/storyboard', function(req, res) {
    const { title, estimation, priority } = req.body
    let storyboard = {
        "id": storyboards.Lenght + 1,
        "title": title,
        "estimation": estimation,
        "state": 0,
        "priority": priority
    };
    storyboards.push(storyboard)
    jsonData['storyboard'] = storyboards
    let data = JSON.stringify(jsonData, null, 2);

    fs.writeFile('./scrumboard.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});
app.delete('/storyboard/:id', function(req, res) {
    const id = req.params.id
    storyboardsfilterd = storyboards.filter(word => word.id !== id);
    console.log(id)
    console.log(storyboards)
    console.log(storyboardsfilterd)

    jsonData['storyboard'] = storyboards
    let data = JSON.stringify(jsonData, null, 2);

    fs.writeFile('./scrumboard.json', data, (err) => {
        if (err) throw err;
        console.log('Data deleted');
    })
});