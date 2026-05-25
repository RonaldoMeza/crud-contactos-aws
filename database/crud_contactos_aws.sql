-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS crud_contactos_aws;

-- 2. Usar la base de datos
USE crud_contactos_aws;

-- 3. Crear la tabla contacts si no existe
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Insertar algunos datos de prueba
INSERT INTO contacts (nombre, telefono, email, direccion) VALUES 
('Juan Pérez', '987654321', 'juan.perez@example.com', 'Av. Siempre Viva 123'),
('María García', '912345678', 'maria.garcia@example.com', 'Calle Falsa 456'),
('Carlos López', '955443322', 'carlos.lopez@example.com', 'Jr. Los Olivos 789');
