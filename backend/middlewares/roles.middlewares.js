import { User } from "../models/user.models.js";
const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    //    const { role } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    const role = user.role;

    if (!roles.includes(role)) {
      return res.status(401).json({
        success: false,
        message: "You do not have permission to view this route",
      });
    }
    next();
  };

export default authorizedRoles;
//call like authorizedRoles("ADMIN") as like upload.single()
