document.addEventListener("DOMContentLoaded", function() {
    console.log('Your document is ready!');

    function getImpressions() {
        products = document.querySelectorAll('[data-product-name]');
        console.log(products);
        groupImpressions(products);
    }

    function groupImpressions(productList) {
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
        return 'Complete';
    }

    function pushImpressions(impressions) {
        // Check if dataLayer is initialized if not then init it.
        window.dataLayer = window.dataLayer || [];
        var ecommerceObject = {
            'ecommerce': {'impressions': impressions}
        }
        // here we would actually push the dataLayer
        dataLayer.push(ecommerceObject);
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

    // create tracker object. This code will only work if I really get GA setup
    // for the site which I have not done which is why it's commented out.

    // ga('create', '<tracker-id>', 'auto');

    // require ecommerce plugin

    // ga('require', 'ec');
    getImpressions();
});

