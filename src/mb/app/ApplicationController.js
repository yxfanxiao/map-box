import AdaptiveApplicationController from "sap/a/app/ApplicationController";

import ServiceClient from "gd/service/ServiceClient";

import Application from "./Application";

export default class ApplicationController extends AdaptiveApplicationController
{
    createView(options)
    {
        return new Application(options);
    }

    run()
    {
        ServiceClient.getInstance().attachReady(() => {
            this.view.mapView.searchRoute(
                [ 31.9790247, 118.7548884 ],
                [ 32.04389, 118.77881 ]
            ).then(route => {
                this.view.mapView.exampleLayer.drawRoute(route);
            });
        })

}
