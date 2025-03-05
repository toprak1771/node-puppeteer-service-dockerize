const express = require("express");
const PuppeteerController = require("../controller/puppeteer");
const PuppeteerService = require("../services/puppeteer");

class PuppeteerRoute {
     path = '/puppeteer';
     router = express.Router();
     puppeteerController = new PuppeteerController(new PuppeteerService());

     constructor() {
        this.initializeRoutes();
     }

     initializeRoutes() {
        this.router.get(`${this.path}`,this.puppeteerController.getData);
     }
}

module.exports = PuppeteerRoute;