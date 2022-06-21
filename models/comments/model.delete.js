const db = require("../connection");

const table = "comments";
const sql = {
  deleteOne: `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
};

exports.deleteOneModel = (id) => {
  return new Promise((resolve, reject) => {
    db.query(sql.deleteOne, [id], (err, result) => {
      if (err) {
        reject({ code: 500, message: err.message });
      } else {
        if (result.rowCount === 0) {
          reject({
            code: 400,
            message: "Failed to delete, user not found!",
          });
        }
        resolve({ request: result.rows });
      }
    });
  });
};