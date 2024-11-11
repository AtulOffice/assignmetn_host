import { Service } from "node-windows";

const svc = new Service({
    name: "ExcisedataService",
    description: "This is a  service for sending data on excise site",
    script: `E:\\assignment\\app.js`,
    // restartOptions: {
    //   restartDelay: 10000,
    // },
    // logFile: `${__dirname}\\my_service.log`,
    // waitBeforeShutdown: 10000,
    // immediate: true,
})
svc.on("install",function(){
    svc.start();
})

svc.install()