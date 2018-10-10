var data = [
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/9780596517748/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/9780596517748/cat.gif"
    },
    "title": "JavaScript: The Good Parts",
    "author": "Douglas Crockford",
    "releaseDate": "12/2008",
    "pages": 172,
    "link": "http://shop.oreilly.com/product/9780596517748.do"
  },
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/9780596000486/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/9780596000486/cat.gif"
    },
    "title": "JavaScript: The Definitive Guide",
    "author": "David Flanagan",
    "releaseDate": "11/2001",
    "pages": 936,
    "link": "http://shop.oreilly.com/product/9780596000486.do"
  },
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/0636920025832/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/0636920025832/cat.gif"
    },
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "releaseDate": "08/2012",
    "pages": 254,
    "link": "http://shop.oreilly.com/product/0636920025832.do"
  },
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/0636920027713/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/0636920027713/cat.gif"
    },
    "title": "JavaScript Enlightenment",
    "author": "Cody Lindley",
    "releaseDate": "12/2012",
    "pages": 166,
    "link": "http://shop.oreilly.com/product/0636920027713.do"
  },
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/0636920033141/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/0636920033141/cat.gif"
    },
    "title": "Programming JavaScript Applications",
    "author": "Eric Elliott",
    "releaseDate": "07/2014",
    "pages": 254,
    "link": "http://shop.oreilly.com/product/0636920033141.do"
  },
  {
    "cover": {
      "large": "https://covers.oreillystatic.com/images/0636920047124/lrg.jpg",
      "small": "https://covers.oreillystatic.com/images/0636920047124/cat.gif"
    },
    "title": "Practical Modern JavaScript",
    "author": "Nicolas Bevacqua",
    "releaseDate": "07/2017",
    "pages": 334,
    "link": "http://shop.oreilly.com/product/0636920047124.do"
  }
];

// -------------------------


function Product(data){
  this.data = data;
}

Product.prototype.createItem = function(item){
  var item = item;
  return  "<li>\n                  <div class=\"imgWrap\">\n                    <a href=\"" + item.cover.large + "\">\n                        <img src=\"" + item.cover.small + "\">\n                    </a>\n                  </div>\n                  <div class=\"descWrap\">\n                    <h2>" + item.title + "</h2>\n                    <span class=\"line-divider\"></span>\n                    <span class=\"author-txt\">" + item.author + "</span>\n                    <table class=\"specification\">\n                      <tbody><tr>\n                        <td>Release Date</td>\n                        <td>" + item.releaseDate + "</td>\n                      </tr>\n                      <tr>\n                        <td>Pages</td>\n                        <td>" + item.pages + "</td>\n                      </tr>\n                      <tr>\n                        <td>Link</td>\n                        <td class=\"link-shop\"><a href=\"" + item.link + "\">shop</a></td>\n                      </tr>\n                    </tbody></table>\n                  </div>\n                  <div class=\"clearfix\"></div>\n                </li>";
}

Product.prototype.createItems = function(){
  var html = '',
      containerSelector = 'itemsContainer';

  for (var item in this.data) {
      html += this.createItem(this.data[item]);
  }

  document.getElementById(containerSelector).innerHTML = html;

}

var products = new Product(data);
    products.createItems();
