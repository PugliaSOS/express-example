var app = require('express')();

app.use(require('body-parser').json());

arr = [
    {
        name: 'iphone',
        ram: 100
    },
    {
        name: 'samsung',
        ram: 200
    },
    {
        name: 'lumia',
        ram: 50
    }
]

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', function(req, res) {
    var arr2 = [];
    console.log(req.query);
    if (req.query && req.query.ram) {

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ram >= req.query.ram) {
                arr2.push(arr[i]);
            }
        }
    } else {
        arr2 = arr;
    }

    res.json(arr2);
});

app.get('/api/:name', function(req, res) {
    var found;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === req.params.name) {
            found = arr[i];
        }
    }

    if (found) {
        res.json(found);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api', function(req, res){
    var found;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === req.body.name) {
            found = arr[i];
        }
    }

    if (found) {
        res.sendStatus(500);
    } else {
        arr.push(req.body);
        res.sendStatus(201);
    }
});

app.listen(8000);
