
//ack

var price = [8.99, 10.99, 9.99, 11.99, 10.99, 12.99, 9.99, 11.99, 10.99, 12.99, 11.99, 13.99
                        , 10.99, 12.99, 11.99, 13.99, 12.99, 14.99];
            var totalCost = 0;
            var display = [
                "PEPPERONI (SMALL)", "PEPPERONI (SMALL AND EXTRA CHEESE)", "PEPPERONI (MEDIUM)", "PEPPERONI (MEDIUM AND EXTRA CHEESE)", "PEPPERONI (LARGE)", "PEPPERONI (LARGE AND EXTRA CHEESE)",
                "VEGGIE (SMALL)", "VEGGIE (SMALL AND EXTRA CHEESE)", "VEGGIE (MEDIUM)", "VEGGIE (MEDIUM AND EXTRA CHEESE)", "VEGGIE (LARGE)", "VEGGIE (LARGE AND EXTRA CHEESE)",
                "COMBO (SMALL)", "COMBO (SMALL AND EXTRA CHEESE)", "COMBO (MEDIUM)", "COMBO (MEDIUM AND EXTRA CHEESE)", "COMBO (LARGE)", "COMBO (LARGE AND EXTRA CHEESE)"
            ];
            function display_data() {
                var cost = 0.00;
                var selListId = document.getElementById('cartItems');
                var quantity = 0;
                for (var i = 1; i <= 18; i++) {
                    var option = document.createElement('option');
                    cost = 0.00;
                    if (localStorage.getItem(i)) {
                        quantity = localStorage.getItem(i);
                        cost = (price[i - 1] * quantity);
                        option.value = i;
                        option.text = "Item: " + display[i - 1] + " Quantity:" + quantity + " Cost: " + parseFloat(cost).toFixed(2);
                        selListId.add(option);
                        totalCost = totalCost + cost;

                    } else {
                        //console.log("localStorage doesn't have "+i);
                    }
                    localStorage.setItem("Total", parseFloat(totalCost).toFixed(2));

                }
            }
            function removeOption(list)
            {
                  
              var elSelect=document.getElementById('cartItems');
              for(var i=0;i<elSelect.length;i++){
                 if(elSelect.options[i].selected)
                 {  
                     
                     var itemIndex = elSelect.selectedIndex;
                     var itemOptionIndex=elSelect.options[i].value;
                     var itemText=elSelect.options[i].text;
                     var Cindex=itemText.substring(itemText.lastIndexOf('C')+5);
                     var newCost=localStorage.getItem("Total")-parseFloat(Cindex);
                     localStorage.setItem("Total",parseFloat(newCost).toFixed(2));
                     localStorage.removeItem(itemOptionIndex);
                     elSelect.remove(itemIndex);
                 } 
                }
             
              }
