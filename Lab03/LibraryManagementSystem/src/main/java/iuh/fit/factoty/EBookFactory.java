package iuh.fit.factoty;

public class EBookFactory extends BookFactory {
    @Override
    public Book createBook(String id, String title, String author, String category) {
        return new EBook(id, title, author, category, "PDF");
    }
}
