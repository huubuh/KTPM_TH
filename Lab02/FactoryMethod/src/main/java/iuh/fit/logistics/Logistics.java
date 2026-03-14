package iuh.fit.logistics;

import iuh.fit.transport.Transport;

public abstract class Logistics {
    public abstract Transport createTransport();

    public void planDelivery() {
        Transport transport = createTransport();
        transport.deliver();
    }
}
