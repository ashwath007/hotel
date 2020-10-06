const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        req.category = cate;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res) => {
    console.log(req.category);

    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    console.log("Update category : ", req.body.name);
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category"
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    console.log("Delete category");
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message: "Successfull deleted"
        });
    });
};



//shaji
//ADMIN
exports.admincategory = (req, res) => {
    console.log("category");
    console.log(req.body);
    //Here we are saving the category
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }

        console.log(category);

        res.json({ category });
    });
};


//shaji
exports.admingetAllCategory = (req, res) => {
    console.log("All Category")
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(categories);
    });
};

exports.getsCategory = (req, res) => {
    console.log("hit");

    console.log(req.params.cateId);
};