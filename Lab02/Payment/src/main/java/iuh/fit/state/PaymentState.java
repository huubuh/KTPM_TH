package iuh.fit.state;

import iuh.fit.Payment;

public interface PaymentState {
    void handle(Payment context);
}
