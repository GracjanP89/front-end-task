var Products = require('./../static/js/tests/products.js');

var dataPages = [
  {
    "pages": 936,
  },
  {
    "pages": 254,
  },
  {
    "pages": 166,
  },
  {
    "pages": 334,
  }
];

var dataPagesResult = [
  {
    "pages": 166,
  },
  {
    "pages": 254,
  },
  {
    "pages": 334,
  },
  {
    "pages": 936,
  }
];



describe('products', function(){
  var products = new Products();
  it('should sort by pages values', function(){
      expect(products.sortPage(dataPages)).toEqual(dataPagesResult);
  })
});



//--------------------------------------------------------


var dateStart = [
  {
    "releaseDate": "12/2008"
  },
  {
    "releaseDate": "11/2001"
  },
  {
    "releaseDate": "08/2012"
  }
];

var dateSortResult = [

  {
    "releaseDate": "11/2001"
  },
  {
    "releaseDate": "12/2008"
  },
  {
    "releaseDate": "08/2012"
  }
];



describe('products', function(){
  var products = new Products();
  it('should sort by releaseDate', function(){
      expect(products.sortData(dateStart)).toEqual(dateSortResult);
  })
});


//--------------------------------------------------------

var startName = [
  {
    "author": "David Flanagan"
  },
  {
    "author": "Douglas Crockford"
  },
  {
    "author": "Addy Osmani"
  },
  {
    "author": "Eric Elliott"
  }
];

  var startNameResult = [
    {
      "author": "Douglas Crockford",
    },
    {
      "author": "Eric Elliott"
    },
    {
      "author": "David Flanagan",
    },
    {
      "author": "Addy Osmani",
  }];


describe('products', function(){
  var products = new Products();
  it('should sort by releaseDate', function(){
      expect(products.subName(startName)).toEqual(startNameResult);
  })
});


///////////////////////////////////

var pagesFilterStart = [
  {
    "pages": 172
  },
  {
    "pages": 936
  },
  {
    "pages": 254
  },
  {
    "pages": 166
  },
  {
    "pages": 254
  },
  {
    "pages": 334
  }
];

var pagesFilterResult = [
  {
    "pages": 936
  },
  {
    "pages": 334
  }
];

describe('products', function(){
  var products = new Products();
  it('should show bigger than 300 pages', function(){
      expect(products.pageFilter(pagesFilterStart)).toEqual(pagesFilterResult);
  })
});
