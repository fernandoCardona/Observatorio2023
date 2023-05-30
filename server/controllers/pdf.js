//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require("fs");
//IMPORTS DE LA APP:
const pdf = require("../utils/pdf");
const Pdf = require("../models/pdf");

const getPdfs = async (req, res) => {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    // === undefined queremos todos los pdf de forma ordenada:
    response = await Pdf.find().sort({ order: "asc" });
  } else {
    // === true queremos solo los pdf activos:
    response = await Pdf.find({ active }).sort({ order: "asc" });
  }
  //console.log(response)
  if (!response) {
    res.status(400).send({ msg: "Error al obtener pdf" });
  } else {
    res.status(200).send(response);
  }
};

const createPdf = async (req, res) => {
  const pdf = new Pdf(req.body);
  console.log("req.body", req.body);
  //Controlamos imagen de avatar:
  if (req.files.pdf) {
    const pdfPath = pdf.getFilePath(req.files.pdf);
    pdf.pdf = pdfPath;
  }

  pdf.save((error, pdfStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el nuevo pdf" });
    } else {
      res.status(201).send({
        msg: "pdf creado correctamente",
        pdfStorage,
      });
    }
  });
};

const updatePdf = async (req, res) => {
  const { id } = req.params;
  const pdfData = req.body;

  console.log(pdfData);

  //Controlamos imagen de avatar:
  if (req.files.pdf) {
    await deletePdfPath(id);
    const pdfPath = pdf.getFilePath(req.files.pdf);
    pdfData.pdf = pdfPath;
  }

  Pdf.findByIdAndUpdate({ _id: id }, pdfData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el pdf" });
    } else {
      res.status(200).send({ msg: "Actualizacion del pdf con exito" });
    }
  });
};

const deletePdf = async (req, res) => {
  const { id } = req.params;

  await deletePdfPath(id);

  Pdf.findByIdAndDelete({ _id: id }, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al borrar el pdf" });
    } else {
      res.status(200).send({ msg: "pdf borrado con exito" });
    }
  });
};

const deletePdfPath = async (id) => {
  console.log("Post", id);
  try {
    const PdfStored = await Pdf.findById(id);
    if (!PdfStored) {
      throw new Error("No se ha encontrado la pdf.");
    }
    const pdfPath = PdfStored.video;
    console.log("PDFPATH", pdfPath);
    fs.unlink(`uploads/${pdfPath}`, (error) => {
      if (error) {
        console.log("Error al borrar el archivo:", error);
      } else {
        console.log("El archivo ha sido borrado correctamente.");
      }
    });
  } catch (error) {
    console.log("Error al borrar el archivo:", error);
  }
};

module.exports = {
  createPdf,
  getPdfs,
  updatePdf,
  deletePdf,
};
