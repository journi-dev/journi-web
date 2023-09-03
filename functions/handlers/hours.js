const { db } = require("../util/admin");

exports.updateHours = (req, res) => {
  const newHours = {
    lastUpdated: new Date(),
    sunday: req.body.sunday,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
  };

  db.doc(`/organizations/uncle-johns/businessInfo/${req.params.hoursType}Hours`)
    .set(newHours)
    .then((doc) => {
      return res.status(200).json(newHours);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Something went wrong.", body: newHours });
    });
};

exports.getHours = (req, res) => {
  let hoursData = {};

  db.doc(`/organizations/uncle-johns/businessInfo/${req.params.hoursType}Hours`)
    .get()
    .then((doc) => {
      hoursData = doc.data();
      return res.status(200).json(hoursData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong." });
    });
};
