package iuh.fit.transport;

public class Truck implements Transport{

    @Override
    public void deliver() {
        System.out.println("giao hàng đường bộ bằng xe tải");
    }
}
