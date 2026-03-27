package iuh.fit.Observer;

public class TeamMember implements Observer {
    private String name;

    public TeamMember(String name) {
        this.name = name;
    }

    @Override
    public void update(String taskName, String status) {
        System.out.println("Thành viên " + name
                + " nhận thông báo: Task [" + taskName
                + "] đã đổi trạng thái thành [" + status + "]");
    }
}
