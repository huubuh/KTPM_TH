package iuh.fit;

import iuh.fit.decorator.BasicPayment;
import iuh.fit.decorator.DiscountDecorator;
import iuh.fit.decorator.PaymentComponent;
import iuh.fit.decorator.ProcessingFeeDecorator;
import iuh.fit.strategy.CreditCardPayment;
import iuh.fit.strategy.PayPalPayment;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        System.out.println("===== GIAO DICH 1 =====");
        Payment payment1 = new Payment();

        PaymentComponent p1 = new BasicPayment(500.0);
        p1 = new ProcessingFeeDecorator(p1);
        p1 = new DiscountDecorator(p1);

        payment1.setPayment(p1);
        payment1.setStrategy(new CreditCardPayment());

        payment1.showPaymentInfo();
        System.out.println();
        payment1.processPayment();
        System.out.println();
        payment1.processPayment();
        System.out.println();
        payment1.processPayment();

        System.out.println("\n===== GIAO DICH 2 =====");
        Payment payment2 = new Payment();

        PaymentComponent p2 = new BasicPayment(1000.0);
        p2 = new ProcessingFeeDecorator(p2);

        payment2.setPayment(p2);
        payment2.setStrategy(new PayPalPayment());

        payment2.showPaymentInfo();
        System.out.println();
        payment2.processPayment();
        System.out.println();
        payment2.processPayment();
        System.out.println();
        payment2.processPayment();
    }
}