package iuh.fit.factoty;


public class EBook extends Book {
    private String fileFormat;

    public EBook(String id, String title, String author, String category, String fileFormat) {
        super(id, title, author, category);
        this.fileFormat = fileFormat;
    }

    @Override
    public String getDescription() {
        return "Sách điện tử - " + title + " (Định dạng: " + fileFormat + ")";
    }
}