const users = []

function userJoin(id, room){
    const user = {id, room };

    users.push(user)

    return user;
}


function getCurrentUser(id) {
    return users.find(user => user.id === id);
}


module.exports = {
    userJoin,
    getCurrentUser
}