# mongoose-flat
![build status](https://travis-ci.org/zhangkaiyulw/mongoose-flat.svg?branch=master)

Flatten user input according to mongoose schema. It preserves your mixed type.

# Usage

```js
const flat = require('mongoose-flat');
const User = mongoose.model('User');

flat(userInput, User);
```

# Install

```bash
npm install mongoose-flat --save
```
