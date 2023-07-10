const { db } = require("../util/admin");

exports.addMultipleToMenu = (req, res) => {
  let batch = db.batch();

  function generateId(length) {
    const charArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomChar =
        charArray[Math.floor(Math.random() * charArray.length)];
      result += randomChar;
    }
    return result;
  }

  req.body.forEach((menuItem) => {
    const newMenuItemData = {
      createdAt: new Date(),
      id: generateId(4),
      name: menuItem.name,
      description: menuItem.description,
      size1Price: menuItem.size1Price,
      size2Price: menuItem.size2Price,
      size3Price: menuItem.size3Price,
      size4Price: menuItem.size4Price,
      singleSizePrice: menuItem.singleSizePrice,
      category: menuItem.category,
      subcategory: menuItem.subcategory,
    };

    const newMenuItemRef = db.doc(
      `/organizations/uncle-johns/menu/${newMenuItemData.id}`
    );
    batch.create(newMenuItemRef, newMenuItemData);
  });

  batch
    .commit()
    .then(() => {
      return res.json({ message: "Menu options successfully updated!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.getMenu = (req, res) => {
  db.collection("organizations/uncle-johns/menu")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      const menu = [];
      data.forEach((doc) => {
        menu.push({
          id: doc.id,
          createdAt: doc.data().createdAt,
          name: doc.data().name,
          description: doc.data().description,
          size1Price: doc.data().size1Price,
          size2Price: doc.data().size2Price,
          size3Price: doc.data().size3Price,
          size4Price: doc.data().size4Price,
          singleSizePrice: doc.data().singleSizePrice,
          category: doc.data().category,
          subcategory: doc.data().subcategory,
        });
      });
      return res.json(menu);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.deleteMenuItem = (req, res) => {
  const document = db.doc(
    `/organizations/uncle-johns/menu/${req.params.menuItemId}`
  );

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Menu item not found." });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Menu item deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.name });
    });
};

exports.deleteMenuItems = (req, res) => {
  let batch = db.batch();
  let menuItems = req.params.menuItems.split("-");

  menuItems.forEach((menuItem) => {
    batch.delete(db.doc(`/organizations/uncle-johns/menu/${menuItem}`));
  });

  batch
    .commit()
    .then(() => {
      return res.json({ message: "Menu options successfully deleted!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.name });
    });
};

exports.renameMenuItems = (req, res) => {
  const menuItems = req.params.menuItems.split("-");
  const categoryType = req.params.categoryType;

  const [category, subcategory] = [req.body.category, req.body.subcategory];
  let batch = db.batch();

  menuItems.forEach((menuItem) => {
    const menuItemRef = db.doc(`/organizations/uncle-johns/menu/${menuItem}`);
    batch.update(
      menuItemRef,
      categoryType === "subcategory"
        ? { subcategory }
        : categoryType === "category"
        ? { category }
        : {}
    );
  });

  batch
    .commit()
    .then(() => {
      return res.json({ message: "Menu category successfully renamed!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.name });
    });
};
