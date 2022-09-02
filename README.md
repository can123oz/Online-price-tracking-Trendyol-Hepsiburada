HEPSİBURADA AND TRENDYOL PRICE TRACKING.

I created an API with basic crud operations that you can update the products url for tracking price.
After giving urls bot is tracking the prices every at every 10 seconds.
Right now it only shows the last prices without push notification or emails.
You need to use mongodb for storing my models.

It saves the prices and dates every 10 seconds. So you can always check from mongodb or with postman.

After the last update 02.09.2022 :

I comment the lines out with e-mail integration.
API endpoints are,

http://localhost:8080/product ---(GET)-->  To get all the titles of the products and URLs of the web sites of hepsiburada and trendyol, the order is important because of scraping.

http://localhost:8080/product/id ---(GET)--> To get a spesific group that we scrape and compare product between hepsiburada and trendyol.

http://localhost:8080/product ---(POST)--> for adding a new group of product in the same web pages.

http://localhost:8080/product/id ---(DELETE)--> to delete the spesific group that you dont want to scrape anymore.

http://localhost:8080/product/id ---(PUT)--> updating the model.

http://localhost:8080/pricehistory ---(GET)--> Price history in every scraping.