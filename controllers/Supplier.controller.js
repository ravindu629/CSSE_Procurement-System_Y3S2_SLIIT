const Supplier = require("../models/Supplier.model");

const addSupplier = (req, res) => {
  const { name, address, phone, email, password } = req.body;

  const supplier = new Supplier({
    name,
    address,
    phone,
    email,
    password,
  });

  supplier
    .save()
    .then((createdSupplier) => {
      res.json(createdSupplier);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSupplier = async (req, res) => {
  const supId = req.params.id;

  try {
    const supplier = await Supplier.findById(supId);
    res.json(supplier);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateSupplier = async (req, res) => {
  const supId = req.params.id;

  try {
    const sup = await Supplier.findById(supId);

    if (!sup) {
      return res.status(404).json("There is no supplier to update");
    }

    const { name, address, phone, email, password } = req.body;

    const updatedSup = await Supplier.findByIdAndUpdate(supId, {
      name,
      address,
      phone,
      email,
      password,
    });

    res.status(200).json(updatedSup);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeSupplier = async (req, res) => {
  const supId = req.params.id;

  try {
    const sup = await Supplier.findById(supId);

    if (!sup) {
      return res.status(404).json("There is no user to remove");
    }

    const removedSup = await Supplier.findByIdAndDelete(supId);
    res.status(200).json(removedSup);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const validateSupplier = async (req, res) => {
  const supName = req.body.name;
  const pass = req.body.password;

  try {
    const foundUser = await Supplier.findOne({ name: supName });

    if (!foundUser) {
      return res.status(404).json("invalid user");
    } else if (foundUser.password === pass) {
      return res.status(200).json(true);
    } else {
      return res.status(404).json("incorrect password");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addSupplier,
  validateSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
  removeSupplier,
};
