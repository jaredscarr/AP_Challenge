// a) set up product impressions
// wrap the below in a script tag or if developers are comfortable store
// in separate location (ideal)
// var PRODUCTS = [{
//             'name': 'Backpack',
//             'id': '1234',
//             'price': '$200',
//             'brand': 'Travel Brand',
//             'category': 'Accessories',
//             'variant': 1,
//             'list': 'Search Results',
//             'position': 1
//             },
//             {
//             'name': 'Scarf',
//             'id': '4567',
//             'price': '$10,00',
//             'brand': 'Travel Brand',
//             'category': 'Apparel',
//             'variant': 1,
//             'list': 'Search Results',
//             'position': 2
//             },
//             {'name': 'RFID Wallet',
//             'id': '8901',
//             'price': '80',
//             'brand': 'Travel Brand',
//             'category': 'Accessories',
//             'variant': 0,
//             'list': 'Search Results',
//             'position': 3
//             },
//             {
//             'name': 'Protien Bar',
//             'id': '2543',
//             'price': '$200',
//             'brand': 'Travel Brand',
//             'category': 'Accessories',
//             'variant': 1,
//             'list': 'Search Results',
//             'position': 4
//             }]

document.addEventListener("DOMContentLoaded", function() {
    console.log('Your document is ready!');

    function getImpressions() {
        products = document.querySelectorAll('[data-product-name]');
        console.log(products);
        groupImpressions(products);
    }

    function groupImpressions(productList) {
        // Assuming there is access to a list of products
        var group = [];
        for (var i = 0; i < productList.length; i++) {
            // map the object from the list to the impression
            var impression = {
                'name': productList[i].getAttribute('data-product-name'),
                'id': productList[i].getAttribute('data-product-id'),
                'price': escapeChars(productList[i].getAttribute('data-product-price')),
                'category': productList[i].getAttribute('data-product-category'),
                'variant': setVariant(productList[i].getAttribute('data-product-variant')),
                'list': productList[i].getAttribute('data-product-list'),
                'position': i.toString()
            }
            //adds the impression to the group
            group.push(impression);
            // call push function (line ) if we have a group of three or no more products
            if (group.length == 3 || i == (productList.length - 1)) {
                pushImpressions(group);
                group = [];
            }
        }
        console.log('Complete.');
        return 'Complete';
    }

    function pushImpressions(impressions) {
        // modifies to the group to be ready to send to GA
        var ecommerceObject = {
            'ecommerce': {'impressions': impressions}
        }
        // here we would actually push the dataLayer
        console.log('dataLayer is: ', ecommerceObject);
        return ecommerceObject;
    }

    function escapeChars(price) {
        // this is only for the use case specified
        // could also use regex
        return price.replace('$', '').replace(',', '');
    }

    function setVariant(variant) {
        // checks for 1's and 0's and switches to true or false
        // could include further checks
        if (variant == 1) {
            return true;
        } else if (variant == 0) {
            return false;
        } else {
            return variant;
        }
    }

    // create tracker object
    // ga('create', 'UA-XXXXX-Y', 'auto');
    // require ecommerce plugin
    // ga('require', 'ec');
    // groupImpressions(PRODUCTS);
    getImpressions();
});

