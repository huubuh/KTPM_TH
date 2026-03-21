package iuh.fit;

import iuh.fit.observer.Investor;
import iuh.fit.observer.Stock;

public class Main {
    public static void main(String[] args) {
        Stock stock = new Stock("FPT", 100.0);

        Investor investor1 = new Investor("Nguyễn Văn Huy");
        Investor investor2 = new Investor("Trần Thị Lan");
        Investor investor3 = new Investor("Lê Văn An");

        stock.attach(investor1);
        stock.attach(investor2);
        stock.attach(investor3);

        stock.setPrice(105.5);
        stock.setPrice(110.0);

        stock.detach(investor2);

        stock.setPrice(120.0);
    }
}