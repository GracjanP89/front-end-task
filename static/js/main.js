// -------------------------


function Product() {
  this.sortOption = document.querySelectorAll(".sortChange-js");
  this.pageSortInput = document.querySelector("#pageSortInput");
  this.clearBtnSelector = document.querySelector("#clearResult");
  this.itemView = document.querySelector("#itemsContainer");
  this.body = document.querySelector("body");
  var me = this,
      timeout;

  this.sortOption.forEach(function(elem) {
    elem.addEventListener("click", function(e) {
        var sortType = String(e.target.dataset.sort);
        if(window.localStorage) {
            localStorage.sortType = sortType;
          }
        me.sortProducts(sortType);
    });
  });


      this.pageSortInput.addEventListener("keydown", function(e) {

      var keycode = e.which || e.keyCode;
      if (!(e.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
      e.preventDefault();
      }

      if(timeout) {
          clearTimeout(timeout);
          timeout = null;
      }
      timeout = setTimeout( function() {
          me.createItems(me.pageFilter(data));
      },  1000);
  });

  this.body.addEventListener ("keydown", function (e) {
    var keycode = e.which || e.keyCode;

    if (e.altKey && keycode == 114) {
      me.itemView.innerHTML = "";
    }
    return false;
  });


  this.clearBtnSelector.addEventListener("click", function() {
      me.itemView.innerHTML = "";
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
        data = this.sortPage(data);
        var dataRender = data;
        this.createItems(this.pageFilter(dataRender));
        break;
    case "data":
        data = this.sortData(data);
        var dataRender = data;
        this.createItems(this.pageFilter(dataRender));
        break;
    case "subname":
        data = this.subName(data);
        var dataRender = data;
        this.createItems(this.pageFilter(dataRender));
        break;
      }
}

Product.prototype.sortPage = function(data){
  var dataFilter = this.pageFilter(data);
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
  var dataFilter = this.pageFilter(data);
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
  var dataFilter = this.pageFilter(data);

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

Product.prototype.pageFilter = function(data){
  var valuePagesLimit = Number(document.querySelector("#pageSortInput").value);
  var filterData = data.filter(function(item){
    if( item.pages > valuePagesLimit){
      return item;
    }
  });

  if(window.localStorage) {
      localStorage.pageFilter = String(valuePagesLimit);
  }

  return filterData;
}

Product.prototype.localcheckedSortType = function(sortType){
  this.sortOption.forEach(function(elem) {
    if(elem.getAttribute('data-sort') == sortType){
      elem.setAttribute("checked", "checked");
    }
  });
}

var products = new Product(data);
    if(!(localStorage.pageFilter) && !(localStorage.sortType)){
      products.createItems(data);
    } else {
      if(localStorage.sortType){
        if(localStorage.pageFilter){
          var localPageFilter = localStorage.getItem('pageFilter');
          this.pageSortInput.value = localPageFilter;
        }
        var localSortType = localStorage.getItem('sortType');
        products.sortProducts(localSortType);
        products.localcheckedSortType(localSortType);
      }
    }
