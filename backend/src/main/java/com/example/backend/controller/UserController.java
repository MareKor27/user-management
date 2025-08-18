package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {
    // można stworzyć typ zmienej w której odpowiedzią na zapytania były by [dane?,status,wiadomość]

    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    if (!user.getEmail().equals(updatedUser.getEmail()) &&
                        userRepository.existsByEmail(updatedUser.getEmail())) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body("Email already exists");
                    }

                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    userRepository.save(user); 
                    return ResponseEntity.ok("User updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllUsers() {
        userRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
