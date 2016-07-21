import ManagedObject from "sap/ui/base/ManagedObject";

export default class ServiceClient extends ManagedObject
{
    metadata = {
        events: {
            ready: { }
        }
    };

    static _instance = null;

    constructor(...args)
    {
        super(...args);
    }

    init()
    {
        this.initDrivingService()
            .then(() => this.fireReady());
    }

    static getInstance()
    {
        if (!gd.service.ServiceClient._instance)
        {
            gd.service.ServiceClient._instance = new gd.service.ServiceClient();
        }
        return gd.service.ServiceClient._instance;
    }

    initDrivingService()
    {
        return new Promise((resolve, reject) => {
            AMap.service([ "AMap.Driving" ], () => {
                this.driving = new AMap.Driving();
                this.driving ? resolve(this) : reject();
            });
        });
    }



}
