package com.contrasenas.password_api.controller;

import com.contrasenas.password_api.service.PasswordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/passwords")
@CrossOrigin(origins = "*") // Permite la conexión directa desde el frontend de React
public class PasswordController {

    private final PasswordService passwordService;

    // Inyección de dependencias por constructor (Buena práctica)
    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generatePassword(
            @RequestParam(defaultValue = "16") int length,
            @RequestParam(defaultValue = "true") boolean lower,
            @RequestParam(defaultValue = "true") boolean upper,
            @RequestParam(defaultValue = "true") boolean digits,
            @RequestParam(defaultValue = "true") boolean symbols) {

        Map<String, String> response = new HashMap<>();

        try {
            String password = passwordService.generatePassword(length, lower, upper, digits, symbols);
            response.put("password", password);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}