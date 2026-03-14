package iuh.fit.logistics;

import iuh.fit.transport.Transport;
import iuh.fit.transport.Truck;

public class RoadLogistics extends Logistics{
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}
