//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const express = require("express");
const multiparty = require("connect-multiparty");
//IMPORTS DE LA APP:
const PdfController = require("../controllers/pdf");
const md_auth = require("../middlewares/authenticated");
const md_upload = multiparty({ uploadDir: "./uploads/pdf" });

const api = express.Router();

//MENU ENDPOIND :
api.post("/pdf", [md_auth.asureAuth, md_upload], PdfController.createPdf);
api.get("/pdf", PdfController.getPdfs);
api.patch("/pdf/:id", [md_auth.asureAuth, md_upload], PdfController.updatePdf);
api.delete("/pdf/:id", [md_auth.asureAuth], PdfController.deletePdf);

module.exports = api;
