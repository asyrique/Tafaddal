Shops = new Mongo.Collection("shops");
List = new Mongo.Collection("list");
Products = new Mongo.Collection("products");

if (Meteor.isServer) {
    Meteor.startup(function() {
        if (Shops.find().count() === 0){
            var shops = myData;
            for (var shop in shops){
                Shops.insert(shops[shop]);
            }
        }
    });
}