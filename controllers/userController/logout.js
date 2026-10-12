
export const logout = async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout Successful"
    });
};