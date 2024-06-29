
import pdfmake from 'pdfmake';
import fs from 'fs';


function generarPdfBalanceBase64(infoBalanceIngresosGastos){
    const fonts = {
        Roboto: {
            normal: 'node_modules/pdfmake/build/vfs_fonts.js',
            bold: 'node_modules/pdfmake/build/vfs_fonts.js',
            italics: 'node_modules/pdfmake/build/vfs_fonts.js',
            bolditalics: 'node_modules/pdfmake/build/vfs_fonts.js'
        }
    };

    const printer = new pdfmake(fonts);

    const docDefinition = {
        content: [
            { text: 'Balance de Ingresos y Gastos', style: 'header' },
            { text: `Fecha: ${new Date().toLocaleDateString()}`, style: 'subheader' },
            {
                table: {
                    widths: ['*', '*'],
                    body: [
                        [{ text: 'Ingresos', style: 'tableHeader' }, { text: 'Gastos', style: 'tableHeader' }],
                        [{ text: infoBalanceIngresosGastos.ingresos.toFixed(2), style: 'tableData' }, { text: infoBalanceIngresosGastos.gastos.toFixed(2), style: 'tableData' }]
                    ]
                }
            },
            { text: 'Cuentas de Ingresos', style: 'subheader' },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            { text: 'Código de Cuenta', style: 'tableHeader' },
                            { text: 'Nombre de Cuenta', style: 'tableHeader' },
                            { text: 'Monto', style: 'tableHeader' }
                        ],
                        ...infoBalanceIngresosGastos.cuentasIngresos.map(cuenta => [
                            { text: cuenta.str_detalle_libro_diario_codigo_cuenta, style: 'tableData' },
                            { text: cuenta.str_detalle_libro_diario_nombre_cuenta, style: 'tableData' },
                            { text: cuenta.dc_detalle_libro_diario_monto.toFixed(2), style: 'tableData' }
                        ])
                    ]
                }
            },
            { text: 'Cuentas de Gastos', style: 'subheader' },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            { text: 'Código de Cuenta', style: 'tableHeader' },
                            { text: 'Nombre de Cuenta', style: 'tableHeader' },
                            { text: 'Monto', style: 'tableHeader' }
                        ],
                        ...infoBalanceIngresosGastos.cuentasGastos.map(cuenta => [
                            { text: cuenta.str_detalle_libro_diario_codigo_cuenta, style: 'tableData' },
                            { text: cuenta.str_detalle_libro_diario_nombre_cuenta, style: 'tableData' },
                            { text: cuenta.dc_detalle_libro_diario_monto.toFixed(2), style: 'tableData' }
                        ])
                    ]
                }
            },
            { text: `Resultado: ${infoBalanceIngresosGastos.resultado.toFixed(2)}`, style: 'result' }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 15,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            tableData: {
                margin: [0, 5, 0, 5]
            },
            result: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 10]
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];

    return new Promise((resolve, reject) => {
        pdfDoc.on('data', chunk => {
            chunks.push(chunk);
        });

        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            const base64 = result.toString('base64');
            resolve(base64);
        });

        pdfDoc.on('error', (error) => {
            reject(error);
        });

        pdfDoc.end();
    });
};

export default generarPdfBalanceBase64;
