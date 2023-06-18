// const { generateRandomId } = require("../../src/utils/Helpers");
const { db } = require("../util/admin");

exports.addMultipleToMenu = (request, response) => {
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

  request.body.forEach((menuItem) => {
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
      menuCategory: menuItem.menuCategory,
      itemCategory: menuItem.itemCategory,
    };

    const newMenuItemRef = db.doc(
      `/organizations/uncle-johns/menu/${newMenuItemData.id}`
    );
    batch.create(newMenuItemRef, newMenuItemData);
  });

  batch
    .commit()
    .then(() => {
      return response.json({ message: "Menu options successfully updated." });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getMenu = (request, response) => {
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
          menuCategory: doc.data().menuCategory,
          itemCategory: doc.data().itemCategory,
        });
      });
      return response.json(menu);
    })
    .catch((err) => {
      console.error(err);
    });
};
