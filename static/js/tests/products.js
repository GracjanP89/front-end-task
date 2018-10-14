var Products = function(){}


Products.prototype.sortPage = function(data){
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

Products.prototype.sortData = function(data){
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

Products.prototype.subName = function(data){
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

Products.prototype.pageFilter = function(data){
  var valuePagesLimit = 300;
  var filterData = data.filter(function(item){
    if( item.pages > valuePagesLimit){
      return item;
    }
  });
  
  return filterData;
}


module.exports = Products;
