package iuh.fit.factoty;

public abstract class Book {
    protected String id;
    protected String title;
    protected String author;
    protected String category;
    protected boolean isAvailable;

    public Book(String id, String title, String author, String category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = true;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getCategory() {
        return category;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean status) {
        this.isAvailable = status;
    }

    public abstract String getDescription();

    @Override
    public String toString() {
        return "Mã sách: " + id +
                ", Tên sách: " + title +
                ", Tác giả: " + author +
                ", Thể loại: " + category +
                ", Trạng thái: " + (isAvailable ? "Có sẵn" : "Đang được mượn");
    }
}
