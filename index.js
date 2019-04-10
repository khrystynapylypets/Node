const express = require('express');
const morgan = require('morgan');
const post = require('./data');
const midWare = require('./middlewares');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    await post.getPosts()
        .then(posts => res.json(posts))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            } else {
                res.status(400).json({message: err.message})
            }
        })
});

app.get('/:id', midWare.mustBeInteger, async (req, res) => {
    const id = req.params.id;
    await post.getPost(id)
        .then(post => res.json(post))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            } else {
                res.status(400).json({message: err.message})
            }
        })
});

app.post('/', midWare.checkFieldsPost, async (req, res) => {
    await post.insertPost(req.body)
        .then(post => res.status(201).json({
            message: `The post #${post.id} has been created`,
            content: post
        }))
        .catch(err => res.status(400).json({message: err.message}))
});

app.put('/:id', midWare.mustBeInteger, midWare.checkFieldsPost, async (req, res) => {
    const id = req.params.id;
    await post.updatePost(id, req.body)
        .then(post => res.json({
            message: `The post #${id} has been updated`,
            content: post
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            }
            res.status(400).json({message: err.message})
        })
});

app.delete('/:id', midWare.mustBeInteger, async (req, res) => {
    const id = req.params.id;

    await post.deletePost(id)
        .then(() => res.json({
            message: `The post #${id} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({message: err.message})
            }
            res.status(400).json({message: err.message})
        })
});

app.listen('8080');