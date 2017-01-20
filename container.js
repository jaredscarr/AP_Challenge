function getImpressions() {
        products = document.querySelectorAll('[data-product-name]');
        groupImpressions(products);
    }

function groupImpressions(productList) {
    var group = [];
    for (var i = 0; i < productList.length; i++) {
        var impression = {
            'name': productList[i].getAttribute('data-product-name'),
            'id': productList[i].getAttribute('data-product-id'),
            'price': escapeChars(productList[i].getAttribute('data-product-price')),
            'category': productList[i].getAttribute('data-product-category'),
            'variant': setVariant(productList[i].getAttribute('data-product-variant')),
            'list': productList[i].getAttribute('data-product-list'),
            'position': i.toString()
        }
        group.push(impression);
        if (group.length == 3 || i == (productList.length - 1)) {
            pushImpressions(group);
            group = [];
        }
    }
    return 'Complete';
}

function pushImpressions(impressions) {
    window.dataLayer = window.dataLayer || [];
    var ecommerceObject = {
        'ecommerce': {'impressions': impressions}
    }
    dataLayer.push(ecommerceObject);
    return ecommerceObject;
}

function escapeChars(price) {
    return price.replace('$', '').replace(',', '');
}

function setVariant(variant) {
    if (variant == 1) {
        return true;
    } else if (variant == 0) {
        return false;
    } else {
        return variant;
    }
}

ga('create', '<tracker-id>', 'auto');
ga('require', 'ec');
getImpressions();
