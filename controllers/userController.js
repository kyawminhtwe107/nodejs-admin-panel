const express = require("express");
const User = require("../models/user.model");

const userView = async (req, res, next) => {
    try{
        let users = await User.fetchUser(25, 1);

        res.render('user/user', { users: users[0] })
    }
    catch(err){
        next(err);
    }
}

const userCreateView = async (req, res, next) => {
    res.render('user/create',{title:'Create User View'});
}

const userEditView = async (req, res, next) => {

    const id = req.params.id
    
    try {
        const user = await User.findUser(id);

        res.render('user/edit', { user: user[0][0] })
    }
    catch (err) {
        next(err);
    }
}

// for auth
const signinView = (req, res, next) => {
    res.render('signin', { layout: 'signin' });
}

module.exports = {
    userView,
    signinView,
    userCreateView,
    userEditView
}