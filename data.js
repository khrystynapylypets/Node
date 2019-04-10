let posts = require('./data.json');
const filename = './data.json';
const helperFunc = require('./functions.js');

const getPosts = () => {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(posts)
    })
};
const getPost = (id) => {
    return new Promise((resolve, reject) => {
        helperFunc.beInArray(posts, id)
            .then(post => resolve(post))
            .catch(err => reject(err))
    })
};

const insertPost = (newPost) => {
    return new Promise((resolve, reject) => {
        const id = { id: helperFunc.getNewId(posts) };
        const date = {
            createdAt: helperFunc.newDate(),
            updatedAt: helperFunc.newDate()
        };
        console.log(date);
        newPost = { ...id, ...date, ...newPost };
        console.log(newPost);
        posts.push(newPost);
        helperFunc.writeJSONFile(filename, posts);
        resolve(newPost)
    })
};

const updatePost  = (id, newPost) => {
    return new Promise((resolve, reject) => {
        helperFunc.beInArray(posts, id)
            .then(post => {
                const index = posts.findIndex(p => p.id === post.id);
                id = { id: post.id };
                const date = {
                    createdAt: post.createdAt,
                    updatedAt: helperFunc.newDate()
                };
                posts[index] = { ...id, ...date, ...newPost };
                helperFunc.writeJSONFile(filename, posts);
                resolve(posts[index])
            })
            .catch(err => reject(err))
    })
};

const deletePost = (id) => {
    return new Promise((resolve, reject) => {
        helperFunc.beInArray(posts, id)
            .then(() => {
                posts = posts.filter(p => p.id != id);
                helperFunc.writeJSONFile(filename, posts);
                resolve()
            })
            .catch(err => reject(err))
    })
};

module.exports = {
    insertPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
};