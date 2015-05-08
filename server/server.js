var rad = function(x) {
    return x * Math.PI /180;
};

function distance(clientLat, clientLng, shopLat, shopLng){
    var R = 6378137; //Earth's mean radius in meters
    var dLat = rad(shopLat - clientLat);
    var dLng = rad(shopLng - clientLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(clientLat)) * Math.cos(rad(shopLat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

Meteor.methods(
{
    geocalc: function (data){
        clientLat = data[0];
        clientLng = data[1];
        searchQuery = data[2];
        check(clientLat, Number);
        check(clientLng, Number);
        check(searchQuery, String);
        shopList = [];
        distanceList = [];
        //For individual store products.
        individualStore = Shops.find({
            //'outlets.storeProducts.type' : searchQuery,
            'outlets.storeProducts.name' : searchQuery
        });
        generalProduct = Shops.find({
            //'generalProducts.type': searchQuery,
            'generalProducts.name' : searchQuery
        });
        shopList = shopList.concat(individualStore.fetch());
        shopList = shopList.concat(generalProduct.fetch());
        //Geocalculation
        for (var shop in shopList){
            for (var outlet in shopList[shop].outlets){
                distanceList.push({
                    "documentID"    : shopList[shop]._id,
                    "shopNumber"    : shopList[shop].outlets[outlet].shopID,
                    "distance"      : distance(clientLat, clientLng, shopList[shop].outlets[outlet]["location"]["lat"], shopList[shop].outlets[outlet]["location"]["lng"])
            });
        }
    }
        return distanceList;
}
});