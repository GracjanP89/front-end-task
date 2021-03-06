// -------------------------


function Products() {
  this.sortOption = document.querySelectorAll(".sortChange-js");
  this.pageSortInput = document.querySelector("#pageSortInput");
  this.clearBtnSelector = document.querySelector("#clearResult");
  this.itemView = document.querySelector("#itemsContainer");
  this.body = document.querySelector("body");
  this.overlaySelector = document.querySelector("#overlay");
  this.closeBtnSelector = document.querySelector("#close-icon");
  this.largeImgSelector = document.querySelector("#largeImg");
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

  document.addEventListener ('keydown',  function(e){
    //Alt-R pressed
    if (e.altKey  &&  ( (window.event) ? e.key ==="r" : e.code === "KeyR")) {
        me.cleanSort();
    }
    // e.stopPropagation ();
    // e.preventDefault ()
  });


  this.clearBtnSelector.addEventListener("click", function() {
      me.cleanSort();
  });

  document.addEventListener('click',function(e){
    if(e.target && e.target.className == 'imgLarge'){
        var imgLink = e.target.getAttribute('data-large');
        me.showOverlay(imgLink);
      }
    });

    this.closeBtnSelector.addEventListener('click',function(e){
      me.overlaySelector.style.display = "none";
      me.largeImgSelector.setAttribute("src", "");
    });

}


//////////// object method

Products.prototype.cleanSort = function(){

  this.pageSortInput.value = 0;
  if(window.localStorage) {
      localStorage.pageFilter = "0";
  }

  this.sortOption.forEach(function(elem) {
      elem.setAttribute("checked", "false");
  });

  if(window.localStorage) {
    localStorage.removeItem('sortType');
  }

  this.createItems(notEditableData);
}

Products.prototype.showOverlay = function(linkImg){
    this.largeImgSelector.setAttribute("src", linkImg);
    this.overlaySelector.style.display = "block";
}

// creating html item
Products.prototype.createItem = function(item){
  var item = item;
  return  "<li>\n<div class=\"imgWrap\">\n<a>\n<img class='imgLarge' data-large=\"" + item.cover.large + "\" src=\"" + item.cover.small + "\">\n</a>\n</div>\n<div class=\"descWrap\">\n<h2>" + item.title + "</h2>\n                    <span class=\"line-divider\"></span>\n                    <span class=\"author-txt\">" + item.author + "</span>\n                    <table class=\"specification\">\n                      <tbody><tr>\n                        <td>Release Date</td>\n                        <td>" + item.releaseDate + "</td>\n                      </tr>\n                      <tr>\n                        <td>Pages</td>\n                        <td>" + item.pages + "</td>\n                      </tr>\n                      <tr>\n                        <td>Link</td>\n                        <td class=\"link-shop\"><a href=\"" + item.link + "\">shop</a></td>\n                      </tr>\n                    </tbody></table>\n                  </div>\n<div class=\"clearfix\"></div>\n                </li>";
}

Products.prototype.createItems = function(data){
  var html = '',
      containerSelector = 'itemsContainer';

  for (var item in data) {
      html += this.createItem(data[item]);
  }

  document.getElementById(containerSelector).innerHTML = html;

}

Products.prototype.sortProducts = function(typeSort){
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

Products.prototype.sortPage = function(data){
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

Products.prototype.sortData = function(data){
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

Products.prototype.subName = function(data){
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

Products.prototype.pageFilter = function(data){
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

Products.prototype.localcheckedSortType = function(sortType){
  this.sortOption.forEach(function(elem) {
    if(elem.getAttribute('data-sort') == sortType){
      elem.setAttribute("checked", "checked");
    }
  });
}


/////////////////////////////////////////////////////////////////////

var products = new Products(); //  --------------------------- init App

// checking old data from localStorage , display as init values if exist
    if(!(localStorage.pageFilter) && !(localStorage.sortType)){
      products.createItems(notEditableData);
    } else {
      if(localStorage.sortType){
        if(localStorage.pageFilter){
          var localPageFilter = localStorage.getItem('pageFilter');
          this.pageSortInput.value = localPageFilter;
        }
        var localSortType = localStorage.getItem('sortType');
        products.sortProducts(localSortType);
        products.localcheckedSortType(localSortType);
      } else {
        products.createItems(notEditableData);
      }
    }
