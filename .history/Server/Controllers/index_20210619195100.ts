import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

//create an instance from the user model 
import User from '../Models/user';


// Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home' });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about'  });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects'  });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services'  });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact'  });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if (!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage') });   
    }
    
    return res.redirect('/clothing-list');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err, user, info) => {
        
        //check if there are servers errors
        if (err) {
            console.error(err);
            return next(err);
        }

        //check if there are login errors
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        //check if there are database errors
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            return res.redirect('/clothing-list');
        });
    })(req, res, next);
    
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if (!req.user)
    {
        res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage') });   
    } 
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    //instantiate a new User Object
    let newUser = new User
    ({
        userName: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if (err)
        {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistError")
            {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        //after successful registration - login the user
        return passport.authenticate('local')(req, res, () => 
        {
            return res.redirect('/clothing-list');
        })

    });


}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();

    return res.redirect('/login');


}

