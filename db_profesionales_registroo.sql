-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-04-2020 a las 07:51:14
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_profesionales_registroo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correo_usuario`
--

CREATE TABLE `correo_usuario` (
  `id_correo` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_numero_departamento` int(11) NOT NULL,
  `departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_numero_departamento`, `departamento`) VALUES
(1, 'Usulutan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE `estatus` (
  `id_estatus` int(11) NOT NULL,
  `estatus` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estatus`
--

INSERT INTO `estatus` (`id_estatus`, `estatus`) VALUES
(1, 'Casado'),
(2, 'Divorciado'),
(3, 'Soltero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id_genero` int(11) NOT NULL,
  `genero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id_genero`, `genero`) VALUES
(1, 'Femenino'),
(2, 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imformacion_academica`
--

CREATE TABLE `imformacion_academica` (
  `id_academica` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_universidad` int(11) NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `titulo_universitario` longblob NOT NULL,
  `CUM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id_municipio` int(11) NOT NULL,
  `id_numero_departamento` int(11) NOT NULL,
  `municipio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_de_usuario`
--

CREATE TABLE `perfil_de_usuario` (
  `id_perfil` int(11) NOT NULL,
  `nombres_completos` varchar(100) NOT NULL,
  `apellidos_completo` varchar(100) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `id_estatus` int(11) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `DUI` varchar(50) NOT NULL,
  `NIT` varchar(50) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `contraseña` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

CREATE TABLE `puesto` (
  `id_puesto` int(11) NOT NULL,
  `puesto` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `puesto`
--

INSERT INTO `puesto` (`id_puesto`, `puesto`) VALUES
(1, 'Jefe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_de_carrera`
--

CREATE TABLE `registro_de_carrera` (
  `id_carrera` int(11) NOT NULL,
  `id_universidad` int(11) NOT NULL,
  `carrera` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_de_carrera`
--

INSERT INTO `registro_de_carrera` (`id_carrera`, `id_universidad`, `carrera`) VALUES
(2, 2, 'IGS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_de_solicitud`
--

CREATE TABLE `registro_de_solicitud` (
  `id_solicitud` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `educacion_parvularia` varchar(50) NOT NULL,
  `educacion_basica` varchar(50) NOT NULL,
  `educacion_media` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_historial_empleos`
--

CREATE TABLE `registro_historial_empleos` (
  `id_historial` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `empresa` varchar(30) NOT NULL,
  `id_puesto` int(11) NOT NULL,
  `fecha_de_inicio` date NOT NULL,
  `fecha_de_finilizacion` date NOT NULL,
  `telefono_de_empresa` varchar(10) NOT NULL,
  `dirrecion_empresa` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_residencia_usuario`
--

CREATE TABLE `registro_residencia_usuario` (
  `id_residencia` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `id_numero_departamento` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL,
  `direccion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_tele`
--

CREATE TABLE `registro_tele` (
  `id_numero` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `id_tipo_de_telefono` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_universidad`
--

CREATE TABLE `registro_universidad` (
  `id_universidad` int(11) NOT NULL,
  `universidad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_universidad`
--

INSERT INTO `registro_universidad` (`id_universidad`, `universidad`) VALUES
(2, 'UGB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_telefono`
--

CREATE TABLE `tipo_de_telefono` (
  `id_tipo_telefono` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `correo_usuario`
--
ALTER TABLE `correo_usuario`
  ADD PRIMARY KEY (`id_correo`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_numero_departamento`);

--
-- Indices de la tabla `estatus`
--
ALTER TABLE `estatus`
  ADD PRIMARY KEY (`id_estatus`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `imformacion_academica`
--
ALTER TABLE `imformacion_academica`
  ADD PRIMARY KEY (`id_academica`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `perfil_de_usuario`
--
ALTER TABLE `perfil_de_usuario`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indices de la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`id_puesto`);

--
-- Indices de la tabla `registro_de_carrera`
--
ALTER TABLE `registro_de_carrera`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `registro_de_solicitud`
--
ALTER TABLE `registro_de_solicitud`
  ADD PRIMARY KEY (`id_solicitud`);

--
-- Indices de la tabla `registro_historial_empleos`
--
ALTER TABLE `registro_historial_empleos`
  ADD PRIMARY KEY (`id_historial`);

--
-- Indices de la tabla `registro_residencia_usuario`
--
ALTER TABLE `registro_residencia_usuario`
  ADD PRIMARY KEY (`id_residencia`);

--
-- Indices de la tabla `registro_tele`
--
ALTER TABLE `registro_tele`
  ADD PRIMARY KEY (`id_numero`);

--
-- Indices de la tabla `registro_universidad`
--
ALTER TABLE `registro_universidad`
  ADD PRIMARY KEY (`id_universidad`);

--
-- Indices de la tabla `tipo_de_telefono`
--
ALTER TABLE `tipo_de_telefono`
  ADD PRIMARY KEY (`id_tipo_telefono`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `correo_usuario`
--
ALTER TABLE `correo_usuario`
  MODIFY `id_correo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id_numero_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estatus`
--
ALTER TABLE `estatus`
  MODIFY `id_estatus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `imformacion_academica`
--
ALTER TABLE `imformacion_academica`
  MODIFY `id_academica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id_municipio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfil_de_usuario`
--
ALTER TABLE `perfil_de_usuario`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `puesto`
--
ALTER TABLE `puesto`
  MODIFY `id_puesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registro_de_carrera`
--
ALTER TABLE `registro_de_carrera`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `registro_de_solicitud`
--
ALTER TABLE `registro_de_solicitud`
  MODIFY `id_solicitud` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_historial_empleos`
--
ALTER TABLE `registro_historial_empleos`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_residencia_usuario`
--
ALTER TABLE `registro_residencia_usuario`
  MODIFY `id_residencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_tele`
--
ALTER TABLE `registro_tele`
  MODIFY `id_numero` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_universidad`
--
ALTER TABLE `registro_universidad`
  MODIFY `id_universidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_de_telefono`
--
ALTER TABLE `tipo_de_telefono`
  MODIFY `id_tipo_telefono` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
