Halifax Transit Tracker

•	Display a map in the browser.

•	Fetch real-time transit data information data from a publicly available API, General Transit Feed Specification (GTFS) open data feed. 
  (API Endpoint URL: https://hrmbusapi.herokuapp.com/)

•	Filter the raw data to a subset with specific criteria.
  Filter requirement: Filter the resulting data so that you keep buses on routes 1-10 only.

•	Convert the filtered API data into GeoJSON format.
  Leaflet supports and works well with the GeoJSON data format. It is a format for encoding a variety of geographic data structures 
   and is widely used in the digital cartography industry.

•	Plot markers on the map to display the current position of vehicles.
  Once you have your newly transformed data in GeoJSON format. Apply this data to the provided map using the programming API for GeoJSON in Leaflet. 
  Valuable Resources: https://leafletjs.com/examples/geojson/

•	Add functionality that will cause the map to auto refresh after a certain interval of time.
  After a certain period of time, re-fetch the updated API data and re-perform the GeoJSON transformation as necessary. Refresh the map by re-rendering 
  the markers in their new positions.
