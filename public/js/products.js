var recoveredUPC = {}
// 034000011346
// 747599306655
// 070847876564 no sirve
// 017000016870 no sirve
// 016000507661
const getProductsInitial = function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      JSON.parse(this.responseText).forEach(function (item) {
        //console.log(item._id);
        let id = item._id;
        recoveredUPC[item._id] = {
          name: item.food.label,
          count: item.count,
          food: item.food
         }
         $("#itemContainer").append("<li class=\"list-group-item\" id=\""+id+"\"><span>"+id + "   "+recoveredUPC[id].name+"</span><span class=\"badge badge-success\" style=\"float:right\" id="+id+"-count>"+recoveredUPC[id].count+"</span></li>");
      })

    }
  }
   xhttp.open("GET", "http://35.153.138.183:3000/products/loadProducts", true);
   xhttp.send();

}

const removeProduct = function (upca) {
  if(recoveredUPC[upca]){
    $("#"+upca+"-count").empty();
    if(recoveredUPC[upca].count > 0){
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://35.153.138.183:3000/products/removeProduct", true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send("code="+upca);
      --recoveredUPC[upca].count;
      $("#"+upca+"-count").append(recoveredUPC[upca].count) ;
    }
    if (recoveredUPC[upca].count == 0) {
      $("#"+upca).hide();
    }
  }

}

const getProduct = function(upca) {
  if(recoveredUPC[upca]){
     $("#"+upca).show();
     $("#"+upca+"-count").empty();
     $("#"+upca+"-count").append(++recoveredUPC[upca].count) ;
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "http://35.153.138.183:3000/products/addProduct", true);
     xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     xhttp.send("code="+upca);
  }
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(JSON.parse(this.responseText).body);
        console.log(result);
        let id = result.text.split(':')[1];
        recoveredUPC[id] = {
          name: result.hints[0].food.label,
          count : 1
        }
        $("#itemContainer").append("<li class=\"list-group-item\" id=\""+id+"\"><span>"+id + "   "+recoveredUPC[id].name+"</span><span class=\"badge badge-success\" style=\"float:right\" id="+id+"-count>"+recoveredUPC[id].count+"</span></li>");
      }
    }
    xhttp.open("POST", "http://35.153.138.183:3000/products/item", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("code="+upca);
  }

}


$("#upcConfirm").click(function () {
    getProduct($("#upcText").val().trim())
})

$("#upcRemove").click(function () {
    removeProduct($("#upcText").val().trim())
})


$(function () {
  getProductsInitial();
})
