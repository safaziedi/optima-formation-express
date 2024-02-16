const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../helpers/jwt');

    /**
     * @openapi
     * '/user/register':
     *  post:
     *     tags:
     *     - User
     *     summary: Create a User
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - pwd
     *            properties:
     *              name:
     *                type: string
     *              email:
     *                type: string
     *                format: email
     *                example: user@example.com
     *              pwd:
     *                type: string
     *              phone:
     *                type: string
     *              role:
     *                type: string
     *                enum: [CLIENT, MODERATOR, ADMIN]
     *     responses:
     *      201:
     *        description: Registration successful
     *      409:
     *        description: User already registered
     *      500:
     *        description: Server Error
     */
router.post('/register', UserController.createUser);

    /**
     * @openapi
     * '/user/login':
     *  post:
     *     tags:
     *     - User
     *     summary: Create a User
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - pwd
     *            properties:
     *              email:
     *                type: string
     *                format: email
     *                example: user@example.com
     *              pwd:
     *                type: string
     *     responses:
     *      200:
     *        description: login succeced
     *      400:
     *        description: Wrong password
     *      404:
     *        description: User not found
     *      500:
     *        description: Server Error
     */
router.post('/login', UserController.login);

    /**
     * @openapi
     * '/user/all':
     *  get:
     *     tags:
     *     - User
     *     summary: Get all users
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get('/all', verifyToken,UserController.getAllUsers);


    /**
     * @openapi
     * '/user/{id}':
     *  get:
     *     tags:
     *     - User
     *     summary: Get user by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get('/:id', UserController.getUserById)

/**
     * @openapi
     * '/user/{id}':
     *  put:
     *     tags:
     *     - User
     *     summary: Modify a user
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     requestBody:
     *      required: false
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *              icon:
     *                type: string
     *              color:
     *                type: string
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.put('/:id', UserController.updateUser) 

    /**
     * @openapi
     * '/user/{id}':
     *  delete:
     *     tags:
     *     - User
     *     summary: Delete user by id
     *     parameters:
     *      - name: id
     *        in: path
     *        description: The id of the user
     *        required: true
     *     responses:
     *      200:
     *        description: Deleted Successfully
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
router.delete('/:id', verifyToken, isAdmin, UserController.deleteUser)

module.exports = router;