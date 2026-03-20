package iuh.fit.state;

import iuh.fit.Tax;

public class CompletedState implements  TaxState{
    @Override
    public void handle(Tax context) {
        System.out.println("Trạng thái : Hoàn tất");
        System.out.println("Hoàn thành tính thuế.");
    }
}
