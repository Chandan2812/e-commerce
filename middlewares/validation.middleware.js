
const validateUser = (req, res, next) => {
    const { email, password } = req.body;

    // Check email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address!' });
    }

    // Check password format
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
    }

    next();
};

module.exports = { validateUser };
