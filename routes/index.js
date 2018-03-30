const express = require('express');
const router = express.Router();
const { insertProcess } = require('../db/model/process');

/* GET home page. */
router.get('/', function (req, res, next) {
  const process = {
    "process": {
      "court": "Comarca de Lisboa - Barreiro",
      "act": "Pub. - Sentença Declaração Insolvência",
      "reference": "373234152",
      "processDetails": {
        "number": "260/18.0T8BRR",
        "place": "Juízo de Comércio do Barreiro - Juiz 3",
        "judgement": "3"
      },
      "species": "Insolvência pessoa singular (Apresentação)",
      "date": "01/02/2018"
    },
    "people": [
      {
        "title": "Insolvente",
        "name": "António Fernando Correia da Cruz",
        "nif": " 179140833",
        "type": "INSOLVENTE"
      },
      {
        "title": "Administrador Insolvência",
        "name": "Carlos Manuel Prieto Machado Correia Pinto",
        "nif": " 224200070",
        "type": "ADMINISTRADOR_INSOLVENCIA"
      },
      {
        "title": "Credor",
        "name": "Caixa Geral de Depósitos",
        "nif": " 500960046",
        "type": "CREDOR"
      }
    ]
  };

  insertProcess(process);

  res.render('index');
});

module.exports = router;
