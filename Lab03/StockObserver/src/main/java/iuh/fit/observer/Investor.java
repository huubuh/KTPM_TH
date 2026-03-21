package iuh.fit.observer;

public class Investor implements Observer{
    private String investorName;

    public Investor(String investorName) {
        this.investorName = investorName;
    }

    @Override
    public void update(String stockName, double price) {
        System.out.println("Nhà đầu tư " + investorName
                + " nhận thông báo: Cổ phiếu "
                + stockName + " có giá mới là " + price);
    }
}
