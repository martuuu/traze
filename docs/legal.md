1. Arquitectura de Portales y Roles de Usuario
El sistema funcionará bajo una arquitectura multi-inquilino (SaaS) con cuatro portales interactivos, diseñados para garantizar transparencia y cumplimiento normativo:
• Portal Campo / Sala de Cultivo (El "Motor" del Sistema): Es el entorno de origen donde se da de alta la genética, el inventario y los lotes. Key Feature: Aquí operan administrativamente el Responsable Técnico (Ingeniero Agrónomo) y el Director Médico. No necesitan un portal separado; mediante un control de roles (RBAC), el Agrónomo cargará y firmará digitalmente el "Plan de Cultivo" y el manejo de insumos, mientras que el Médico validará la indicación médica, dosis y evolución de los pacientes.
• Portal ONG / Club (Distribuidor): Funciona como un canal autorizado. Se alimenta directamente del inventario que el Campo habilita. Su función principal es vincular pacientes, gestionar cupos legales (REPROCANN) y generar la logística de entrega.
• Portal Paciente / Socio: Interfaz de transparencia. El paciente ve el estado de su autorización, su historial clínico básico, las plantas que se le asignaron, sus compras y el progreso de "su medicina".
• Portal Estado / Auditoría: Un panel de solo lectura (read-only) diseñado para inspectores del INASE, ARICCAME, ANMAT o Ministerio de Salud, permitiendo auditar la trazabilidad escaneando un QR.

--------------------------------------------------------------------------------
2. Flujo de Trazabilidad End-to-End y Compliance Legal
Fase A: Origen y Banco de Semillas (Trazabilidad Hacia Atrás)
El flujo inicia con la adquisición legal del germoplasma.
• CRUD de Proveedores e Insumos: La plataforma registrará los datos del proveedor, facturas y, muy importante, el registro en el INASE (Instituto Nacional de Semillas).
• Identificación INASE: El sistema debe registrar la estampilla de seguridad, el rótulo de la semilla, nombre del cultivar, pureza y poder germinativo (según Res. INASE 260/2022).
• Árbol Taxonómico (Esquejes/Clones): Se desarrollará un módulo para generar "IDs hijos" a partir de una "Planta Madre", heredando la trazabilidad genética de origen.
• Banco de Lotes: Las semillas/esquejes se asignan a lotes virtuales (el "BANCO") con control de fecha de vencimiento, condiciones ambientales (humedad/temperatura de conservación) y fecha de ingreso.
Fase B: Alta en el Campo y Asignación "Momento 0" (Key Feature)
Una vez que el Campo decide sacar semillas del Banco y plantarlas, el sistema genera la entidad "Planta" o "Lote de Cultivo".
• Sincronización en Tiempo Real: En el instante en que el Campo da de alta el lote en vegetación, este inventario aparece como disponible en el Dashboard de la ONG vinculada.
• Asignación de Pacientes: La ONG toma esas plantas y las asigna nominalmente a sus socios desde el Momento 0.
• Control Legal REPROCANN Automatizado: El software impedirá que la ONG asigne más de 9 plantas florecidas por paciente, y validará que la ONG no supere su cupo de 150 pacientes vinculados (ampliable bajo petición) y un máximo de 3 domicilios de cultivo declarados (Res. 1780/2025).
Fase C: Cultivo y Trazabilidad Interna
El desarrollo fenológico de la planta se registra paso a paso.
• Libro de Campo Digital: El Ingeniero Agrónomo registrará trasplantes, podas, uso de biofertilizantes, control de plagas y descarte de material biológico.
• Informes Cromatográficos: Es un requisito excluyente de la nueva ley. Antes de liberar la cosecha para la ONG, el Campo debe cargar en el sistema un análisis de laboratorio (HPLC o GC) que certifique los niveles de THC, CBD y terpenos del lote específico. Sin este documento cargado, el sistema no permitirá la distribución.
Fase D: Cosecha, Transporte y Venta/Distribución
• Carta de Porte / Guía de Transporte: Para mover la cosecha del Campo a la ONG o al Paciente de manera legal, el sistema generará automáticamente un documento con carácter de Declaración Jurada vía TAD (Trámites a Distancia). Contendrá: origen georreferenciado, destino, transportista y cantidades.
• Control de Límites: El sistema bloqueará entregas que superen los 40 gramos de flores secas o 6 frascos de 30 ml por paciente, asegurando que nadie en la cadena cometa un ilícito bajo la Ley de Drogas 23.737.

--------------------------------------------------------------------------------
3. Estructura de Dashboards y Tablas (UX/UI)
Para cumplir con tu requerimiento de claridad operativa, los Dashboards deben ser el centro neurálgico del software:
Dashboard del Campo / Sala:
• Tabla de Lotes Activos: [ID Universal] | [Genética INASE] | [Etapa: Germinación/Vegetativo/Flora] | [ONG Asignada] | [Ubicación Física/Sala] | [Estado de Alertas IoT].
• Módulo de Profesionales: Alertas de informes pendientes a firmar por el Director Médico o Responsable Técnico.
Dashboard de la ONG / Club:
• Tabla de Pacientes (REPROCANN): [Nombre] | [DNI] | [Código de Vinculación] | [Plantas Asignadas (X/9)] | [Estado Credencial (Vencimiento)].
• Tabla de Entregas/Dispensario: [Paciente] | [Lote Entregado] | [Cantidad (g/ml)] | [Fecha] | [Link a Informe Cromatográfico].

--------------------------------------------------------------------------------
4. Requerimientos de Seguridad y Desarrollo
1. Integración de Identidad: El login de los pacientes, médicos y directivos de la ONG debería validarse indirectamente contra la plataforma Mi Argentina o contener los códigos de vinculación de 6 dígitos que emite el estado.
2. Manejo de Datos Sensibles (Ley 25.326): Al incluir historiales clínicos y domicilios de cultivo, el sistema maneja datos de salud. Es obligatorio aplicar encriptación de bases de datos, auditorías de acceso (logs) y un repositorio digital seguro para el Consentimiento Informado Bilateral firmado entre médico y paciente.
3. Tecnología de Identificación Unívoca: Se recomienda el uso de estándares internacionales (como GS1) para los códigos QR, permitiendo que la lectura de una planta o un frasco de aceite revele al instante la "vida" del producto, desde la semilla original, los insumos utilizados en el campo, hasta el análisis de laboratorio.
Conclusión Estratégica
Este sistema no solo resuelve un problema operativo de "inventario", sino que es un escudo legal para las ONGs y los Campos. Al forzar que el software controle los límites de plantas (1-9), el transporte (40g/6 frascos), el número de domicilios (máx 3) y la obligatoriedad de los informes cromatográficos, el producto ofrecerá garantía que las instituciones no pierdan su habilitación estatal. Es un producto de altísimo valor agregado (Software as a Service - SaaS) por el cual las ONGs estarán dispuestas a pagar un fee mensual, ya que el costo de incumplir la ley es el cierre del proyecto o causas penales.