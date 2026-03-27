package iuh.fit.factoty;

public class PrintedBook extends Book {
    private int pageCount;

    public PrintedBook(String id, String title, String author, String category, int pageCount) {
        super(id, title, author, category);
        this.pageCount = pageCount;
    }

    @Override
    public String getDescription() {
        return "Sách giấy - " + title + " (" + pageCount + " trang)";
    }
}