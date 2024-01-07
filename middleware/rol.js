const { handleHttpError } = require("../utils/handleError");
/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log(user)
    const rolesByUser = user.role; //TODO ["user"]
    //TODO: ["admin","manager"]
    // se comprara entre arrays para validar que el rol que asigne en ruta es el rol que tiene el usuario
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    ); //TODO: true, false
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRol;