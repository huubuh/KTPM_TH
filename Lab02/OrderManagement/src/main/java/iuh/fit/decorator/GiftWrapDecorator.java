package iuh.fit.decorator;

public class GiftWrapDecorator extends OrderDecorator{
    public GiftWrapDecorator(OrderComponent order) {
        super(order);
    }

    @Override
    public String getDescription() {
        return order.getDescription() + " + Gói quà";
    }

    @Override
    public double getCost() {
        return order.getCost() + 15.0;
    }
}
