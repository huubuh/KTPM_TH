package iuh.fit.decorator;

public class ExpressFeeDecorator extends OrderDecorator {
    public ExpressFeeDecorator(OrderComponent order) {
        super(order);
    }

    @Override
    public String getDescription() {
        return order.getDescription() + " + Phí giao nhanh";
    }

    @Override
    public double getCost() {
        return order.getCost() + 30.0;
    }
}
