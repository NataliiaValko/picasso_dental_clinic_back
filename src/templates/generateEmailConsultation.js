export function generateEmailConsultation(data) {
  //   const emailContent = `
  //     ПІБ: ${data.name},
  //     Номер телефону: ${data.phone},
  //     Електронна пошта: ${data.email},
  //     Опис скарги:  ${data.complaint},
  //     Коментар:  ${data.comment ? data.comment : ''}
  //   `;

  //   return emailContent;
  return `Онлайн консультація!\nІ'мя: ${data.name};\nНомер телефону: ${
    data.phone
  };\nЕлектронна пошта: ${data.email ? data.email : '-'}\nОпис скарги:  ${
    data.complaint
  }\nКоментар: ${data.comment ? data.comment : '-'}.`;
}
