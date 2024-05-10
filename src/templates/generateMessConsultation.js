export function generateMessConsultation(data, type, awsLink = '') {
  switch (type) {
    case 'tg':
      return `Запис на онлайн консультацію!\nІ'мя: ${
        data.name
      };\nНомер телефону: ${data.phone};\nЕлектронна пошта: ${
        data.email ? data.email : '-'
      }\nОпис скарги:  ${data.complaint}\nКоментар: ${
        data.comment ? data.comment : '-'
      }.`;

    case 'aws':
      return `Запис на онлайн консультацію!\nІ'мя: ${
        data.name
      };\nНомер телефону: ${data.phone};\nЕлектронна пошта: ${
        data.email ? data.email : '-'
      }\nОпис скарги:  ${data.complaint}\nКоментар: ${
        data.comment ? data.comment : '-'
      }\n${awsLink}`;

    default:
      break;
  }
}
