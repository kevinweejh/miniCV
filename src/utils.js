import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = () => {
    const input = document.getElementById('pdfOutput');
    const clone = input.cloneNode(true);

    clone.style.width = '210mm';
    clone.style.height = '297mm';
    clone.style.position = 'fixed';
    clone.style.left = '-10000px'; // Move the clone out of the viewport
    document.body.appendChild(clone);

    html2canvas(clone, { scale: 1.5, windowWidth: 210, windowHeight: 297 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('cv.pdf');
        document.body.removeChild(clone); // Clean up
    });
};
