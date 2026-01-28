import prisma from "../src/config/prismaConfig.js";

async function main() {
  // Usuarios de prueba
  await prisma.usuario.createMany({
    data: [
      {
        email: "superadmin@example.com",
        password: "admin123",
        rol: "SUPERADMIN",
      },
      {
        email: "admin@example.com",
        password: "admin123",
        rol: "ADMIN",
      },
      { email: "juan@example.com", password: "123456" },
      { email: "maria@example.com", password: "123456" },
    ],
    skipDuplicates: true, // evita errores si ya existen
  });

  await prisma.pais.createMany({
    data: [
      { nombre: "Guatemala" },
      { nombre: "El Salvador" },
      { nombre: "Honduras" },
      { nombre: "Nicaragua" },
      { nombre: "Costa Rica" },
      { nombre: "Panamá" },
    ],
    skipDuplicates: true,
  });

  await prisma.segmento.createMany({
    data: [
      { nombre: "Niños" },
      { nombre: "Adolescentes" },
      { nombre: "Jóvenes" },
      { nombre: "Adultos" },
      { nombre: "Adultos Mayores" },
    ],
    skipDuplicates: true,
  });

  //Insertar datos de Perfiles segun los ususarios creados
  const superAdmin = await prisma.usuario.findUnique({
    where: { email: "superadmin@example.com" },
  });

  const admin = await prisma.usuario.findUnique({
    where: { email: "admin@example.com" },
  });

  const juan = await prisma.usuario.findUnique({
    where: { email: "juan@example.com" },
  });

  const maria = await prisma.usuario.findUnique({
    where: { email: "maria@example.com" },
  });

  const pais = await prisma.pais.findUnique({
    where: { nombre: "El Salvador" },
  });

  const adultos = await prisma.segmento.findUnique({
    where: { nombre: "Adultos" },
  });

  const jovenes = await prisma.segmento.findUnique({
    where: { nombre: "Jóvenes" },
  });

  const perfiles = [
    {
      nombre: "Super",
      apellido: "Admin",
      usuarioId: superAdmin.id,
      paisId: pais.id,
      segmentoId: adultos.id,
    },
    {
      nombre: "Admin",
      apellido: "User",
      usuarioId: admin.id,
      paisId: pais.id,
      segmentoId: adultos.id,
    },
    {
      nombre: "Juan",
      apellido: "Pérez",
      edad: 40,
      telefono: "555-1234",
      usuarioId: juan.id,
      paisId: pais.id,
      segmentoId: adultos.id,
    },
    {
      nombre: "María",
      apellido: "Gómez",
      edad: 20,
      telefono: "555-5678",
      usuarioId: maria.id,
      paisId: pais.id,
      segmentoId: jovenes.id,
    },
  ];

  for (const perfil of perfiles) {
    const existe = await prisma.perfil.findFirst({
      where: { usuarioId: perfil.usuarioId },
    });

    if (!existe) {
      await prisma.perfil.create({ data: perfil });
    }
  }

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
    // Crear tema si no existe
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

    // Crear colecciones de forma idempotente
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
            estado: true,
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
