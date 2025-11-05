# 📊 Telco Churn Dashboard

Dashboard ejecutivo en React para análisis de fuga de clientes (Customer Churn) en empresas de telecomunicaciones.

<img width="1106" height="695" alt="image" src="https://github.com/user-attachments/assets/ea1ca30a-33fd-489f-8df0-a641885ef952" />

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.2-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Características

- ✅ **Carga de CSV**: Sube archivos CSV directamente desde el navegador
- 📈 **KPIs Ejecutivos**: Total usuarios, Churn Rate, Tenure medio, Ticket medio
- 🔍 **Filtros Avanzados**: Por tipo de contrato y servicio de internet
- 📊 **Visualizaciones**: Gráficas de barras interactivas con Recharts
- 🔎 **Búsqueda Global**: Busca en todos los campos de los registros
- 📄 **Paginación**: Navega por los datos con paginación de 10 registros
- 💾 **Exportación CSV**: Descarga los datos filtrados en formato CSV
- 🎨 **Diseño Corporativo**: Paleta de colores BIG School (#0033A0)
- 📱 **Responsive**: Adaptado a móviles, tablets y escritorio

## 🚀 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de estilos utility-first
- **Recharts** - Biblioteca de gráficas
- **PapaParse** - Parser CSV
- **FileSaver.js** - Exportación de archivos

## 📋 Requisitos Previos

- Node.js >= 16.x
- npm >= 8.x
<img width="501" height="73" alt="image" src="https://github.com/user-attachments/assets/dddfdfbb-d339-4063-9634-50c1e3324feb" />


## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/davallejo/telco-churn-dashboard.git
cd telco-churn-dashboard

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```
<img width="467" height="121" alt="image" src="https://github.com/user-attachments/assets/1bc04dc3-f6b3-4289-98fc-44d9f4edf60a" />

<img width="467" height="118" alt="image" src="https://github.com/user-attachments/assets/af24e9be-83a9-412d-97c7-4757ac8f4802" />

<img width="893" height="457" alt="image" src="https://github.com/user-attachments/assets/c155f3d3-4629-4a58-8a7d-7b37a31f7ac3" />



El dashboard estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
telco-churn-dashboard/
├── package.json              # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── index.html               # HTML principal
├── src/
│   ├── main.jsx            # Punto de entrada React
│   ├── index.css           # Estilos globales y Tailwind
│   └── App.jsx             # Componente principal del dashboard
└── README.md
```
<img width="1000" height="572" alt="image" src="https://github.com/user-attachments/assets/9f679620-f87d-4aa5-a9d9-af1142529033" />


## 📊 Formato del CSV

El dashboard espera un archivo CSV con las siguientes columnas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `customerID` | String | ID único del cliente |
| `gender` | String | Género (Male/Female) |
| `SeniorCitizen` | Number | Ciudadano senior (0/1) |
| `Partner` | String | Tiene pareja (Yes/No) |
| `Dependents` | String | Tiene dependientes (Yes/No) |
| `tenure` | Number | Meses como cliente |
| `PhoneService` | String | Servicio telefónico (Yes/No) |
| `MultipleLines` | String | Múltiples líneas |
| `InternetService` | String | Tipo de internet (DSL/Fiber optic/No) |
| `OnlineSecurity` | String | Seguridad online (Yes/No) |
| `OnlineBackup` | String | Backup online (Yes/No) |
| `DeviceProtection` | String | Protección de dispositivos |
| `TechSupport` | String | Soporte técnico (Yes/No) |
| `StreamingTV` | String | TV streaming (Yes/No) |
| `StreamingMovies` | String | Películas streaming (Yes/No) |
| `Contract` | String | Tipo de contrato (Month-to-month/One year/Two year) |
| `PaperlessBilling` | String | Facturación sin papel (Yes/No) |
| `PaymentMethod` | String | Método de pago |
| `MonthlyCharges` | Number | Cargo mensual |
| `TotalCharges` | Number | Cargo total |
| `Churn` | String | Cliente fugado (Yes/No/1/0/True/False) |

### Ejemplo de CSV

```csv
customerID,gender,SeniorCitizen,Partner,Dependents,tenure,PhoneService,MultipleLines,InternetService,OnlineSecurity,OnlineBackup,DeviceProtection,TechSupport,StreamingTV,StreamingMovies,Contract,PaperlessBilling,PaymentMethod,MonthlyCharges,TotalCharges,Churn
7590-VHVEG,Female,0,Yes,No,1,No,No phone service,DSL,No,Yes,No,No,No,No,Month-to-month,Yes,Electronic check,29.85,29.85,No
5575-GNVDE,Male,0,No,No,34,Yes,No,DSL,Yes,No,Yes,No,No,No,One year,No,Mailed check,56.95,1889.5,No
```
<img width="1334" height="524" alt="image" src="https://github.com/user-attachments/assets/4c28ebc7-925a-4aa2-80e1-733bd0b70126" />

## 🎨 Paleta de Colores

El dashboard utiliza la paleta corporativa de BIG School:

- **Azul Corporativo**: `#0033A0` - Encabezado, botones principales
- **Blanco**: `#FFFFFF` - Fondo de tarjetas
- **Grises**: Escala de grises para texto y bordes
- **Rojo**: Indicadores de Churn
- **Verde**: Indicadores de retención

## 🔧 Funcionalidades Principales

### 1. Normalización de Datos

El dashboard normaliza automáticamente:
- **Churn**: Convierte Yes/No, 1/0, True/False, Si/Sí → "Yes" o "No"
- **Números**: Acepta comas decimales (,) y puntos de miles
- **Campos vacíos**: Tratados como valores por defecto (0 o "No")

### 2. KPIs Calculados

- **Total Usuarios**: Cuenta de registros filtrados
- **Churn Rate**: % de clientes que abandonaron el servicio
- **Tenure Medio**: Promedio de meses como cliente
- **Ticket Medio**: Promedio de cargo mensual
<img width="825" height="95" alt="image" src="https://github.com/user-attachments/assets/911b29be-915a-498c-83d9-bb1dff5e45c8" />


### 3. Filtros Interactivos

Los filtros afectan simultáneamente:
- Tarjetas de KPIs
- Gráficas de barras
- Tabla de registros
<img width="822" height="118" alt="image" src="https://github.com/user-attachments/assets/2958d465-31c9-471c-9ad4-04e839537a39" />

### 4. Búsqueda Global

Busca en tiempo real en todos los campos del dataset filtrado.
<img width="818" height="209" alt="image" src="https://github.com/user-attachments/assets/46a16d38-527c-4b65-a260-59fba0441590" />


### 5. Exportación

Exporta los registros filtrados actuales en formato CSV con el nombre `telco_churn_filtered.csv`.
<img width="328" height="83" alt="image" src="https://github.com/user-attachments/assets/3064ec17-f94f-4277-ac12-436980d88c54" />


## 📸 Capturas de Pantalla

### Vista Principal
- Header azul corporativo con branding
- 4 KPIs principales en tarjetas blancas
- Filtros por contrato e internet

<img width="1107" height="554" alt="image" src="https://github.com/user-attachments/assets/78c8f989-605f-4314-86fa-4080a7ceab2b" />


### Visualizaciones
- Gráfica de % Churn por tipo de contrato
- Gráfica de % Churn por servicio de internet

<img width="1107" height="542" alt="image" src="https://github.com/user-attachments/assets/1173eabd-eba9-4f47-af76-2d10bef7a0a0" />


### Tabla de Datos
- Búsqueda global
- Paginación de 10 registros
- Estados visuales para Churn (verde/rojo)
- Botón de exportación CSV

<img width="1073" height="651" alt="image" src="https://github.com/user-attachments/assets/b351d4df-f1b0-4794-bfab-381c35ab6ab7" />


## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Mejoras Futuras

- [ ] Filtros por rango de fechas (tenure)
- [ ] Exportación a Excel
- [ ] Gráficas adicionales (línea temporal, pie charts)
- [ ] Comparación entre periodos
- [ ] Predicción de Churn con ML
- [ ] Dashboard de cohortes
- [ ] Análisis de RFM (Recency, Frequency, Monetary)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Autor

Desarrollado por **Diego Vallejo**

## 🙏 Agradecimientos

- Dataset de ejemplo: [IBM Telco Customer Churn](https://www.kaggle.com/blastchar/telco-customer-churn)
- Inspiración: Mejores prácticas de dashboards ejecutivos
- Comunidad React y Tailwind CSS

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub!
