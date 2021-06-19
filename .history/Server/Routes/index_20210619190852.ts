import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type index controller
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayProjectsPage, DisplayRegisterPage, DisplayServicesPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET projects page. */
router.get('/projects', DisplayProjectsPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);

/* GET - display login page. */
router.get('/login', DisplayLoginPage);

/* POST - process login page when user hits Login Button */
router.post('/login', ProcessLoginPage);

/* GET - display register page. */
router.get('/register', DisplayRegisterPage);

/* POST - process register page when user hits Register Button */
router.post('/register', ProcessRegisterPage);

/* GET - process the logout page */
router.get('/logout', ProcessLogoutPage);

//module.exports = router;
