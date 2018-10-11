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


function Product(data) {
  this.data = data;
  this.sortOption = document.querySelectorAll(".sortChange-js");
  var me = this;

  this.sortOption.forEach(function(elem) {
    elem.addEventListener("click", function(e) {
        var sortType = String(e.target.dataset.sort);
        me.sortProducts(sortType);
    });
  });
}

Product.prototype.createItem = function(item){
  var item = item;
  return  "<li>\n                  <div class=\"imgWrap\">\n                    <a href=\"" + item.cover.large + "\">\n                        <img src=\"" + item.cover.small + "\">\n                    </a>\n                  </div>\n                  <div class=\"descWrap\">\n                    <h2>" + item.title + "</h2>\n                    <span class=\"line-divider\"></span>\n                    <span class=\"author-txt\">" + item.author + "</span>\n                    <table class=\"specification\">\n                      <tbody><tr>\n                        <td>Release Date</td>\n                        <td>" + item.releaseDate + "</td>\n                      </tr>\n                      <tr>\n                        <td>Pages</td>\n                        <td>" + item.pages + "</td>\n                      </tr>\n                      <tr>\n                        <td>Link</td>\n                        <td class=\"link-shop\"><a href=\"" + item.link + "\">shop</a></td>\n                      </tr>\n                    </tbody></table>\n                  </div>\n                  <div class=\"clearfix\"></div>\n                </li>";
}

Product.prototype.createItems = function(data){
  var html = '',
      containerSelector = 'itemsContainer';

  for (var item in data) {
      html += this.createItem(data[item]);
  }

  document.getElementById(containerSelector).innerHTML = html;

}

Product.prototype.sortProducts = function(typeSort){
  switch (typeSort) {
    case "page":
        this.createItems(this.sortPage(data));
        break;
    case "data":
        this.createItems(this.sortData(data));
        break;
    case "subname":
        this.createItems(this.subName(data));
        break;
      }
}

Product.prototype.sortPage = function(data){
  var data = data;
  function compare(a,b) {
    if (a.pages < b.pages)
      return -1;
    if (a.pages > b.pages)
      return 1;
    return 0;
  }
  data.sort(compare);

  return data;
}

Product.prototype.sortData = function(data){
  var data = data;
  function compare(a,b) {
    var a = a.releaseDate.split("/");
    var b = b.releaseDate.split("/");
    var data1 = Number(new Date(a[1],a[0]));
    var data2 = Number(new Date(b[1],b[0]));

    if (data1 < data2)
      return -1;
    if (data1 > data2)
      return 1;
    return 0;
  }
  data.sort(compare);

  return data;
}

Product.prototype.subName = function(data){
  var data = data;

  function compare(a,b) {
    var a = a.author.split(" ");
    var b = b.author.split(" ");

    if (a[1] < b[1])
      return -1;
    if (a[1] > b[1])
      return 1;
    return 0;
  }
  data.sort(compare);

  return data;
}

var products = new Product(data);
    products.createItems(data);
