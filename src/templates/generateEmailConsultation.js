export function generateEmailConsultation(data, type, awsLink = '') {
  switch (type) {
    case 'mail':
      return `
          ПІБ: ${data.name},
          Номер телефону: ${data.phone},
          Електронна пошта: ${data.email},
          Опис скарги:  ${data.complaint},
          Коментар:  ${data.comment ? data.comment : ''}
        `;

    case 'aws':
      return `
          ПІБ: ${data.name},
          Номер телефону: ${data.phone},
          Електронна пошта: ${data.email},
          Опис скарги:  ${data.complaint},
          Коментар:  ${data.comment ? data.comment : ''}
          ${awsLink}`;

    default:
      break;
  }
}

// const emailContent = `
// //     ПІБ: ${data.name},
// //     Номер телефону: ${data.phone},
// //     Електронна пошта: ${data.email},
// //     Опис скарги:  ${data.complaint},
// //     Коментар:  ${data.comment ? data.comment : ''}
// //   `;
