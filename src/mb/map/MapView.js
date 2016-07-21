import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ExampleLayer from "./layer/ExampleLayer";

export default class MapView extends AdaptiveMapView
{
    afterInit()
    {
        super.afterInit();
        this.addStyleClass("mb-map-view");
    }

    initLayers()
    {
        this.tileLayer = new TileLayer({
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        });
        this.addLayer(this.tileLayer);

        this.exampleLayer = new ExampleLayer({
            startLocation: [ 31.9790247, 118.7548884 ],
            endLocation: [ 32.04, 118.77 ]
        });
        this.addLayer(this.exampleLayer);

        this.exampleLayer.drawRoute();
        this.exampleLayer.fitBounds();
    }
}
