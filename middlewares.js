const mustBeInteger = (req, res, next) => {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({message: 'ID must be integer'});
    }
    else {
        next();
    }
};

const checkFieldsPost = (req, res, next) => {
    const {title, content} = req.body;

    if(title && content) {
        next();
    }
    else {
        res.status(400).json({message: 'fields are not good'});
    }
};

module.exports = {
    mustBeInteger,
    checkFieldsPost
};