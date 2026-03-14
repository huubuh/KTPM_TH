package iuh.fit.transport;

public class Ship implements Transport{

    @Override
    public void deliver() {
        System.out.println("giao hàng đường biển bằng tàu");
    }
}
