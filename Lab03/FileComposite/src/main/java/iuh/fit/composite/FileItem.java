package iuh.fit.composite;

public class FileItem extends FileSystemComponent {
    private double size;

    public FileItem(String name, double size) {
        super(name);
        this.size = size;
    }

    @Override
    public void showInfo(String indent) {
        System.out.println(indent + "- File: " + name + " (" + size + " MB)");
    }
}
