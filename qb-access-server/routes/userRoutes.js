router.route("/").post(userController.createNewUser);
router.use(verifyJWT);
router
  .route("/")
  .get(userController.getAllUsers)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/one").post(userController.getOneUser);
router
  .route("/image")
  .post(upload.single("image"), userController.updateUserImage);
module.exports = router;
