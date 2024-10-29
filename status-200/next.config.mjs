/** @type {import('next').NextConfig} */
const config = {};

export default config;

// module.exports = {
//   async rewrites() {
//     return {
//       beforeFiles: [
//         {
//           source: '/admin/:path*', // middleware ทำงานเฉพาะหน้าใน /admin
//           has: [
//             {
//               type: 'cookie',
//               key: 'user_role',
//               value: 'admin',
//             },
//           ],
//           destination: '/no-access', // หากไม่พบ cookie หรือ role ไม่ตรง จะ redirect ไป /no-access
//         },
//       ],
//     };
//   },
// };
