# Undertreck
A PhoneGap App for trips in Mallorca.

This version is a reduced one of a Undergraduate Thesis Project, which was a prove of
concept about the type off app that can be usefull to go to a trip in Mallorca.

This version provides information about Sa Travessa, the route between Andratx and Pollença in Mallorca.
The information provided talks about the length of the trips, the time needed or their difficulty.
The maps, where the routes are indicated, are also provided. Furthermore, the app counts the time that the
hiker uses and calculates how many time is left till the end. In addition, the app can localize the hiker inside
the map to make it easier to follow the track. A history of the trips is saved, for users information.

UnderTreck uses OpenStreetmaps tecnology to display their maps, combined with Leaflet.js. It's important to mention
that a extension of Leaflet is used to display the tracks in the maps: leaflet-omnivore. In order to suply the
absence of a server that provides all the information, the maps are added to the 'mapes' directory and the gpx files are
added to the 'gpx' directory. Other well-known libraries are used in this project, like jquery and bootstrap. It also
uses some phonegap plugins, like the org.apache.cordova.geolocation. In the extended version, more phonegap's plugins are used.


## Future work:
1. Translate the code to make it easier to understand.
2. Implements the server side (It was another undergraduate thesis project and I couldn't get the code)
3. Reimplements the app to get the information from an API and to reduce the memory needed.
4. Make the app more friendly-used (As it was a prove of concept, the desing wasn't one of the most important points).
5. More real proves doing the trips.

