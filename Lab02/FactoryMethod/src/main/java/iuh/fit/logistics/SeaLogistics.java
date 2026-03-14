package iuh.fit.logistics;

import iuh.fit.transport.Ship;
import iuh.fit.transport.Transport;

public  class SeaLogistics extends Logistics{


    @Override
    public Transport createTransport() {
        return new Ship();
    }
}
