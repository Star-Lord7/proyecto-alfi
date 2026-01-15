import prisma from "../src/config/prismaConfig.js";

async function main() {
  // Crear 2 usuarios de prueba
  await prisma.usuario.createMany({
    data: [
      { nombre: "Juan Perez", email: "juan@example.com", password: "123456" },
      { nombre: "Maria Lopez", email: "maria@example.com", password: "123456" },
    ],
    skipDuplicates: true, // evita errores si ya existen
  });

  // 5 temas de finanzas
  const temas = [
    {
      nombre: "Finanzas Personales",
      colecciones: [
        {
          titulo: "Gestión de Ingresos",
          descripcion:
            "Aprende a controlar y organizar tus ingresos mensuales.",
        },
        {
          titulo: "Presupuesto Familiar",
          descripcion: "Cómo crear un presupuesto efectivo para tu hogar.",
        },
        {
          titulo: "Ahorro Inteligente",
          descripcion:
            "Técnicas y estrategias para ahorrar de forma eficiente.",
        },
        {
          titulo: "Gastos y Prioridades",
          descripcion:
            "Aprender a priorizar gastos y evitar gastos innecesarios.",
        },
        {
          titulo: "Planificación Financiera",
          descripcion: "Cómo planificar tus finanzas a corto y largo plazo.",
        },
      ],
    },
    {
      nombre: "Inversión y Bolsa",
      colecciones: [
        {
          titulo: "Introducción a la Bolsa",
          descripcion:
            "Conceptos básicos de inversión en bolsa y mercados financieros.",
        },
        {
          titulo: "Acciones y Bonos",
          descripcion:
            "Diferencias entre acciones, bonos y cómo invertir en ellos.",
        },
        {
          titulo: "Fondos de Inversión",
          descripcion: "Cómo funcionan los fondos de inversión y sus ventajas.",
        },
        {
          titulo: "Riesgo y Rentabilidad",
          descripcion:
            "Aprender a evaluar riesgo vs rentabilidad de tus inversiones.",
        },
        {
          titulo: "Estrategias de Inversión",
          descripcion:
            "Técnicas y estrategias para invertir de forma segura y efectiva.",
        },
      ],
    },
    {
      nombre: "Ahorro y Presupuesto",
      colecciones: [
        {
          titulo: "Métodos de Ahorro",
          descripcion: "Diferentes formas de ahorrar según tus ingresos.",
        },
        {
          titulo: "Presupuesto Personal",
          descripcion: "Crear un plan de gastos mensual personal.",
        },
        {
          titulo: "Ahorro para Emergencias",
          descripcion: "Cómo y por qué crear un fondo de emergencia.",
        },
        {
          titulo: "Control de Gastos",
          descripcion: "Herramientas y tips para controlar tus gastos diarios.",
        },
        {
          titulo: "Objetivos Financieros",
          descripcion: "Planificación de ahorro para metas concretas.",
        },
      ],
    },
    {
      nombre: "Créditos y Deudas",
      colecciones: [
        {
          titulo: "Tipos de Créditos",
          descripcion:
            "Créditos personales, hipotecarios, educativos y sus usos.",
        },
        {
          titulo: "Intereses y Pagos",
          descripcion: "Cómo funcionan los intereses y pagos de créditos.",
        },
        {
          titulo: "Deuda Responsable",
          descripcion: "Aprender a manejar deudas sin afectar tus finanzas.",
        },
        {
          titulo: "Refinanciamiento",
          descripcion:
            "Opciones para reorganizar tus deudas de forma inteligente.",
        },
        {
          titulo: "Evitar Morosidad",
          descripcion: "Consejos para no caer en impagos y morosidad.",
        },
      ],
    },
    {
      nombre: "Educación Financiera para Jóvenes",
      colecciones: [
        {
          titulo: "Conceptos Básicos",
          descripcion:
            "Aprender los conceptos esenciales de finanzas desde joven.",
        },
        {
          titulo: "Dinero y Ahorro",
          descripcion: "Cómo manejar tu dinero y crear hábitos de ahorro.",
        },
        {
          titulo: "Inversión Inicial",
          descripcion: "Primeros pasos para invertir con poco capital.",
        },
        {
          titulo: "Presupuesto Escolar",
          descripcion: "Cómo administrar dinero en la escuela o universidad.",
        },
        {
          titulo: "Decisiones Inteligentes",
          descripcion: "Tomar decisiones financieras responsables y efectivas.",
        },
      ],
    },
  ];

  for (const temaData of temas) {
    // 3️⃣ Crear tema si no existe
    let tema = await prisma.tema.findUnique({
      where: { nombre: temaData.nombre },
    });
    if (!tema) {
      tema = await prisma.tema.create({
        data: {
          nombre: temaData.nombre,
          descripcion: `Contenido educativo sobre ${temaData.nombre}`,
        },
      });
    }

    // 4️⃣ Crear colecciones de forma idempotente
    for (const coleccionData of temaData.colecciones) {
      const existingColeccion = await prisma.coleccion.findFirst({
        where: { titulo: coleccionData.titulo, temaId: tema.id },
      });

      if (!existingColeccion) {
        await prisma.coleccion.create({
          data: {
            titulo: coleccionData.titulo,
            descripcion: coleccionData.descripcion,
            cantidad_tarjetas: 0,
            estado: "ACTIVA",
            temaId: tema.id,
          },
        });
      }
    }
  }

  console.log("Seed ejecutado ✅");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
