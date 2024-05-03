const app = require("./app");

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

app.on("error", (error) => {
  console.error("Произошла ошибка:", error.message);
});
