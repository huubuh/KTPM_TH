package iuh.fit.observer;

import java.util.ArrayList;
import java.util.List;
public class Stock implements Subject{
   private String name;
    private double price;
    private List<Observer> observers;

 public Stock(String name, double price) {
  this.name = name;
  this.price = price;
  this.observers = new ArrayList<>();
 }

 public void setPrice(double price) {
  if (this.price != price) {
   this.price = price;
   System.out.println("\nGiá cổ phiếu " + name + " đã thay đổi thành: " + price);
   notifyObservers();
  }
 }
 public double getPrice() {
  return price;
 }

 public String getName() {
  return name;
 }
 @Override
 public void attach(Observer o) {
  observers.add(o);
  System.out.println("Đã đăng ký observer.");
 }

 @Override
 public void detach(Observer o) {
  observers.remove(o);
  System.out.println("Đã hủy đăng ký observer.");
 }

 @Override
 public void notifyObservers() {
  for (Observer observer : observers) {
   observer.update(name, price);
  }
 }
}
