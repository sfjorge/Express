const express = require('express');
const router  = express.Router();
const members = require('../../members.js');
const uuid = require('uuid');

// this route gets all members
router.get('/api/members', (req,res) => res.json(members));

//get single member
router.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    // res.send(req.params.id);
    // res.json(members.filter(member => member.id == req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({msg: 'No member with ID of ' + req.params.id});
    }
    
});

// create a member
router.post('/', (req, res) => {
    // res.send(req.body);   -->   returns/responds data that was given/requested
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "Please include name and email"}); // if there is not else statement, we get error "headers already sent"... return takes care of that
    }

    members.push(newMember);
    res.json(members); // returns entire new array of members
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updatedMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;

                res.json({ msg: 'Member updated', member});
            }
        });   
    }
    else {
        res.status(400).json({msg: 'No member with ID of ' + req.params.id});
    }
});

// delete member
router.delete(':id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Member deleted', 
            members: members.filter(member => member.id === parseInt(req.params.id))
    });
    }
    else {
        res.status(400).json({msg: 'No member with ID of ' + req.params.id});
    }
});

module.exports = router;