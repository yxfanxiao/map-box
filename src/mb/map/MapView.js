import AdaptiveMapView from "sap/a/map/MapView";
import TileLayer from "sap/a/map/layer/TileLayer";

import ServiceClient from "gd/service/ServiceClient";
import Util from "gd/util/gis";

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

        this.exampleLayer = new ExampleLayer();
        this.addLayer(this.exampleLayer);
    }

    searchRoute(startLocation, endLocation)
    {
        return new Promise((resolve, reject) => {
            ServiceClient.getInstance().driving
            .search(Util.wgs84togcj02(startLocation), Util.wgs84togcj02(endLocation), (status, result) => {
                if (status === "complete" && result.info === "OK")
                {
                    resolve(result.routes[0]);
                }
                else
                {
                    reject();
                }
            });
        });
    }


    // searchRoute(startLocation, endLocation)
    // {
    //     const start_mars_location = wgs84togcj02(startLocation[1], startLocation[0]);
    //     const end_mars_location = wgs84togcj02(endLocation[1], endLocation[0]);
    //     driving.search(start_mars_location, end_mars_location, (status, result) => {
    //         console.log(result);
    //         if (status === "complete" && result.info === "OK")
    //         {
    //             this.exampleLayer.applySettings({
    //                 startLocation,
    //                 endLocation
    //             });
    //             const routes = result.routes[0];
    //             console.log(routes);
    //             this.exampleLayer.drawRoute(routes);
    //             this.exampleLayer.fitBounds();
    //         }
    //     });
    // }

        // return new Promise((resove, reject) => {
        //     this.exampleLayer.applySettings({
        //         startLocation,
        //         endLocation
        //     });
        //
        //     // async
        //     this.exampleLayer.drawRoute();
        //     this.exampleLayer.fitBounds();
        // });
}
