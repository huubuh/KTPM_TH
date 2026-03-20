package iuh.fit.state;

import iuh.fit.Tax;

public class PendingState implements TaxState{
    @Override
    public void handle(Tax context) {
        System.out.println("Trạng thái : Chưa tính thuế");
        System.out.println("Đang chuẩn bị tính thuế...");
        context.setState(new CalculatedState());
        System.out.println("=> Chuyển sang trang thái : Đã tính thuế");
    }
}
