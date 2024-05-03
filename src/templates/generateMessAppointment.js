export function generateMessAppointment(data) {
  return `Запис на прийом!\nІ'мя: ${data.name};\nНомер телефону: ${
    data.phone
  };\nЕлектронна пошта: ${data.email ? data.email : ''}\nКоментар: ${
    data.comment ? data.comment : ''
  }.`;
}
