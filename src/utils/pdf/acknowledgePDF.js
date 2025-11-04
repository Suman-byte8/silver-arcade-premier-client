import jsPDF from "jspdf";
import { formatDate } from "../bookingUtils";

const logoPath = "/logo.png";

const formatRoomTypes = (roomTypes) => {
  if (!roomTypes || roomTypes.length === 0) return "No rooms selected";
  return roomTypes.map(room => `${room.count} ${room.type} ${room.count > 1 ? 'Rooms' : 'Room'}`).join(', ');
};

const formatGuests = (totalAdults, totalChildren) => {
  let guestText = `${totalAdults} ${totalAdults > 1 ? 'Adults' : 'Adult'}`;
  if (totalChildren > 0) {
    guestText += `, ${totalChildren} ${totalChildren > 1 ? 'Children' : 'Child'}`;
  }
  return guestText;
};

export const previewAcknowledgementPDF = (bookingData, bookingType) => {
  const doc = new jsPDF("p", "mm", "a4");
  generatePDF(doc, bookingData, bookingType);
  const pdfDataUri = doc.output('dataurlstring');
  window.open(pdfDataUri);
};

export const downloadAcknowledgementPDF = async (bookingData, bookingType) => {
  const doc = new jsPDF("p", "mm", "a4");
  generatePDF(doc, bookingData, bookingType);
  const dateStamp = new Date().toISOString().slice(0, 10);
  doc.save(`SAP_${bookingType.toUpperCase()}_ACKNOWLEDGEMENT_${dateStamp}.pdf`);
};

const generatePDF = (doc, bookingData, bookingType) => {
  const pageWidth = 210;
  let y = 20;

  // ▬▬▬▬ HEADER ▬▬▬▬
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING ACKNOWLEDGEMENT", pageWidth / 2, 18, { align: "center" });

  // Logo
  try {
    doc.addImage(logoPath, "PNG", 15, 5, 20, 20);
  } catch (e) {
    console.warn("Logo not found:", logoPath);
  }

  y = 45;

  // ▬▬▬▬ MESSAGE ▬▬▬▬
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50);
  doc.setFontSize(12);
  doc.text(
    `Dear ${bookingData?.guestInfo?.name || "Guest"},`,
    15,
    y
  );
  y += 8;
  doc.text(
    `Thank you for choosing Silver Arcade Premier. This is an acknowledgement of your booking.`,
    15,
    y,
    { maxWidth: 180 }
  );
  y += 8;
  doc.text(
    `Your reservation is now pending confirmation by our staff. You will receive a confirmation receipt when approved.`,
    15,
    y,
    { maxWidth: 180 }
  );

  y += 20;

  // ▬▬▬▬ BOOKING SUMMARY ▬▬▬▬
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("BOOKING SUMMARY", 15, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const summary = [
    ["Booking Type", bookingType],
    ["Booking ID", bookingData._id || "N/A"],
    ["Guest Name", bookingData?.guestInfo?.name || "N/A"],
    ["Phone", bookingData?.guestInfo?.phoneNumber || "N/A"],
    ["Email", bookingData?.guestInfo?.email || "N/A"],
  ];

  if (bookingType === "accommodation") {
    summary.push(["Check-in", formatDate(bookingData.arrivalDate)]);
    summary.push(["Check-out", formatDate(bookingData.departureDate)]);
    
    // Add room types section with better formatting
    if (bookingData.selectedRoomTypes && bookingData.selectedRoomTypes.length > 0) {
      summary.push(["Room Details", ""]);  // Empty value for better formatting
      bookingData.selectedRoomTypes.forEach((room, index) => {
        summary.push([
          `${index === 0 ? "" : ""}`, 
          `• ${room.type}: ${room.count} ${room.count > 1 ? 'Rooms' : 'Room'}`
        ]);
      });
    } else {
      summary.push(["Room Details", "No rooms selected"]);
    }

    summary.push(["Number of Guests", formatGuests(bookingData.totalAdults, bookingData.totalChildren)]);
    summary.push(["Number of Nights", bookingData.nights?.toString() || "N/A"]);
    if (bookingData.specialRequests) {
      summary.push(["Special Requests", bookingData.specialRequests]);
    }
  }
  
  // Rest of the bookingTypes remain unchanged
  if (bookingType === "restaurant") {
    summary.push(["Reservation Date", formatDate(bookingData.date)]);
    summary.push(["Time Slot", bookingData.timeSlot]);
    summary.push(["Number of Diners", bookingData.noOfDiners?.toString()]);
  }
  if (bookingType === "meeting") {
    summary.push(["Event", bookingData.typeOfReservation]);
    summary.push(["Start Date", formatDate(bookingData.reservationDate)]);
    summary.push(["End Date", formatDate(bookingData.reservationEndDate)]);
    summary.push(["Guests", bookingData.numberOfGuests?.toString()]);
    summary.push(["Rooms", bookingData.numberOfRooms?.toString()]);
  }

  // Draw summary with better formatting for room types
  summary.forEach(([label, value]) => {
    if (label === "Room Details" && value === "") {
      // Special handling for room types header
      doc.setFont("helvetica", "bold");
      doc.text("Room Details:", 20, y);
      y += 8;
    } else if (label === "") {
      // This is a room type detail line
      doc.setFont("helvetica", "normal");
      doc.text(value, 25, y);
      y += 6;
    } else {
      // Normal line
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, 70, y);
      y += 8;
    }
  });

  y += 15;

  // ▬▬▬▬ FOOTER ▬▬▬▬
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 270, pageWidth, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(
    "Silver Arcade Premier • Charchpally, ITI More, Malda, West Bengal – 732101",
    pageWidth / 2,
    278,
    { align: "center" }
  );
  doc.text("Phone: +7719381841 | Email: mdshabib1993@gmail.com", pageWidth / 2, 285, { align: "center" });
};