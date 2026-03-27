package iuh.fit.decorator;

public class ExtendedLoanDecorator extends BorrowDecorator {
    private int extraDays;

    public ExtendedLoanDecorator(BorrowComponent decoratedBorrow, int extraDays) {
        super(decoratedBorrow);
        this.extraDays = extraDays;
    }

    @Override
    public String getBorrowDetails() {
        return decoratedBorrow.getBorrowDetails() +
                ", Gia hạn thêm: " + extraDays + " ngày";
    }
}