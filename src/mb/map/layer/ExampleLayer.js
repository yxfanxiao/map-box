import Layer from "sap/a/map/layer/Layer";

export default class ExampleLayer extends Layer
{
    metadata = {
        properties: {
            startLocation: { type: "any" },
            endLocation: { type: "any" }
        }
    };

    init()
    {
        super.init();
        this.markerGroup = L.featureGroup();
        this.container.addLayer(this.markerGroup);
        this.routeGroup = L.featureGroup();
        this.container.addLayer(this.routeGroup);
    }

    afterInit()
    {
        super.afterInit();
    }

    setStartLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("startLocation", loc);
        this._updateStartMarker();
    }

    setEndLocation(location)
    {
        const loc = L.latLng(location);
        this.setProperty("endLocation", loc);
        this._updateEndMarker();
    }

    drawRoute()
    {
        this.routeGroup.clearLayers();
        const polyLine = L.polyline([
            this.getStartLocation(),
            this.getEndLocation()
        ]);
        this.routeGroup.addLayer(polyLine)
    }

    getBounds()
    {
        return this.container.getBounds();
    }

    fitBounds()
    {
        if (this.getParent())
        {
            this.getParent().setBounds(this.getBounds());
        }
    }

    _updateStartMarker()
    {
        if (!this.startMarker)
        {
            this.startMarker = L.circleMarker(this.getStartLocation());
            this.startMarker.setRadius(10);
            this.startMarker.setStyle({
                fillColor: "green",
                color: "green",
                opacity: 0.8,
                fillOpacity: 0.8
            });
            this.markerGroup.addLayer(this.startMarker);
        }
        else
        {
            this.startMarker.setLatLng(this.getStartLocation());
        }
    }

    _updateEndMarker()
    {
        if (!this.endMarker)
        {
            this.endMarker = L.circleMarker(this.getEndLocation());
            this.endMarker.setRadius(10);
            this.endMarker.setStyle({
                fillColor: "red",
                color: "red",
                opacity: 0.8,
                fillOpacity: 0.8
            });
            this.markerGroup.addLayer(this.endMarker);
        }
        else
        {
            this.endMarker.setLatLng(this.getEndLocation());
        }

    }
}
