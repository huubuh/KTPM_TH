package iuh.fit.state;

import iuh.fit.Tax;

public class CalculatedState  implements TaxState {

    @Override
    public void handle(Tax context) {
        System.out.println("Trạng thái : Đang tính thuế");
        System.out.println("Đang in kết quả hóa đơn...");
        context.setState(new CompletedState());
        System.out.println("=> Chuyển sang trạng thái: Hoàn tất");
    }
}
