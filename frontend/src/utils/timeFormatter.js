const indianTimeFormatter = function convertToIndianFormat(isoDate) {
    if (!isoDate) {
      console.error("Invalid date:", isoDate);
      return "Invalid Date";
    }
  
    const date = new Date(isoDate);
  
    // Check if the date conversion succeeded
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", isoDate);
      return "Invalid Date";
    }
  
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata' // Sets timezone to India Standard Time (IST)
    };
  
    // Format the date and time separately
    const datePart = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(date);
    const timePart = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(date);
  
    return `${datePart}, ${timePart}`;
  }
  

export default indianTimeFormatter
  