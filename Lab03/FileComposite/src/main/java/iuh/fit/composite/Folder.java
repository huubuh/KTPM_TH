package iuh.fit.composite;

import java.util.ArrayList;
import java.util.List;

public class Folder extends FileSystemComponent {
    private List<FileSystemComponent> children;

    public Folder(String name) {
        super(name);
        children = new ArrayList<>();
    }

    @Override
    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public void showInfo(String indent) {
        System.out.println(indent + "+ Folder: " + name);
        for (FileSystemComponent component : children) {
            component.showInfo(indent + "   ");
        }
    }
}
