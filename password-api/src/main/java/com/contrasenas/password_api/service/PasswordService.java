package com.contrasenas.password_api.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;

@Service
public class PasswordService {

    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>/?";

    public String generatePassword(int length, boolean includeLower, boolean includeUpper, boolean includeDigits, boolean includeSymbols) {
        StringBuilder charPool = new StringBuilder();
        
        if (includeLower) charPool.append(LOWERCASE);
        if (includeUpper) charPool.append(UPPERCASE);
        if (includeDigits) charPool.append(DIGITS);
        if (includeSymbols) charPool.append(SYMBOLS);

        // Validación de negocio
        if (charPool.length() == 0) {
            throw new IllegalArgumentException("Debes seleccionar al menos un tipo de carácter.");
        }

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charPool.length());
            password.append(charPool.charAt(randomIndex));
        }

        return password.toString();
    }
}