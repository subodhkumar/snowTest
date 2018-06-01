const express = require('express');
const app = express();
const users = require('./datalist');
const path = require('path');

let sortField = '';
let sortOrder = true;

const dataList = [];

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/list', (req, res) => {
  res.send(users.users);
});

app.get('/api/list/pagination/:start/:end', (req, res) => {
  let start = parseInt(req.params.start);
  let end = parseInt(req.params.end);
  if (start >= users.users || end >= users.users) {
    res.send(users.users);
  } else {
    res.send(users.users.slice(start, end));
  }
});

app.get('/api/list/sort/:value', (req, res) => {
  let value = req.params.value;

  if (value === sortField) {
    sortOrder = !sortOrder;
  } else {
    sortOrder = true;
    sortField = value;
  }
  if (value === '') {
    res.send(users.users);
  } else {
    let resultArr = users.users.sort((a, b) => {
      if (a[value] > b[value]) {
        return sortOrder ? 1 : -1;
      } else if (a[value] < b[value]) {
        return sortOrder ? -1 : 1;
      } else {
        return 0;
      }
    });

    console.log('***', sortField, '/', sortOrder);
    res.send(resultArr);
  }
});
app.get('/api/list/filter/:value', (req, res) => {
  let value = req.params.value;
  if (value === '') {
    res.send(users.users);
  } else {
    let filteredUsers = users.users.filter(user => {
      let filtered = false;
      Object.values(user).map(userVal => {
        if (userVal.includes(value)) {
          filtered = true;
        }
      });

      return filtered;
    });

    res.send(filteredUsers);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(5000, () => {
  console.log(' Server Started ');
});
