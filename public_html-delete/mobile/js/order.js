/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  
 var price=[8.99,10.99,9.99,11.99,10.99,12.99,9.99,11.99,10.99,12.99,11.99,13.99
                         ,10.99,12.99,11.99,13.99,12.99,14.99];
            var currentSelectedItem = 1;
            var PEPPERONI_SMALL = 1;
            var PEPPERONI_SMALL_GLOSSY = 2;
            var PEPPERONI_MEDIUM=3;
            var PEPPERONI_MEDIUM_GLOSSY=4;
            var PEPPERONI_LARGE=5;
            var PEPPERONI_LARGE_GLOSSY=6;
            
            var VEGGIE_SMALL = 7;
            var VEGGIE_SMALL_GLOSSY = 8;
            var VEGGIE_MEDIUM=9;
            var VEGGIE_MEDIUM_GLOSSY=10;
            var VEGGIE_LARGE=11;
            var VEGGIE_LARGE_GLOSSY=12;
            
            var COMBO_SMALL = 13;
            var COMBO_SMALL_GLOSSY = 14;
            var COMBO_MEDIUM=15;
            var COMBO_MEDIUM_GLOSSY=16;
            var COMBO_LARGE=17;
            var COMBO_LARGE_GLOSSY=18;
            
           
            
            var cost=0;var glossy=0;var totalCost=0;
                var values;
                var quantityInt = -1;
                var quantityString;
                var qualityIndex=0;
            function calculate(){
                console.log("Calculate method called");
               //Represents index of quality of item(0-2). 
               qualityIndex = document.getElementById('quality').selectedIndex;
               //Represents index of type of item(1-4).
               typeIndex = 0;
               var inputs = document.getElementsByName("Item");
               for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].checked) {
                        typeIndex=parseInt(inputs[i].id);
                        values = inputs[i].value;
                    }
               }
                var isGlossy = false;
                if(document.getElementById("glossy").checked)
                    isGlossy=true;
                 
                switch(typeIndex){
                    case 1:
                        switch(qualityIndex){
                            case 0:
                                if(isGlossy)
                                    currentSelectedItem = PEPPERONI_SMALL_GLOSSY;
                                else
                                    currentSelectedItem = PEPPERONI_SMALL;
                                break;
                            case 1:
                                if(isGlossy)
                                    currentSelectedItem = PEPPERONI_MEDIUM_GLOSSY;
                                else
                                    currentSelectedItem = PEPPERONI_MEDIUM;
                                break;
                                
                            case 2:
                                if(isGlossy)
                                    currentSelectedItem = PEPPERONI_LARGE_GLOSSY;
                                else
                                    currentSelectedItem = PEPPERONI_LARGE;
                                break;
                                
                       
                        }
                        break;
                    case 2:
                        switch(qualityIndex){
                            case 0:
                                if(isGlossy)
                                    currentSelectedItem = VEGGIE_SMALL_GLOSSY;
                                else
                                    currentSelectedItem = VEGGIE_SMALL;
                                break;
                            case 1:
                                if(isGlossy)
                                    currentSelectedItem = VEGGIE_MEDIUM_GLOSSY;
                                else
                                    currentSelectedItem = VEGGIE_MEDIUM;
                                break;
                                
                            case 2:
                                if(isGlossy)
                                    currentSelectedItem =VEGGIE_LARGE_GLOSSY;
                                else
                                    currentSelectedItem = VEGGIE_LARGE;
                                break;
                                
                        }
                        break;
                    case 3:
                        switch(qualityIndex){
                            case 0:
                                if(isGlossy)
                                    currentSelectedItem = COMBO_SMALL_GLOSSY;
                                else
                                    currentSelectedItem = COMBO_SMALL;
                                break;
                            case 1:
                                if(isGlossy)
                                    currentSelectedItem = COMBO_MEDIUM_GLOSSY;
                                else
                                    currentSelectedItem = COMBO_MEDIUM;
                                break;
                                
                            case 2:
                                if(isGlossy)
                                    currentSelectedItem = COMBO_LARGE_GLOSSY;
                                else
                                    currentSelectedItem = COMBO_LARGE;
                                break;
                                
                        }
                        break;
                   
                }
           
             quantityInt = -1;
             quantityString = document.getElementById("quantity").value;
            console.log("quantity is :"+ quantity+"Before Parse :" + document.getElementById("quantity").value);
            if(quantityString==""){
                
                
                document.getElementById("quantityid").innerHTML="Enter quantity";
                document.getElementById("costOfItems").value="";
                document.getElementById("quantity").value="";
                document.getElementById("quantity").focus();
                return;
            }
            else if(parseInt(quantityString) < 1){
                
                document.getElementById("quantityid").innerHTML="Negative or Zero quantity not allowed";
                document.getElementById("costOfItems").value="";
                document.getElementById("quantity").value="";
                document.getElementById("quantity").focus();
            }
            else
            {
               console.log("inside quantity",+quantityString);
                quantityInt = parseInt(quantityString);
                totalCost= price[currentSelectedItem-1] * quantityInt ;
                
                document.getElementById("costOfItems").value=totalCost ;/*+" ("+ delivery_date+")";*/
                document.getElementById("quantityid").innerHTML="";
            }
            
           }
           
            function store(){
                
                calculate();
              if(localStorage.getItem(currentSelectedItem))
              {
                  alert("Alerady present");
                  console.log("Alerady present "+ currentSelectedItem);
                 console.log("Previous quantity "+ localStorage.getItem(currentSelectedItem));
                  var q=parseInt(localStorage.getItem(currentSelectedItem))+parseInt(quantityInt);
                  console.log("Total quantity "+ q);
                   localStorage.setItem(currentSelectedItem,q);
                  
              }
              else{
                  console.log("Adding new "+ currentSelectedItem);
                //localStorage.setItem(item,values);
                localStorage.setItem(currentSelectedItem,quantityInt);
                //localStorage.setItem("Total Cost",totalCost);
                alert('Store in local storage');
            }
            document.getElementById('quantity').value="";
            document.getElementById("costOfItems").value="";
            
         }
         function clearLocalStorage(){
             alert("Clear local storage");
             console.log("Clear local storage");
             localStorage.clear();
             
         }
