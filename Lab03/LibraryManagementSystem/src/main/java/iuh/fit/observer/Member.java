package iuh.fit.observer;

public class Member implements LibraryObserver {
    private String name;
    private String email;

    public Member(String name, String email) {
        this.name = name;
        this.email = email;
    }

    @Override
    public void update(String message) {
        System.out.println("Thành viên " + name + " nhận thông báo: " + message);
    }
}
