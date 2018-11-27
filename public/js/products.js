var recoveredUPC = {}

const getProduct = function(upca) {
   console.log($('#upc:033919000458').length);
   if(recoveredUPC['upc:'+upca]){
     console.log('test');
     recoveredUPC['upc:'+upca].count++;
     $("#upc:"+upca+"-count").text =recoveredUPC['upc:'+upca].count ;
   }
   else{
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         var result = JSON.parse(JSON.parse(this.responseText).body);
         console.log(result);
         //console.log(JSON.parse(result).text);
         recoveredUPC[result.text] = {
           name: result.hints[0].food.label,
           count : 1
         }

         $("#itemContainer").append("<li class=\"list-group-item\" id=\""+result.text+"\"><span>"+recoveredUPC[result.text].name+"</span><span class=\"badge badge-success\" style=\"float:right\" id="+result.text+"-count>"+recoveredUPC[result.text].count+"</span></li>");

      }
    }

      xhttp.open("POST", "http://localhost:3000/products/item", true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send("code="+upca)
  };

}


$("#upcConfirm").click(function () {
    getProduct($("#upcText").val())
})
