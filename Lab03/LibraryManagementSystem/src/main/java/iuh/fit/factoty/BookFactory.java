package iuh.fit.factoty;

public abstract class BookFactory {
    public abstract Book createBook(String id, String title, String author, String category);
}
