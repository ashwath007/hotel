const express = require("express");
const router = express.Router();

const {
    getCategoryById,
    createCategory,
    getCategory,
    admincategory,
    getAllCategory,
    updateCategory,
    removeCategory,
    admingetAllCategory
} = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//create
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);
router.post("/admin/create/category", admincategory)
router.get("/admin/show/category", admingetAllCategory)

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);
router.delete(
    "/category/delete/:categoryId",

    removeCategory
);
router.put(
    "/category/:categoryId/update",
    updateCategory
);


//update
// router.put(
//     "/category/:categoryId/:userId",
//     isSignedIn,
//     isAuthenticated,
//     isAdmin,
//     updateCategory
// );

//delete



module.exports = router;