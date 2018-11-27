var recipes = {};

const getRecipesInitial = function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      JSON.parse(this.responseText).forEach(function (recipe) {
        let id = recipe._id;
        recipes[id] = {
          ...recipe
        };
      //  console.log(recipe);
         $("#itemContainer").append("<li data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"list-group-item\" id=\""+id+"\" name=\""+recipe.label+"\"><img src="+recipe.image+" style=\"height:5vw; width:5vw; margin-right: 2vw;\"></img><span>"+recipe.label+"</span><span class=\"badge badge-info\" style=\"float:right\" >"+Math.round(recipe.calories * 100) / 100+" Calories</span></li>");
      })

    }
  }
   xhttp.open("GET", "http://35.153.138.183:3000/products/loadRecipes", true);
   xhttp.send();

}


$(function () {
  getRecipesInitial();
})

$('#exampleModal').on('show.bs.modal', function (event) {
  var li = $(event.relatedTarget) // Button that triggered the modal
  //console.log(event.relatedTarget);

  var name = li.attr("name");
  var id = li.attr("id")
  console.log(name);

  $("#ingredient-list").empty();
  $("#tags").empty();

  console.log(recipes[id]);
  recipes[id].ingredients.forEach(function (ingredient) {
    $("#ingredient-list").append("<li>"+ingredient.text+"</li>")
  })

  recipes[id].dietLabels.forEach(function (label) {
    //$("#recipe-tags").append("<span class=\"badge badge-pill badge-primary\">"+label+"</span>")
    $("<span class=\"badge badge-pill badge-primary\" style=\"margin-top:1vw; margin-right:1vw;\">"+label+"</span>").appendTo("#ingredient-list")
  })

  Object.keys(recipes[id].totalNutrients).forEach(function (tn) {
    let obj = recipes[id].totalNutrients[tn];
    $("<span class=\"badge badge-pill badge-secondary\" style=\"margin-top:1vw; margin-right:1vw;\">"+obj.label+" "+Math.round(obj.quantity * 100) / 100+" "+obj.unit+"</span>").appendTo("#ingredient-list")
  })


  //var recipient = li.relatedTarget // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text(name + ' Recipe')
  modal.find('.modal-body input').val(li)
})
