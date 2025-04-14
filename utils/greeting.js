function getRoleGreeting(user) {
    if (!user) {
        console.log('User is not authenticated.');
        return null;
    }

    const { role, username } = user;  

    switch (role) {
        case 'admin':
            return `Welcome, Admin! ${username}`; 
        case 'member':
            return `Welcome, Member! ${username}`;
        default:
            return `Welcome, User! ${username}`;
    }
}

module.exports = {
    getRoleGreeting
};