package iuh.fit.strategy;

public class StandardShipping implements ShippingStrategy{

    @Override
    public void ship() {
        System.out.println("Giao hàng tiết kiệm ");
    }
}
