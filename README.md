# 🔐 Generador de Contraseñas Seguro (Full-Stack)

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una aplicación web moderna con arquitectura Cliente-Servidor diseñada para generar contraseñas criptográficamente seguras. 

Este proyecto separa la lógica de negocio y seguridad en una API REST construida con **Java y Spring Boot**, mientras que la interfaz de usuario se gestiona a través de una Single Page Application (SPA) responsiva desarrollada con **React, Vite y Tailwind CSS v4**.

## ✨ Características

* **Seguridad Criptográfica:** Uso de `java.security.SecureRandom` en el backend para garantizar que las contraseñas no sean predecibles.
* **Personalización:** Permite elegir la longitud de la contraseña (de 8 a 64 caracteres) y los tipos de caracteres a incluir (mayúsculas, minúsculas, números y símbolos).
* **Interfaz Moderna (UI/UX):** Diseño oscuro, limpio y minimalista con feedback visual en tiempo real.
* **Portapapeles Integrado:** Copiado de la contraseña generada con un solo clic utilizando la API del navegador.
* **Gestión de Errores:** Validaciones tanto en el cliente como en el servidor para asegurar que se selecciona al menos un tipo de carácter.

## 🏗️ Arquitectura y Tecnologías

El proyecto destaca un enfoque integral, combinando una base sólida en el backend con habilidades modernas de desarrollo frontend.

### Frontend
* **Framework:** React
* **Build Tool:** Vite (rápido empaquetado y HMR)
* **Estilos:** Tailwind CSS v4 (utilizado de forma nativa sin archivos de configuración externos)
* **Gestor de Paquetes:** pnpm

### Backend
* **Lenguaje:** Java 17+
* **Framework:** Spring Boot (Spring Web)
* **Gestor de Dependencias:** Maven
* **CORS:** Configurado para permitir peticiones desde el entorno de desarrollo local.
