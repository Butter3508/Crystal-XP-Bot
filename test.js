let str = `---------------
12.83 tps  -  35 players  -  0 ping
Website: coming soon
Discord: https://discord.gg/6jpcR8GUtu
Nếu bạn thích server này hãy cùng ủng hộ duy trì nó nhé, nhờ vào mọi người.
Server duy trì 100% vào tiền donate của player , mong bạn góp một phần công sức để duy trì nó.
/help để hiển thị hết tất cả các lệnh.`

let strTps = str.substring(16, str.indexOf('  -  '))

console.log(strTps)