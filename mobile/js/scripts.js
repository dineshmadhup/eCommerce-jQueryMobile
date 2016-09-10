// this file contains scripts for client

// =========== prices =================

var cheese_cost = 2.0;
var myCart = [];

var pizzas = {
    'Small': {
        'Pepperoni': 8.99,
        'Vegetarian': 9.99,
        'Combo': 10.99
    },
    'Medium': {
        'Pepperoni': 9.99,
        'Vegetarian': 10.99,
        'Combo': 11.99
    },
    'Large': {
        'Pepperoni': 10.99,
        'Vegetarian': 11.99,
        'Combo': 12.99
    }
};

// =========== prices end =============

// this function validates a pizza order form

function btnAddToCartHandler() {
    // get size of the pizza
    var size = $('#size').val();
    // if size is not selected
    if (!size) {
        // show error message
        alert('Please, select pizza size!');
        return false;
    }

    // get kind of pizza
    var kind = $('#kind').val();
    // if kind is not selected
    if (!kind) {
        // show error message
        alert('Please, select pizza kind!');
        return false;
    }

    // get quantity of pizzas
    var quantity = parseInt($('#quantity').val());
    // if quantity is invalid number or 0
    if (!quantity) {
        // show error message
        alert('Please, enter a valid quantity!');
        return false;
    }

    var postData = {
        'size': size,
        'kind': kind,
        'quantity': quantity,
        'extra_cheese': $('#extra_cheese').prop("checked")
    };

    $.ajax({
        type: "post",
        url: "/add",
        dataType: "json",
        data: postData,
        success: function (response) {
            if (response.success) {
                alert('Your Pizza is ordered!');
                $("#orderForm")[0].reset();
                getNumberOfOrderedPizzas();
            }
        }
    });

    return false;
}

// this function calculates the price of the pizza
function btnCalculateHandler() {

    // get and validate all pizza parameters

    var size = $('#size').val();

    if (!size) {
        alert('Please, select pizza size!');
        return false;
    }

    var kind = $('#kind').val();
    if (!kind) {
        alert('Please, select pizza kind!');
    }

    var quantity = parseInt($('#quantity').val());
    if (!quantity) {
        alert('Please, enter a valid quantity!');
    }

    // get cost of selected pizza
    var cost = pizzas[size][kind];

    // if such pizza is not exists
    if (!cost)
        return false;      // exit from this function

    // get extra cheese flag
    var extra_cheese = $('#extra_cheese').prop("checked");

    // add extra cheese cost if needed
    if (extra_cheese) {
        cost += cheese_cost;
    }

    // show cost for current order
    $('#price').html(cost * quantity);

    // always return false
    return false;
}

// this function invokes when user clicks on the 'Go to cart' button

function btnGoToCart() {
    // change the location
    window.location.href = '#checkout';
    return false;
}

// this function validates checkout form
function btnCheckoutHandler() {
    // get first name
    var first_name = $('#first_name').val();
    // if first name not is valid
    if (first_name.length < 1 || first_name.length > 20) {
        // show error message
        //alert('First name must be between 1 and 20 characters');
        $('#first_name').next().text("This field is required.");
        return false;

    }

    // get last name
    var last_name = $('#last_name').val();
    // if last name is invalid
    if (last_name.length < 1 || last_name.length > 25) {
        // show error message
        //alert('Last name must be between 1 and 25 characters');
        $('#last_name').next().text("This field is required.");
        return false;

    }
    // get address
    var address = $('#address').val();
    // if address is not filled
    if (address.length == 0) {
        // show error message
        //alert('Address field should be filled');
        $('#address').next().text("This field is required.");
        return false;

    }

    // get phone number
    var phone = $('#phone').val();
    // if phone number is empty
    if (phone.length == 0) {
        // show error message
        //alert('Phone field should be filled');
        $('#phone').next().text("This field is required.");
        return false;

    } else {
        // in other case create regular expr. to check the format (123-123-1233 for example)
        var phoneValid = /(\d){3}-(\d){3}-(\d){4}/;
        // if phone has invalid format
        if (!phoneValid.test(phone)) {
            // show error message
            //alert('Invalid phone format');
            $('#phone').next().text("Invalid phone format.");
            return false;
        }
    }

    // get type of payment
    var stype = document.forms[0].stype.value;

    // if type is not selected
    if (!stype) {
        // show error message
        alert('Please, select payment type');
        return false;
    }

    // if type is credit card
    if (stype == 'credit') {
        // get type of credit cart
        var type = document.forms[0].crtype.value;
        var regex = '';

        // if type is not selected
        if (!type) {
            // show error message
            alert('Please, select credit card type');

            return false;

        } else {
            // in other case create regex to check the card number format
            // according to card type
            if (type == 'ax') {
                regex = /(\d){4}-(\d){6}-(\d){5}/;
            } else if (type == 'v') {
                regex = /(\d){4}-(\d){4}-(\d){4}-(\d){4}/;
            }
            // get card number
            var cardNumber = $('#txt_cr_number').val();
            // if card number is not entered
            if (!cardNumber) {
                // show error message
                //alert('Credit Card number is Required');
                $('#txt_cr_number').next().text("Credit Card number is Required.");
                return false;

            } else {
                // in other case: check the format using reg. expr.
                // if not matches
                if (!regex.test(cardNumber)) {
                    // show error message
                    //alert('Invalid Credit Card Number Format');
                    $('#txt_cr_number').next().text("Invalid Credit Card Number Format.");
                    return false;
                }
            }
            // get card expr. date
            var crCardExpDate = $('#datepicker').val();
            // if date is not selected
            if (!crCardExpDate) {
                // show error message
                //alert('Please, enter Credit Card expiration Date');
                $('#datepicker').next().text("Please, enter Credit Card expiration Date.");
                return false;

            }

        }
    }
    window.location.href = '#confirmation';
    return false;
}



// this function invokes when user selects a credit card type
// it just sets the placeholder to text field
function crCardTypeClick(element) {
    if (element.value == 'ax') {
        $('#txt_cr_number').prop('placeholder', 'XXXX-XXXXXX-XXXXX');
    } else {
        $('#txt_cr_number').prop('placeholder', 'XXXX-XXXX-XXXX-XXXX');
    }
}

// this function invokes when user selects a payment type
function saleTypeClick(element) {
    // if selected type is 'cash'
    if (element.value == 'cash') {
        // hide all fields with credit card details
        $('#cr_t').css('display', 'none');
        $('#cr_number').css('display', 'none');
        $('#cr_ex_date').css('display', 'none');
    } else {
        // and show them in other case
        $('#cr_t').css('display', 'block');
        $('#cr_number').css('display', 'block');
        $('#cr_ex_date').css('display', 'block');
    }
}

function getMyOrders() {
    $.ajax({
        type: "get",
        url: "/getMyCart",
        dataType: "json",
        success: function (data) {
            renderCart(data);
        }
    });
}

// this function invokes when checkout page loaded
function renderCart(myCart) {

    var min = 1000, max = 10000;
    var totalCost = 0;
    // get container
    var div = document.getElementById('full_order');

    var id = Math.floor(Math.random() * (max - min + 1)) + min;

    div.innerHTML += '<p>Order #' + id + '</p>';

    // if cart contains pizzas
    if (myCart.length) {
        // for every pizza in the cart
        myCart.forEach(function (element) {
            // get it's cost
            var cost = pizzas[element.size][element.kind];
            // check for additional cheese
            if (element.extra_cheese) {
                cost += cheese_cost;
            }

            // show size and kind of the pizza
            var str = '<p>' + element.size + ' ' + element.kind;

            // show extra cheese option
            if (element.extra_cheese) {
                str += ' with extra cheese';
            }
            // calculate total price for pizza
            cost *= element.quantity;

            // show price
            str += ' x' + element.quantity + ' ($' + cost + ')';

            var pizza_id = element.size + '_' + element.kind;
            if (element.extra_cheese) {
                pizza_id += '_extra_cheese'
            }

            // show created string
            div.innerHTML += str + '<a href="./remove?pizza=' + pizza_id + '" style="display: block; float: right">Remove</a>';
            // calculate total cost
            totalCost += cost;
        });
        // show total for all pizzas in the cart
        div.innerHTML += '<hr/>' + '<p>Total: $' + totalCost + '</p>';
        $('#total_amount').val('$' + totalCost);
    } else {
        // if no pizzas exist in the cart
        // show message
        div.innerHTML = '<p>You have no pizza in your cart</p>';
        // and disable checkout button
        document.getElementById('btn_checkout').disabled = true;
    }
}

function getNumberOfOrderedPizzas() {
    $.ajax({
        type: "post",
        url: "/getNumberOfOrderedPizzas",
        dataType: "json",
        success: function (data) {
            $("#cartEntities").html('(' + data.number + ')');
        }
    });
}

//===========================================================================

//Checkout

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var radioselected = "AX";
var firstName;
var lastName;
var deliveryAddress;
var contactPhone;
var orderNumber;
function btn_checkout_handler() {
    firstName = $('#first_name').val();
    // if first name not is valid
    if (firstName.length < 1 || firstName.length > 20) {
        // show error message
        //alert('First name must be between 1 and 20 characters');
        $('#error_first_name').text("This field is required.");
        return false;

    }

    // get last name
    lastName = $('#last_name').val();
    // if last name is invalid
    if (lastName.length < 1 || lastName.length > 25) {
        // show error message
        //alert('Last name must be between 1 and 25 characters');
        $('#error_last_name').text("This field is required.");
        return false;
    }

    // get address
    deliveryAddress = $('#address').val();
    // if address is not filled
    if (deliveryAddress.length == 0) {
        // show error message
        //alert('Address field should be filled');
        $('#error_address').text("This field is required.");
        return false;

    }

    var phoneValid = /(\d){3}-(\d){3}-(\d){4}/;
    //contactPhone=document.getElementById('phone').value;
    contactPhone = $('#phone').val()
    if (contactPhone == "")
    {
        document.getElementById('error_phone').innerHTML = 'Telephone number cannot blank';
        document.getElementById('phone').focus();
    }
    else if (!contactPhone.match(phoneValid)) {
        document.getElementById('error_phone').innerHTML = 'Enter valid Telephone number';
        document.getElementById('phone').focus();
    }
    else
        document.getElementById('error_phone').innerHTML = '';

    valid_month();
    valid_year();
    valid_credit_card_number();
    var min = 1000, max = 10000;
    orderNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    localStorage.setItem("Orderid", orderNumber);
    localStorage.setItem("Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Address", deliveryAddress);
    localStorage.setItem("Phone number", contactPhone);


}
function handleCash() {
    if ($('#sales').val() == "cash")
        localStorage.setItem("PaymentMode", "Cash");
    document.getElementById('credit_card_type').style.display = 'none';
    document.getElementById('credit_card_num_id').style.display = 'none';
    document.getElementById('cred_exp_id').style.display = 'none';

}

function handleCredit() {
    if (document.getElementsByName('sales').value == "credit")
        valid_credit_card_number();
    document.getElementById('credit_card_type').style.display = '';
    document.getElementById('credit_card_num_id').style.display = '';
    document.getElementById('cred_exp_id').style.display = '';

}


function radioSelected() {
    var radios = document.getElementsByName('credittype');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioselected = radios[i].value;

        }
    }

}

function valid_month() {

    var month = $('#month').val();
    if (month == '') {
        document.getElementById('cred_exp_month').innerHTML = 'Enter month';
        document.getElementById('month').focus();
        console.log("month empty called" + month);


    }
    else if (month.length != 2) {
        document.getElementById('cred_exp_month').innerHTML = 'month field required';
        console.log("month length called" + month);
        document.getElementById('month').focus();
    }
    else if (month > 12 || month < 1) {
        document.getElementById('cred_exp_month').innerHTML = 'Enter valid digit month';
        console.log("month digit checking  called" + month);
        //return;
        document.getElementById('month').focus();
    }
    else if (isNaN(month)) {
        document.getElementById('cred_exp_month').innerHTML = 'Enter month in number';
        document.getElementById('month').focus();
        console.log("month digit checking  called" + month);
        //return;
    }
    else
        document.getElementById('cred_exp_month').innerHTML = '';

}
function valid_year() {
    var year = $('#year').val();

    if (year == '') {
        document.getElementById('cred_exp_year').innerHTML = 'Enter two digit year';
        document.getElementById('year').focus();
    }
    else if (year.length != 2) {
        document.getElementById('cred_exp_year').innerHTML = 'Enter 2 digit valid year';
        document.getElementById('year').focus();
    }

    else
        document.getElementById('cred_exp_year').innerHTML = '';
}

function valid_credit_card_number() {
    var cardAX = /(\d){4}-(\d){6}-(\d){5}/;
    var cardVisa = /(\d){4}-(\d){4}-(\d){4}-(\d){4}/;
    var num = $('#credit_card_num').val();
    if (num == '') {

        document.getElementById('valid_cred_card_num').innerHTML = 'Card number must filled';
        document.getElementById('credit_card_num').focus();
        //return;

    }

    if (radioselected == "AX") {
        if ((!(num.match(cardAX)))) //&& (document.getElementByName('credittype').selected.value=='V'))
        {

            document.getElementById('valid_cred_card_num').innerHTML = 'Enter valid AX Card Number';
            document.getElementById('credit_card_num').focus();
            //return;
        }
        else {
            document.getElementById('valid_cred_card_num').innerHTML = '';
            localStorage.setItem("Type", "American Express");
        }
    }
    else if (radioselected == "V") {
        if (!(num.match(cardVisa))) {
            document.getElementById('valid_cred_card_num').innerHTML = 'Enter valid VISA Card Number';
            document.getElementById('credit_card_num').focus();
            //return;
        }
        else {
            document.getElementById('valid_cred_card_num').innerHTML = '';
            localStorage.setItem("Type", "Visa");
        }
    }
}
function insertData() {

    document.getElementById("salesAmt").innerHTML = localStorage.getItem("Total");
}

//===============================================================================================

//acknowledge

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function display() {

    document.getElementById('orderId').innerHTML = localStorage.getItem("Orderid");
    document.getElementById('total').innerHTML = localStorage.getItem("Total");
}
var price = [8.99, 10.99, 9.99, 11.99, 10.99, 12.99, 9.99, 11.99, 10.99, 12.99, 11.99, 13.99
            , 10.99, 12.99, 11.99, 13.99, 12.99, 14.99];
var totalCost = 0;
function display_data() {
    var cost = 0.00;
    var display = [
        "PEPPERONI (SMALL)", "PEPPERONI (SMALL AND EXTRA CHEESE)", "PEPPERONI (MEDIUM)", "PEPPERONI (MEDIUM AND EXTRA CHEESE)", "PEPPERONI (LARGE)", "PEPPERONI (LARGE AND EXTRA CHEESE)",
        "VEGGIE (SMALL)", "VEGGIE (SMALL AND EXTRA CHEESE)", "VEGGIE (MEDIUM)", "VEGGIE (MEDIUM AND EXTRA CHEESE)", "VEGGIE (LARGE)", "VEGGIE (LARGE AND EXTRA CHEESE)",
        "COMBO (SMALL)", "COMBO (SMALL AND EXTRA CHEESE)", "COMBO (MEDIUM)", "COMBO (MEDIUM AND EXTRA CHEESE)", "COMBO (LARGE)", "COMBO (LARGE AND EXTRA CHEESE)"
    ];

    var quantity = 0;
    for (var i = 1; i <= 18; i++) {
        cost = 0.00;
        if (localStorage.getItem(i)) {
            quantity = localStorage.getItem(i);
            document.writeln("Item: " + display[i - 1] + "<br>");
            document.writeln("Quantity: " + quantity + "<br>");
            cost = (price[i - 1] * quantity);
            document.writeln("Total Cost: " + cost + "<br>");          
            totalCost = totalCost + cost;

        } else {
            console.log("localStorage doesn't have " + i);
        }
        localStorage.getItem("Total");

    }
}

//===========================================================================================================

//order.js

var price = [8.99, 10.99, 9.99, 11.99, 10.99, 12.99, 9.99, 11.99, 10.99, 12.99, 11.99, 13.99
            , 10.99, 12.99, 11.99, 13.99, 12.99, 14.99];
var currentSelectedItem = 1;
var PEPPERONI_SMALL = 1;
var PEPPERONI_SMALL_GLOSSY = 2;
var PEPPERONI_MEDIUM = 3;
var PEPPERONI_MEDIUM_GLOSSY = 4;
var PEPPERONI_LARGE = 5;
var PEPPERONI_LARGE_GLOSSY = 6;

var VEGGIE_SMALL = 7;
var VEGGIE_SMALL_GLOSSY = 8;
var VEGGIE_MEDIUM = 9;
var VEGGIE_MEDIUM_GLOSSY = 10;
var VEGGIE_LARGE = 11;
var VEGGIE_LARGE_GLOSSY = 12;

var COMBO_SMALL = 13;
var COMBO_SMALL_GLOSSY = 14;
var COMBO_MEDIUM = 15;
var COMBO_MEDIUM_GLOSSY = 16;
var COMBO_LARGE = 17;
var COMBO_LARGE_GLOSSY = 18;



var cost = 0;
var glossy = 0;
var totalCost = 0;
var values;
var quantityInt = -1;
var quantityString;
var qualityIndex = 0;
function calculate() {
    console.log("Calculate method called");
    //Represents index of quality of item(0-2). 
    qualityIndex = document.getElementById('quality').selectedIndex;
    //Represents index of type of item(1-4).
    typeIndex = 0;
    var inputs = document.getElementsByName("Item");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            typeIndex = parseInt(inputs[i].id);
            values = inputs[i].value;
        }
    }
    var isGlossy = false;
    if (document.getElementById("glossy").checked)
        isGlossy = true;

    switch (typeIndex) {
        case 1:
            switch (qualityIndex) {
                case 0:
                    if (isGlossy)
                        currentSelectedItem = PEPPERONI_SMALL_GLOSSY;
                    else
                        currentSelectedItem = PEPPERONI_SMALL;
                    break;
                case 1:
                    if (isGlossy)
                        currentSelectedItem = PEPPERONI_MEDIUM_GLOSSY;
                    else
                        currentSelectedItem = PEPPERONI_MEDIUM;
                    break;

                case 2:
                    if (isGlossy)
                        currentSelectedItem = PEPPERONI_LARGE_GLOSSY;
                    else
                        currentSelectedItem = PEPPERONI_LARGE;
                    break;


            }
            break;
        case 2:
            switch (qualityIndex) {
                case 0:
                    if (isGlossy)
                        currentSelectedItem = VEGGIE_SMALL_GLOSSY;
                    else
                        currentSelectedItem = VEGGIE_SMALL;
                    break;
                case 1:
                    if (isGlossy)
                        currentSelectedItem = VEGGIE_MEDIUM_GLOSSY;
                    else
                        currentSelectedItem = VEGGIE_MEDIUM;
                    break;

                case 2:
                    if (isGlossy)
                        currentSelectedItem = VEGGIE_LARGE_GLOSSY;
                    else
                        currentSelectedItem = VEGGIE_LARGE;
                    break;
            }
            break;
        case 3:
            switch (qualityIndex) {
                case 0:
                    if (isGlossy)
                        currentSelectedItem = COMBO_SMALL_GLOSSY;
                    else
                        currentSelectedItem = COMBO_SMALL;
                    break;
                case 1:
                    if (isGlossy)
                        currentSelectedItem = COMBO_MEDIUM_GLOSSY;
                    else
                        currentSelectedItem = COMBO_MEDIUM;
                    break;

                case 2:
                    if (isGlossy)
                        currentSelectedItem = COMBO_LARGE_GLOSSY;
                    else
                        currentSelectedItem = COMBO_LARGE;
                    break;

            }
            break;

    }

    quantityInt = -1;
    quantityString = document.getElementById("quantity").value;
    console.log("quantity is :" + quantity + "Before Parse :" + document.getElementById("quantity").value);
    if (quantityString == "") {


        document.getElementById("quantityid").innerHTML = "Enter quantity";
        document.getElementById("costOfItems").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("quantity").focus();
        return;
    }
    else if (parseInt(quantityString) < 1) {
        document.getElementById("quantityid").innerHTML = "Negative or Zero quantity not allowed";
        document.getElementById("costOfItems").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("quantity").focus();
    }
    else
    {
        console.log("inside quantity", +quantityString);
        quantityInt = parseInt(quantityString);
        totalCost = price[currentSelectedItem - 1] * quantityInt;

        document.getElementById("costOfItems").value = totalCost;/*+" ("+ delivery_date+")";*/
        document.getElementById("quantityid").innerHTML = "";
    }

}

function store() {

    calculate();
    if (localStorage.getItem(currentSelectedItem))
    {
        alert("Alerady present");
        console.log("Alerady present " + currentSelectedItem);
        console.log("Previous quantity " + localStorage.getItem(currentSelectedItem));
        var q = parseInt(localStorage.getItem(currentSelectedItem)) + parseInt(quantityInt);
        console.log("Total quantity " + q);
        localStorage.setItem(currentSelectedItem, q);

    }
    else {
        console.log("Adding new " + currentSelectedItem);
        //localStorage.setItem(item,values);
        localStorage.setItem(currentSelectedItem, quantityInt);
        //localStorage.setItem("Total Cost",totalCost);
        alert('Store in local storage');
    }
    document.getElementById('quantity').value = "";
    document.getElementById("costOfItems").value = "";

}
function clearLocalStorage() {
    alert("Clear local storage");
    console.log("Clear local storage");
    localStorage.clear();

}

//=====================================================================================================

//Camera script

function takePhoto() {
    navigator.camera.getPicture(onCameraSuccess, onCameraError, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}
function onCameraSuccess(imageURL) {
    navigator.notification.alert("onCameraSuccess: " + imageURL);
    //Get a handle to the image container div
    ic = document.getElementById('imageContainer');
    //Then write an image tag out to the div using the
    //URL we received from the camera application. 
    ic.innerHTML = '<img src="' + imageURL + '" width="50%" />';
}
function onCameraError(e) {
    console.log(e);
    navigator.notification.alert("onCameraError: " + e);
}




