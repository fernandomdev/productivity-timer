# Contador de Tiempo de Productividad

Sistema hecho en 1 hora para mi localhost para controlar las horas que le dedico a la programación.

## Código SQL

```
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `registros` (
  `registro_id` int(11) NOT NULL,
  `reg_fecha` date NOT NULL,
  `reg_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `registros`
  MODIFY `registro_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

```
