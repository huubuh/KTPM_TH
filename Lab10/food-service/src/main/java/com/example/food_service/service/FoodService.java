package com.example.food_service.service;

import com.example.food_service.model.Food;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FoodService {

    private final List<Food> foods = new ArrayList<>();
    private Long idCounter = 1L;

    public FoodService() {

        // Seed sẵn món ăn
        foods.add(new Food(idCounter++, "Cơm gà xối mỡ", 45000,
                "https://images.unsplash.com/photo-1512058564366-18510be2db19"));

        foods.add(new Food(idCounter++, "Bánh mì thịt", 25000,
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836"));

        foods.add(new Food(idCounter++, "Trà sữa trân châu", 30000,
                "https://images.unsplash.com/photo-1558857563-b371033873b8"));

        foods.add(new Food(idCounter++, "Hamburger bò", 55000,
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"));

        foods.add(new Food(idCounter++, "Pizza hải sản", 120000,
                "https://images.unsplash.com/photo-1513104890138-7c749659a591"));

        foods.add(new Food(idCounter++, "Gỏi cuốn tôm thịt", 35000,
                "https://images.unsplash.com/photo-1544025162-d76694265947"));

        foods.add(new Food(idCounter++, "Cà phê sữa đá", 20000,
                "https://images.unsplash.com/photo-1509042239860-f550ce710b93"));

        foods.add(new Food(idCounter++, "Bún đậu mắm tôm", 50000,
                "https://images.unsplash.com/photo-1490645935967-10de6ba17061"));
    }

    public List<Food> getAll() {
        return foods;
    }

    public Food add(Food food) {
        food.setId(idCounter++);
        foods.add(food);
        return food;
    }

    public Food update(Long id, Food updated) {
        for (Food f : foods) {
            if (f.getId().equals(id)) {
                f.setName(updated.getName());
                f.setPrice(updated.getPrice());
                return f;
            }
        }
        return null;
    }

    public void delete(Long id) {
        foods.removeIf(f -> f.getId().equals(id));
    }
}