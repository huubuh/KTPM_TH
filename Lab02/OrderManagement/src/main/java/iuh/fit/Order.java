package iuh.fit;

import iuh.fit.decorator.OrderComponent;
import iuh.fit.state.OrderState;
import iuh.fit.strategy.ShippingStrategy;

public class Order {
    private OrderState state;
    private ShippingStrategy shippingStrategy;
    private OrderComponent orderComponent;

    public Order() {
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void setShippingStrategy(ShippingStrategy shippingStrategy) {
        this.shippingStrategy = shippingStrategy;
    }

    public void setOrderComponent(OrderComponent orderComponent) {
        this.orderComponent = orderComponent;
    }

    public void processOrder() {
        if (state == null) {
            System.out.println("Chưa có trạng thái cho đơn hàng.");
            return;
        }
        state.handle(this);
    }

    public void shipOrder() {
        if (shippingStrategy == null) {
            System.out.println("chưa chọn phương thức giao hàng.");
            return;
        }
        shippingStrategy.ship();
    }

    public void showOrderInfo() {
        if (orderComponent == null) {
            System.out.println("Chưa có thông tin dịch vụ bổ sung.");
            return;
        }
        System.out.println("Mô tả đơn hàng: " + orderComponent.getDescription());
        System.out.println("Tổng chi phí: " + orderComponent.getCost());
    }
}