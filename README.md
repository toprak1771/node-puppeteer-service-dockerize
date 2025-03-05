docker build -t node-puppeteer . ile projeyi build aldıktan sonra
docker run -p 3000:3000 node-puppeteer ile calıstırablirsiniz.

Haber sitesinden haber başlıkları ve içerikdeki kelime sayısını hesaplayan servis şu an https://www.bbc.com/news bu url'ye göre ayarlanmıştır.

Proje çalıştıktan sonra /puppeteer?url=https://www.bbc.com/news apisi'ne query olarak ilgili url'yi göndererek datayı alabilirsiniz.
