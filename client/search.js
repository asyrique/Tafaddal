Template.frontPage.events = {
    'keypress input#search_input': function(evt) {
        if (evt.which === 13) {
            console.log(evt);
            geoPosition = Geolocation.latLng();
            var query = evt.currentTarget.value;
            Meteor.call("geocalc", [geoPosition.lat, geoPosition.lng, query], function(error, result){
                for (x in result){
                    List.insert(result[x]);
                }
            });
        }
    }
};

Template.frontPage.helpers({
    list: function() {
        return List.find();
    }
    shopName: function(documentID, ) {
        return Shops.findOne({
            _id:documentID,
            shopNumber:
        })
    }
});