class PuppeteerController {
  _puppeteerService;
  constructor(puppeteerService) {
    this._puppeteerService = puppeteerService;
  }
  getData = async (req, res, next) => {
    try {
      const {
        query: { url },
      } = req;
      if (!url) res.send("Url is required.");
      const getArticles = await this._puppeteerService.getNewsWordCounts(url);
      return res.status(200).json({
        data: getArticles,
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
}

module.exports = PuppeteerController;
