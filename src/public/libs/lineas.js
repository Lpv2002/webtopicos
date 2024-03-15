//const datos = [{ year: '2008', value: 5000},{year: '2009',value: 1000}]
new Morris.Line({
    // ID del elemento en el que dibujar el gráfico.
    element: 'myfirstchart',
    // Registros de datos del gráfico: cada entrada en esta matriz corresponde a un punto en
    // el gráfico.
    data: [{year:'2024',value:6000},{year:'2023', value:24500}],
    // El nombre del atributo de registro de datos que contiene valores de x.
    xkey: 'year',
    // Una lista de nombres de atributos de registros de datos que contienen valores y.
    ykeys: ['value'],
    // Etiquetas para las teclas y -- se mostrarán cuando pase el cursor sobre el
    // cuadro.
    labels: ['Value'],
    resize: true
});