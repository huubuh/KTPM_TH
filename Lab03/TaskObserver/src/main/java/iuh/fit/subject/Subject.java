package iuh.fit.subject;

import iuh.fit.Observer.Observer;

public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}
