const EventEmiter = require("events");

const myEmiter = new EventEmiter();

const logDbConnection = () => {
  console.log("DB connected");
};

myEmiter.addListener("connected", logDbConnection);
myEmiter.emit("connected");

myEmiter.removeListener("connected", logDbConnection);

myEmiter.on("msg", (data) => {
  console.log("Get ", data);
});

myEmiter.emit("msg", "Hello");
