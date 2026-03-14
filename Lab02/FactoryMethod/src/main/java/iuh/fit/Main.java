package iuh.fit;

import iuh.fit.logistics.Logistics;
import iuh.fit.logistics.RoadLogistics;
import iuh.fit.logistics.SeaLogistics;

public class Main {
    public static void main(String[] args) {
        System.out.println("Logistics Đường Bộ");
        Logistics roadLog = new RoadLogistics();
        roadLog.planDelivery();
        System.out.println();
        System.out.println("Logistics Đường Thủy");
        Logistics seaLog = new SeaLogistics();
        seaLog.planDelivery();
    }
}