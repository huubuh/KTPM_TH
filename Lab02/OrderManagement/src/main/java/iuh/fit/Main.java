package iuh.fit;

import iuh.fit.decorator.BasicOrder;
import iuh.fit.decorator.ExpressFeeDecorator;
import iuh.fit.decorator.GiftWrapDecorator;
import iuh.fit.decorator.OrderComponent;
import iuh.fit.state.CancelledState;
import iuh.fit.state.NewState;
import iuh.fit.strategy.ExpressShipping;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        System.out.println("===== DON HANG 1 =====");
        Order order1 = new Order();

        // Decorator: them dich vu
        OrderComponent basicOrder = new BasicOrder();
        basicOrder = new GiftWrapDecorator(basicOrder);
        basicOrder = new ExpressFeeDecorator(basicOrder);
        order1.setOrderComponent(basicOrder);

        // Strategy: chon cach giao hang
        order1.setShippingStrategy(new ExpressShipping());

        // State: xu ly trang thai
        order1.setState(new NewState());

        order1.showOrderInfo();
        System.out.println();

        order1.processOrder();
        System.out.println();

        order1.processOrder();
        System.out.println();

        order1.processOrder();
        System.out.println();

        System.out.println("===== DON HANG 2 =====");
        Order order2 = new Order();
        order2.setOrderComponent(new BasicOrder());
        order2.setState(new CancelledState());

        order2.showOrderInfo();
        System.out.println();
        order2.processOrder();
    }
}